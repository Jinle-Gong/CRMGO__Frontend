<template>
  <div
    id="main"
    v-clock
  >
    <div style="float:left;margin-left: 100px;margin-top: 20px;width: 150px;">
      <el-tree
        :data="treeData"
        :props="defaultProps"
        node-key="typeId"
        :default-expanded-keys="[1, 2, 4, 5, 7, 15]"
      >
      </el-tree>
    </div>
    <div style="float:left;padding-left: 130px;margin-top: 20px">
      <el-card>
        <el-col
          :span="3"
          style='margin-left: 30px;'
        >
          <el-input
            placeholder="类型名称"
            v-model="formValue.typeName"
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
            placeholder="类型描述"
            v-model="formValue.typeremark"
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
          type="danger"
          icon="el-icon-delete"
          style='margin-left: 5px;'
          @click="open()"
        >
          删除
        </el-button>
        <el-button
          type="warning"
          icon="el-icon-edit"
          style='margin-left: 5px;'
          @click="dialogFormVisible2 = true"
        >
          修改
        </el-button>
        <el-button
          type="success"
          icon="el-icon-circle-plus"
          style='margin-left: 5px;'
          @click="dialogFormVisible1 = true,resetForm('insertFormRe')"
        >
          新增
        </el-button>
      </el-card>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        highlight-current-row
        @current-change="handleCurrentChange"
        :header-cell-style="headClass"
        :cell-style="rowClass"
      >
        <el-table-column
          type="selection"
          width="200"
        >
        </el-table-column>
        <el-table-column
          type="index"
          width="200"
          label='序号'
        >
        </el-table-column>
        <el-table-column
          prop="typeName"
          label="商品类型名称"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="typeremark"
          label="品牌类型描述"
          width="200"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button
              type="success"
              icon="el-icon-eleme"
              style='margin-left: 5px;'
              @click="brandVisible = true,getBrand(scope.row)"
            >
              选用品牌
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
    </div>

    <!-- 新增 -->
    <el-dialog
      title="新增类型信息"
      :visible.sync="dialogFormVisible1"
    >
      <el-form
        :model="insertForm"
        ref="insertFormRe"
      >
        <el-col span="12"></el-col>
        <el-form-item
          label="商品类型名称"
          :label-width="formLabelWidth"
          prop="typeName"
        >
          <el-col span="12">
            <el-input
              v-model="insertForm.typeName"
              autocomplete="off"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item
          label="商品类型描述"
          :label-width="formLabelWidth"
          prop="typeremark"
        >
          <el-col span="12">
            <el-input
              v-model="insertForm.typeremark"
              autocomplete="off"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item
          label="父菜单"
          :label-width="formLabelWidth"
          prop="typePid"
        >
          <el-col span="12">
            <el-select
              v-model="insertForm.typePid"
              clearable
              filterable
              placeholder="请选择父类型"
            >
              <el-option
                v-for="item in parentMenus"
                :label="item.typeName"
                :value="item.typeId"
                :key="item.typeId"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogFormVisible1 = false, insert()"
        >保 存</el-button>
      </div>
    </el-dialog>

    <!-- 修改 -->
    <el-dialog
      title="修改类型信息"
      :visible.sync="dialogFormVisible2"
    >
      <el-form
        :model="updateForm"
        ref="updateFormRe"
      >
        <el-col span="12"></el-col>
        <el-form-item
          label="id"
          :label-width="formLabelWidth"
          prop="id"
        >
          <el-col span="12">
            <el-input
              v-model="updateForm.typeId"
              autocomplete="off"
              :disabled="true"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item
          label="商品类型名称"
          :label-width="formLabelWidth"
        >
          <el-col span="12">
            <el-input
              v-model="updateForm.typeName"
              autocomplete="off"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item
          label="商品类型描述"
          :label-width="formLabelWidth"
        >
          <el-col span="12">
            <el-input
              v-model="updateForm.typeremark"
              autocomplete="off"
            ></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogFormVisible2 = false, update()"
        >保 存</el-button>
      </div>
    </el-dialog>

    <!-- 选用品牌 -->
    <el-dialog
      title="添加品牌信息"
      :visible.sync="brandVisible"
    >
      <el-transfer
        v-model="value"
        :data="data"
        :titles="['可用品牌', '已选品牌']"
      >
      </el-transfer>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="brandVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="brandVisible = false,saveBrand()"
        >保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    // const generateData = _ => {
    //   const data = [];
    //   const brands = ['LG', '三星', '华为', '小米', '1x', '锤子', '苹果'];
    //   brands.forEach((brand, index) => {
    //     data.push({
    //       label: brand,
    //       key: index + 1
    //     });
    //   });
    //   return data;
    // };
    return {
      // data: generateData(),
      value: [],
      tableData: [],
      multipleSelection: [],
      page: {
        // pageSize: "",
        // pageNum: "",
        // total: "",
        // pages: ""
      },
      formValue: {},
      delNum: [],
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'typeName',
        id: 'typeId'
      },
      // 模态框
      brandVisible: false,
      formLabelWidth: '120px',
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      updateForm: {},
      insertForm: {},
      parentMenus: []
    };
  },
  methods: {
    saveBrand () {
      this.updateForm.typeBrand = this.value.join();
      this.update();
    },
    getBrand (row) {
      this.updateForm = {};
      if (row.typeBrand != undefined) {
        let splits = row.typeBrand.split(",")
        this.value = splits.map(Number);
      }
    },
    queryParent () {
      this.$axios.get("/goodsType/selectParent")
        .then(res => {
          this.parentMenus = res.data;
        });
    },
    insert () {
      this.$axios.post("/goodsType", this.insertForm)
        .then(res => {
          if (res.code == 20000) {
            this.$message({
              message: '新增成功',
              type: 'success'
            });
          }
          this.query();
          this.queryTree();
        });
    },
    update () {
      this.$axios.put("/goodsType", this.updateForm)
        .then(res => {
          if (res.code == 20000) {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          }
          this.query();
          this.queryTree();
        });
    },
    queryTree () {
      this.$axios.get("/goodsType/selectTree")
        .then(res => {
          this.treeData = res.data;
        });
    },
    delSelected () {
      this.delNum = [];
      for (let key in this.multipleSelection) {
        console.log(key + '---' + this.multipleSelection[key].typeId);
        this.delNum.push(this.multipleSelection[key].typeId);
      }
      this.$axios.delete("/goodsType/" + this.delNum.join())
        .then(res => {
          if (res.code == 20000) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          }
          this.query();
          this.queryTree();
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
      }
      this.$axios.get("/goodsType/selectAll", {
        params: data
      }).then(res => {
        this.tableData = res.data.list; // 更新表格中的数据
        this.page = res.data;
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
        this.updateForm = val;
      }
    },
    headClass () { //表头居中显示
      return "text-align:center"
    },
    rowClass () { //表格数据居中显示
      return "text-align:center"
    },
    resetForm (formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    }
  },
  components: {},
  computed: {},
  created () {
    this.query();
    this.queryTree();
    this.queryParent();
  },
  mounted () { }
}
</script>

<style scoped>
[v-clock] {
  display: none;
}
</style>