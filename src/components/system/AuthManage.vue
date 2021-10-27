<template>
<div id='main'>
<el-card class="box-card">

  <!-- 顶部查询输入框 -->
  <el-form :inline="true" class="demo-form-inline">
    <el-form-item>
        <el-select class="selectBoxWidth" placeholder="权限类型" v-model="searchForm.authName" style="width:120px" >
          <el-option v-for='item in distinctAuthList' :key='item' :value='item' :label='item'></el-option>
        </el-select>
    </el-form-item>
    <el-form-item>
        <el-select class="selectBoxWidth" placeholder="权限状态" v-model="searchForm.authStatus">
        <el-option label="有效" value="1"></el-option>
        <el-option label="无效" value="0"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="角色名称：">
      <el-input v-model="searchForm.roleName" @keyup.enter.native="search"></el-input>
    </el-form-item>
    <el-form-item label="权限描述：">
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
    <el-table-column prop="authId" label="序号" width="120px">
    </el-table-column>
    <el-table-column prop="authName" label="权限类型" >
    </el-table-column>
    <el-table-column prop="roleName" label="角色名称">
    </el-table-column>
    <el-table-column prop="authStatus" label="状态" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="description" label="权限描述" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="menuId" label="权限范围" show-overflow-tooltip>
      <template slot-scope="scope"> 
        <el-button round plain size="mini" @click="showMenuIds(scope.row)" >查看</el-button>
      </template>
    </el-table-column>

    <el-table-column label="操作" width="150px">
      <template slot-scope="scope"> 
        <!-- 触发修改功能，将一行的所有数据作为参数传入方法中 -->
        <el-button size="mini" @click="handleEdit(scope.row), setKeysForEdit(scope.row), operatedRowId=scope.$index">编辑</el-button>
        <!-- 点击事件，将bookId设置为要删除的bookId，将删除的Dialog显示出来 -->
        <el-button type="danger"  size="mini"  @click="deletionId=scope.row.authId, delDialog=true">删除</el-button>
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
  <el-dialog title="权限信息" :visible.sync="addDialog" width="30%">
    <el-form>
      <el-form-item label="权限名称：" :label-width="formLabelWidth">
          <el-input v-model="addForm.authName"></el-input>
      </el-form-item>
      <el-form-item label="角色名称：" :label-width="formLabelWidth">
          <el-input v-model="addForm.roleName"></el-input>
      </el-form-item>
      <el-form-item label="权限描述：" :label-width="formLabelWidth">
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" 
        placeholder="请输入内容" v-model="addForm.description">
      </el-input>
      </el-form-item>
      <el-form-item label="权限状态：" :label-width="formLabelWidth">
        <el-select class="addBoxWidth" placeholder="请选择" v-model="addForm.authStatus">
        <el-option label="有效" value="1"></el-option>
        <el-option label="无效" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限范围：" :label-width="formLabelWidth">
        <el-tree :data="menuId" show-checkbox 
          node-key="id" ref="editTree" highlight-current :props="defaultProps">
        </el-tree>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="clearForm()">取 消</el-button>
        <el-button type="primary" @click="handleEvent(), clearForm()">确 定</el-button>
    </div>
  </el-dialog>

  <!-- 权限范围查看弹出框 -->
  <el-dialog title="权限信息" :visible.sync="authDialog" width="30%">
    <el-form>
      <el-form-item label="权限范围：" :label-width="formLabelWidth">
        <el-tree :data="menuId" show-checkbox default-expand-all
          node-key="id" ref="tree" highlight-current :props="defaultProps">
        </el-tree>
      </el-form-item>
    </el-form>
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
      page: {}, //pageSize,pageNum,total
      // 增删改用到的row index
      operatedRowId:'',
      checkAuthRowId:'',
      // 删除事件用到的id
      deletionId:-1,
      delDialog:false,//默认不显示Dialog
      addDialog:false,
      authDialog:false,
      action:'',
      searchForm:{},
      addForm:{
        authName : '',
        roleName : '',
        description : '',
        authStatus: '',
        menuId:'',
      },
      distinctAuthList:[],
      roleList:{},
      menuId: [
        {
          id: 100,
          label: '商品与赠品管理',
          children: [{
            id: 10001,
            label: '商品管理',
            children: [{
              id: 1000101,
              label: '品牌管理'
            }, {
              id: 1000102,
              label: '商品管理'
            }, {             
               id: 1000103,
              label: '产品查询'
            }, {
              id: 1000104,
              label: '类型管理'
            }, {
              id: 1000105,
              label: '供应商管理'
            }, {
              id: 1000106,
              label: '价格调整管理'
            }, {
              id: 1000107,
              label: '价格调整审核'
            }]
          },{
            id: 10002,
            label: '赠品管理',
            children: [{
              id: 1000201,
              label: '赠品管理'
            }, {
              id: 1000202,
              label: '赠品转商品管理'
            }, {
              id: 1000203,
              label: '赠品转商品审核'
            }, {
              id: 1000204,
              label: '商品转赠品管理'
            }, {
              id: 1000205,
              label: '商品转赠品审核'
            }]
          },]
        }, {
          id: 200,
          label: 'B2C销售管理',
          children: [{
            id: 20001,
            label: 'B2C销售订单查询'
          }, {
            id: 20002,
            label: 'B2C出库管理'
          }]
        }, {
          id: 300,
          label: '售后管理',
          children: [{
            id: 30001,
            label: 'B2C售后管理',
            children: [{
              id: 3000101,
              label: '退货'
            }, {
              id: 3000102,
              label: '售后维修'
            }]
          },{
            id: 30002,
            label: 'B2C退货审核',
            children: [{
              id: 3000201,
              label: '返厂出库管理'
            }, {
              id: 3000202,
              label: '返厂出库审核'
            }, {
              id: 3000203,
              label: '返厂入库管理'
            }, {
              id: 3000204,
              label: '返厂入库审核'
            }]
          },]
        },{
          id: 400,
          label: '系统管理',
          children: [{
            id: 40001,
            label: '用户管理'
          }, {
            id: 40002,
            label: '角色管理'
          }, {
            id: 40003,
            label: '权限管理'
          }, {
            id: 40004,
            label: '部门管理'
          }]
        },{
          id: 500,
          label: '日志管理',
          children: [{
            id: 50001,
            label: '用户日志'
          }, {
            id: 50002,
            label: '商品日志'
          }, {
            id: 50003,
            label: '字典项管理'
          }]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    showMenuIds(row){
      this.authDialog=true
      this.$nextTick(() =>{
        this.$refs.tree.setCheckedKeys([]);
        if(row.menuId!=null){
          var menuArr = row.menuId.split(',').map(Number);
          this.$refs.tree.setCheckedKeys(menuArr);
        }
      })
    },
    setKeysForEdit(row) {
      this.$nextTick(() =>{
        this.$refs.editTree.setCheckedKeys([]);
        if(row.menuId!=null){
          var menuArr = row.menuId.split(',').map(Number);
          console.log(menuArr)
          this.$refs.editTree.setCheckedKeys(menuArr);
        }
      })
    },
    clearForm(){
      this.addDialog = false
      this.addForm = {}
    },

    handleEvent(){
      this.addForm.menuId = this.$refs.editTree.getCheckedKeys().join(',');//将menuId数组以字符串形式传递到后台
      if(this.action=='insert'){
        this.$axios.post("/auth/insertAuth", this.addForm).then(res => {
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
        this.$axios.put("/auth/updateAuth", this.addForm).then(res => {
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
      this.addForm.authId = row.authId
      this.addForm.authName = row.authName
      this.addForm.roleName = row.roleName;
      this.addForm.description = row.description;
      this.addForm.authStatus = row.authStatus;
      this.action = 'update';
    },

    handleInsert(){
      this.addForm = {}
      this.addDialog=true
      this.$nextTick(() =>{
        this.$refs.editTree.setCheckedKeys([]);
      })
      this.action='insert'
    },

    deleteById(){
      this.$axios.delete("/auth/deleteAuth/"+this.deletionId).then(res=>{
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
      this.$refs.editTree.setCheckedKeys([]);

    },
    search(){
      let param={pageNum:this.page.pageNum,pageSize:this.page.pageSize};
      Object.assign(param,this.searchForm)
      this.$axios.get("/auth/searchAuth",{params:param}).then(res => {
        this.tableData = res.data.list;
        this.page = res.data;
      })
      // this.$axios.post("/user/searchUsers", this.searchForm,{params:{pageNum:1,pageSize:3}}).then(res => {
      //   this.tableData = res.data.list;
      //   // this.page = res.data;
      // })
    },
    query() {
      this.$axios.get("/auth/getAllAuthWithPage").then(res => {
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
      this.$axios.get("/auth/searchAuth",{params:param}).then(res => {
        this.tableData = res.data.list;
        this.page = res.data;
      })
    },
    getDistinctAuth(){
      this.$axios.get("/auth/getDistinctAuth").then(res => {
        this.distinctAuthList = res.data; //更新表格中的数据
      })
    },
  },
  created() {
    this.query();
    this.getDistinctAuth();
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