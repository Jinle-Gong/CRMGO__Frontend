<!-- 用于展示图书列表的组件  todo -->
<template>
<div id='main'>
<el-card class="box-card">

  <!-- 顶部查询输入框 -->
  <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="部门名称:">
      <el-input v-model="searchForm.deptName" @keyup.enter.native="search"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="success" @click="search">查询</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
        <el-button type="info" @click="handleInsert">添加</el-button>
    </el-form-item>
  </el-form>

  <!-- table数据 -->
  <el-table :data="tableData" style="width: 50%; margin-left:25%" >
    <el-table-column prop="deptId" label="序号" width="300%">
    </el-table-column>
    <el-table-column prop="deptName" label="部门名称">
    </el-table-column>

    <el-table-column label="操作" width="150px">
      <template slot-scope="scope">
        <!-- 触发修改功能，将一行的所有数据作为参数传入方法中 -->
        <el-button size="mini" @click="handleEdit(scope.row),operatedRowId=scope.$index">编辑</el-button>
        <!-- 点击事件，将bookId设置为要删除的bookId，将删除的Dialog显示出来 -->
        <el-button type="danger" size="mini"  @click="deletionId=scope.row.deptId, delDialog=true">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
    :current-page.sync="page.pageNum" :page-sizes="[2, 3, 5, 10]" :page-size="page.pageSize"
    layout="sizes, prev, pager, next" :total="page.total">
  </el-pagination>

    <!-- 删除弹框 -->
  <el-dialog title="温馨提示" :visible.sync="delDialog" width="30%">
    <span>此操作将永久删除该记录, 是否继续?</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="delDialog= false">取 消</el-button>
      <el-button type="primary" @click="delDialog = false,deleteById()">确 定</el-button>
    </span>
  </el-dialog>

    <!--添加弹出框-->
  <el-dialog title="部门信息" :visible.sync="addDialog" width="30%">
    <el-form>
      <el-form-item label="部门名称：" :label-width="formLabelWidth">
          <el-input v-model="addForm.deptName" @input="change($event)"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="clearForm()">取 消</el-button>
        <el-button type="primary" @click="handleEvent(), clearForm()">确 定</el-button>
    </div>
  </el-dialog>
 
</el-card>
</div>
</template>

<script>
export default {
  data() {
    return {
      formLabelWidth: '25%',
      tableData: [],
      deptList:[],
      page: {}, //pageSize,pageNum,total
      // 增删改用到的row index
      operatedRowId:'',
      // 删除事件用到的id
      deletionId:-1,
      delDialog:false,//默认不显示Dialog
      addDialog:false,
      action:'',
      searchForm:{},
      addForm:{
        deptName : '',
      },
      roleList:{}
    }
  },
  methods: {
    change(){
      this.$forceUpdate()
    },
    clearForm(){
      this.addDialog = false
      this.addForm = {}
    },

    handleEvent(){
      if(this.action=='insert'){
        this.$axios.post("/dept/insertDept", this.addForm).then(res => {
          if(res.code == 20000){
            this.handlePageQuery(this.page.pageNum, this.page.pageSize)
            this.$message({
              message: '操作成功',
              type: 'success'
            });
          }else{
            this.$message({
              message: '操作失败',
              type: 'error'
            });
          }
        })
      }else{
        this.$axios.put("/dept/updateDept", this.addForm).then(res => {
          if(res.code == 20000){
            this.handlePageQuery(this.page.pageNum, this.page.pageSize)
            this.$message({
              message: '操作成功',
              type: 'success'
            });
          }else{
            this.$message({
              message: '操作失败',
              type: 'error'
            });
          }
        })
      }
    },

    handleEdit(row){
      this.addDialog = true;
      this.addForm.deptId = row.deptId
      this.addForm.deptName = row.deptName;
      this.action = 'update';
    },

    handleInsert(){
      this.addForm = {}
      this.addDialog=true
      this.action='insert'
    },

    deleteById(){
      this.$axios.delete("/dept/deleteDept/"+this.deletionId).then(res=>{
          if(res.code == 20000){
            this.handlePageQuery(this.page.pageNum, this.page.pageSize)
            this.$message({
              message: '操作成功',
              type: 'success'
            });
          }else{
            this.$message({
              message: '操作失败',
              type: 'error'
            });
          }
      })
    },

    reset(){
      this.searchForm={}
      this.handlePageQuery(this.page.pageNum, this.page.pageSize)
    },
    search(){
      let param={pageNum:this.page.pageNum,pageSize:this.page.pageSize};
      Object.assign(param,this.searchForm)
      this.$axios.get("/dept/searchDept",{params:param}).then(res => {
        this.tableData = res.data.list;
        this.page = res.data;
      })
      // this.$axios.post("/user/searchUsers", this.searchForm,{params:{pageNum:1,pageSize:3}}).then(res => {
      //   this.tableData = res.data.list;
      //   // this.page = res.data;
      // })
    },
    query() {
      this.$axios.get("/dept/getAllDeptWithPage").then(res => {
        this.tableData = res.data.list; //更新表格中的数据
        this.page = res.data;
      })
    },
    handleSizeChange(pageSize) {
      this.handlePageQuery(this.page.pageNum, pageSize)
    },
    handleCurrentChange(pageNum) {
      this.handlePageQuery(pageNum, this.page.pageSize)
    },
    //当页面信息发生改变时，依然保留查询信息
    handlePageQuery(pageNum, pageSize){
      let param={pageNum:pageNum,pageSize:pageSize};
      Object.assign(param,this.searchForm)
      this.$axios.get("/dept/searchDept",{params:param}).then(res => {
        this.tableData = res.data.list;
        this.page = res.data;
      })
    }
  },
  created() {
    this.query();
  }
}
</script>

<style scoped>
#main{
  /* border: 1px solid black; */
  margin-left: 3%;
  margin-right: 3%;
}
.page {
  float: right;
  margin-top: 20px;
}
.el-pagination {
    white-space: nowrap;
    padding: 15px 5px;
    color: #303133;
    font-weight: 700;
}
.selectBoxWidth {
  /* width: 100%; */
  text-align: left;
  width:110px;
}
.addBoxWidth{
  width: 100%;
}
</style>