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
        <el-select class="selectBoxWidth" placeholder="用户状态" v-model="searchForm.accountStatus">
        <el-option label="有效" value="1"></el-option>
        <el-option label="无效" value="0"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item>
        <el-select class="selectBoxWidth" placeholder="职务" style="width:80px;" v-model="searchForm.position">
          <el-option label="总监" value="总监"></el-option>
          <el-option label="经理" value="经理"></el-option>
          <el-option label="助理" value="助理"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item>
        <el-select class="selectBoxWidth" placeholder="角色" style="width:80px;" v-model="searchForm.role">
          <el-option v-for='item in roleList' :key='item.rid' :value='item.roleName' :label='item.roleName'></el-option>
        </el-select>
    </el-form-item>
    <el-form-item>
        <el-select class="selectBoxWidth" placeholder="性别" style="width:80px;" v-model="searchForm.gender">
        <el-option label="男" value="1"></el-option>
        <el-option label="女" value="0"></el-option>
        </el-select>
    </el-form-item>

    <el-form-item label="用户姓名:">
      <el-input v-model="searchForm.uname" @keyup.enter.native="search"></el-input>
    </el-form-item>
    <el-form-item label="登录名:">
      <el-input  v-model="searchForm.username" @keyup.enter.native="search"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="success" @click="search">查询</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
        <el-button type="info" @click="handleInsert">添加</el-button>
    </el-form-item>
  </el-form>

  <!-- table数据 -->
  <el-table :data="tableData" style="width: 100%" >
    <el-table-column prop="uid" label="序号" width="55px">
    </el-table-column>
    <el-table-column prop="username" label="用户登录名" >
    </el-table-column>
    <el-table-column prop="uname" label="用户姓名">
    </el-table-column>
    <el-table-column prop="deptName" label="归属部门" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="gender" label="用户性别" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="accountStatus" label="用户状态" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="position" label="用户职务" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="uphone" label="手机号码" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="email" label="用户邮箱" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="role" label="角色" show-overflow-tooltip>
    </el-table-column>
    <el-table-column label="操作" width="150px">
      <template slot-scope="scope">
        <!-- 触发修改功能，将一行的所有数据作为参数传入方法中 -->
        <el-button size="mini" @click="handleEdit(scope.row),operatedRowId=scope.$index">编辑</el-button>
        <!-- 点击事件，将bookId设置为要删除的bookId，将删除的Dialog显示出来 -->
        <el-button type="danger" size="mini"  @click="deletionId=scope.row.uid, delDialog=true">删除</el-button>
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
  <el-dialog title="用户信息" :visible.sync="addDialog" width="30%">
    <el-form>
      <el-form-item label="用户名：" :label-width="formLabelWidth">
          <el-input v-model="addForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码：" :label-width="formLabelWidth">
          <el-input v-model="addForm.password"></el-input>
      </el-form-item>
      <el-form-item label="用户姓名：" :label-width="formLabelWidth">
          <el-input v-model="addForm.uname"></el-input>
      </el-form-item>
      <el-form-item label="手机号码：" :label-width="formLabelWidth">
          <el-input v-model="addForm.uphone"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱：" :label-width="formLabelWidth">
          <el-input v-model="addForm.email"></el-input>
      </el-form-item>
      <el-form-item label="归属部门：" :label-width="formLabelWidth">
        <el-select class="addBoxWidth" placeholder="所有部门" v-model="addForm.deptName">
          <el-option v-for='item in deptList' :key='item.deptName' :value='item.deptId' :label='item.deptName'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户状态：" :label-width="formLabelWidth">
        <el-select class="addBoxWidth" placeholder="用户状态" v-model="addForm.accountStatus">
        <el-option label="有效" value="1"></el-option>
        <el-option label="无效" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色：" :label-width="formLabelWidth">
        <el-select class="addBoxWidth" placeholder="角色" v-model="addForm.role">
          <el-option v-for='item in roleList' :key='item.rid' :value='item.roleName' :label='item.roleName'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户职务：" :label-width="formLabelWidth">
        <el-select class="addBoxWidth" placeholder="职务" v-model="addForm.position">
          <el-option label="总监" value="总监"></el-option>
          <el-option label="经理" value="经理"></el-option>
          <el-option label="助理" value="助理"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户性别：" :label-width="formLabelWidth">
        <el-select class="addBoxWidth" placeholder="性别"  v-model="addForm.gender">
        <el-option label="男" value="1"></el-option>
        <el-option label="女" value="0"></el-option>
        </el-select>      
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
      formLabelWidth: '120px',
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
        username : '',
        password : '',
        uname : '',
        uphone : '',
        email : '',
        deptName : '',
        role : '',
        position : '',
        gender : '',
        accountStatus : '',
      },
      updateForm:{},
      roleList:{}
    }
  },
  methods: {
    clearForm(){
      this.addDialog = false
      this.addForm = {}
    },

    handleEvent(){
      if(this.action=='insert'){
        this.$axios.post("/user/insertUser", this.addForm).then(res => {
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
        this.$axios.put("/user/updateUser", this.addForm).then(res => {
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
      }
    },

    handleEdit(row){
      this.addForm.uid = row.uid
      this.addForm.username = row.username;
      this.addForm.password = row.password;
      this.addForm.uname = row.uname;
      this.addForm.uphone = row.uphone;
      this.addForm.email = row.email;
      this.addForm.deptName = row.deptName;
      this.addForm.role = row.role;
      this.addForm.position = row.position;
      this.addForm.gender = row.gender;
      this.addForm.accountStatus = row.accountStatus;
      this.action = 'update';
      this.addDialog = true;
    },

    handleInsert(){
      this.addForm = {}
      this.addDialog=true
      this.action='insert'
    },

    deleteById(){
      this.$axios.delete("/user/deleteUser/"+this.deletionId).then(res=>{
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
      this.$axios.get("/user/searchUsers",{params:param}).then(res => {
        this.tableData = res.data.list;
        this.page = res.data;
      })
      // this.$axios.post("/user/searchUsers", this.searchForm,{params:{pageNum:1,pageSize:3}}).then(res => {
      //   this.tableData = res.data.list;
      //   // this.page = res.data;
      // })
    },
    query() {
      this.$axios.get("/user/getAllUsers").then(res => {
        this.tableData = res.data.list; //更新表格中的数据
        this.page = res.data;
      })
    },
    getAllDepts(){
      this.$axios.get("/dept/getAllDept").then(res => {
        this.deptList = res.data; //更新表格中的数据
      })
    },
    getAllRoles(){
      this.$axios.get("/role/getAllRole").then(res => {
        this.roleList = res.data; //更新表格中的数据
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
      this.$axios.get("/user/searchUsers",{params:param}).then(res => {
        this.tableData = res.data.list;
        this.page = res.data;
      })
    }
  },
  created() {
    this.query();
    this.getAllDepts();
    this.getAllRoles();
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