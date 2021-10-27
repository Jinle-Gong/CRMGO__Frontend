<!-- 用于展示图书列表的组件  todo -->
<template>
<div id='main'>
<el-card class="box-card">

  <!-- 顶部查询输入框 -->
  <el-form :inline="true" class="demo-form-inline">
    <el-form-item>
        <el-select class="selectBoxWidth" placeholder="所有部门" v-model="searchForm.deptName" style="width:120px" >
          <el-option v-for='item in deptList' :key='item.deptName' :value='item.deptId' :label='item.deptName'></el-option>
        </el-select>
    </el-form-item>
    <el-form-item>
        <el-select class="selectBoxWidth" placeholder="角色状态" v-model="searchForm.accountStatus">
        <el-option label="有效" value="1"></el-option>
        <el-option label="无效" value="0"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="角色名称:">
      <el-input v-model="searchForm.roleName" @keyup.enter.native="search"></el-input>
    </el-form-item>
    <el-form-item label="角色描述">
      <el-input  v-model="searchForm.description" @keyup.enter.native="search"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="success" @click="search">查询</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
        <el-button type="info" @click="handleInsert">添加</el-button>
    </el-form-item>
  </el-form>

  <!-- table数据 -->
  <el-table :data="tableData" style="width: 100%" >
    <el-table-column prop="rid" label="序号" width="80px">
    </el-table-column>
    <el-table-column prop="roleCode" label="角色编码" >
    </el-table-column>
    <el-table-column prop="roleName" label="角色名称">
    </el-table-column>
    <el-table-column prop="description" label="描述" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="roleStatus" label="角色状态" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="auth" label="权限设定" show-overflow-tooltip>
    </el-table-column>

    <el-table-column label="操作" width="150px">
      <template slot-scope="scope">
        <!-- 触发修改功能，将一行的所有数据作为参数传入方法中 -->
        <el-button size="mini" @click="handleEdit(scope.row),operatedRowId=scope.$index">编辑</el-button>
        <!-- 点击事件，将bookId设置为要删除的bookId，将删除的Dialog显示出来 -->
        <el-button type="danger" size="mini"  @click="deletionId=scope.row.rid, delDialog=true">删除</el-button>
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
  <el-dialog title="角色信息" :visible.sync="addDialog" width="30%">
    <el-form>
      <el-form-item label="角色编码：" :label-width="formLabelWidth">
          <el-input v-model="addForm.roleCode"></el-input>
      </el-form-item>
      <el-form-item label="角色名称：" :label-width="formLabelWidth">
          <el-input v-model="addForm.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色描述：" :label-width="formLabelWidth">
          <el-input v-model="addForm.description"></el-input>
      </el-form-item>
      <el-form-item label="角色状态：" :label-width="formLabelWidth">
        <el-select class="addBoxWidth" placeholder="角色状态" v-model="addForm.roleStatus">
        <el-option label="有效" value="1"></el-option>
        <el-option label="无效" value="0"></el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="角色权限：" :label-width="formLabelWidth">
        <el-select class="addBoxWidth" placeholder="所有权限" v-model="addForm.auth">
          <el-option v-for='item in authList' :key='item.authName' :value='item.authId' :label='item.authName'></el-option>
        </el-select>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="clearForm(),getCheckedKeys()">取 消</el-button>
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
        roleCode : '',
        roleName : '',
        description : '',
        roleStatus: '',
        auth:'',
      },
      authList:[],
    }
  },
  methods: {
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    clearForm(){
      this.addDialog = false
      this.addForm = {}
    },

    handleEvent(){
      if(this.action=='insert'){
        this.$axios.post("/role/insertRole", this.addForm).then(res => {
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
        this.$axios.put("/role/updateRole", this.addForm).then(res => {
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
      this.addForm.rid = row.rid
      this.addForm.roleCode = row.roleCode
      this.addForm.roleName = row.roleName;
      this.addForm.description = row.description;
      this.addForm.roleStatus = row.roleStatus;
      this.addForm.auth = row.auth;
      this.action = 'update';
    },

    handleInsert(){
      this.addForm = {}
      this.addDialog=true
      this.action='insert'
    },

    deleteById(){
      this.$axios.delete("/role/deleteRole/"+this.deletionId).then(res=>{
        console.log(res)
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
      this.$refs.tree.setCheckedKeys([]);

    },
    search(){
      let param={pageNum:this.page.pageNum,pageSize:this.page.pageSize};
      Object.assign(param,this.searchForm)
      this.$axios.get("/role/searchRoles",{params:param}).then(res => {
        this.tableData = res.data.list;
        this.page = res.data;
      })
    },
    query() {
      this.$axios.get("/role/getAllRoleWithPage").then(res => {
        this.tableData = res.data.list; //更新表格中的数据
        this.page = res.data;
      })
    },
    getAllDepts(){
      this.$axios.get("/dept/getAllDept").then(res => {
        this.deptList = res.data; //更新表格中的数据
      })
    },
    getAllAuth(){
      this.$axios.get("/auth/getAllAuth").then(res => {
        this.authList = res.data; //更新表格中的数据
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
      this.$axios.get("/role/searchRoles",{params:param}).then(res => {
        this.tableData = res.data.list;
        this.page = res.data;
      })
    }
  },
  created() {
    this.query();
    this.getAllAuth();
    this.getAllDepts();
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