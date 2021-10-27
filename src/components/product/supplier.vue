<template>
  <div
    id="app"
    v-clock
  >
    <el-card style="margin-top: 20px;width: 86%">
      <el-col
        :span="3"
        style='margin-left: 30px;'
      >
        <el-input
          placeholder="供应商名称"
          v-model="formValue.sname"
          clearable
          prefix-icon="el-icon-search"
        >
        </el-input>
      </el-col>
      <el-col
        :span="3"
        style='margin-left: 5px;'
      >
        <el-input
          placeholder="联系人姓名"
          v-model="formValue.contacts"
          clearable
          prefix-icon="el-icon-search"
        >
        </el-input>
      </el-col>
      <el-button
        type="primary"
        icon="el-icon-search"
        style='margin-left: 20px;'
        @click="query"
      >
        搜索
      </el-button>
      <el-button
        type="success"
        icon="el-icon-circle-plus"
        style='margin-left: 5px;'
        @click="dialogFormVisible1 = true"
      >
        新增供应商信息
      </el-button>
    </el-card>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 86%"
      @selection-change="handleSelectionChange"
      highlight-current-row
      @current-change="handleCurrentChange"
      :header-cell-style="headClass"
      :cell-style="rowClass"
    >
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        prop="sname"
        label="供应商名称"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="contacts"
        label="联系人"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="telephone"
        label="电话"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="email"
        label="联系邮箱"
        width="160"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="bank"
        label="开户行"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="account"
        label="开户账户"
        width="200"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="400"
      >
        <template slot-scope="scope">
          <el-button
            type="success"
            icon="el-icon-full-screen"
            style='margin-left: 5px;'
            @click="viewDialogForm = true"
          >
            选择供应商品
          </el-button>
          <el-button
            type="warning"
            icon="el-icon-edit"
            style='margin-left: 5px;'
            @click="dialogFormVisible2 = true"
            v-if="scope.row.auditstatus != '审核通过'"
          >
            修改
          </el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            style='margin-left: 5px;'
            @click="open()"
            v-if="scope.row.auditstatus != '审核通过'"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange1"
      :current-page.sync="page.pageNum"
      :page-sizes="[3, 4, 5, 6]"
      :page-size="page.pageSize"
      layout="sizes, prev, pager, next"
      :total="page.total"
    >
    </el-pagination>

    <!-- 新增模态框 -->
    <el-dialog
      title="新增申请信息:"
      :visible.sync="dialogFormVisible1"
    >
      <el-form
        :model="insertForm"
        ref="insertFormRe"
      >
      </el-form>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogFormVisible1 = false"
        >提 交</el-button>
      </div>
    </el-dialog>

    <!-- 修改模态框 -->
    <el-dialog
      title="修改申请单:"
      :visible.sync="dialogFormVisible2"
    >
      <el-form
        :model="updateForm"
        ref="insertFormRe"
      >
      </el-form>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogFormVisible2 = false"
        >提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      multipleSelection: [],
      page: {
        // pageSize: "",
        // pageNum: "",
        // total: "",
        // pages: ""
      },
      formValue: {},
      delNum: '',
      // 模态框
      formLabelWidth: '120px',
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      updateForm: {},
      insertForm: {},
    };
  },
  methods: {
    insert () {
      this.$axios.post("/audit", this.insertForm)
        .then(res => {
          if (res.code == 20000) {
            this.$message({
              message: '新增成功',
              type: 'success'
            });
          }
          this.query();
        });
    },
    update () {
      this.$axios.put("/audit", this.updateForm)
        .then(res => {
          if (res.code == 20000) {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          }
          this.query();
        });
    },
    delSelected () {
      this.$axios.delete("/audit/" + this.delNum)
        .then(res => {
          if (res.code == 20000) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          }
          this.query();
        })
    },
    open () {
      this.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delSelected();
      })
    },
    query (param) {
      let data = param;
      if (this.formValue != undefined) {
        Object.assign(this.formValue, param);
        data = this.formValue;
        // console.log(data);
      }
      this.$axios.get("/supplier/selectAll", {
        params: data
      })
        .then(res => {
          this.tableData = res.data.list; // 更新表格中的数据
          this.page = res.data; // 分页数据
        })
    },
    handleSizeChange (pageSize) { // 每页记录数改变
      this.query({
        "pageNum": this.page.pageNum,
        "pageSize": pageSize
      })
    },
    handleCurrentChange1 (pageNum) { // 页码改变
      this.query({
        "pageNum": pageNum,
        "pageSize": this.page.pageSize
      });
    },
    handleSelectionChange (val) {
      if (val != undefined) {
        this.multipleSelection = val;
      }
    },
    handleCurrentChange (val) {
      if (val != undefined) {
        console.log(val);
        this.updateForm = val;
        this.delNum = val.id;
        this.trackId = val.goodsid;
      }
    },
    headClass () { //表头居中显示
      return "text-align:center"
    },
    rowClass () { //表格数据居中显示
      return "text-align:center"
    }
  },
  components: {},
  computed: {},
  created () {
    this.query();

  },
  mounted () { }
}
</script>

<style scoped>
[v-clock] {
  display: none;
}
.onLeft {
  text-align: right;
}

.onRight {
  width: 500px;
}

#myTable {
  border: 1px lightblue solid;
}
</style>