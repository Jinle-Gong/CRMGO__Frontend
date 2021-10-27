<template>
  <div id="app">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">商品与赠品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品品牌管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品品牌列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
    >
      <el-form-item label="品牌名称">
        <el-input
          v-model="formInline.bname"
          placeholder="请输入品牌名称"
        ></el-input>
      </el-form-item>
      <!--<option value="双网双待手机">双网双待手机</option>-->
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit1"
        >搜索</el-button>
        <el-button
          type="primary"
          @click="dialogTableVisible = true"
        >新增品牌</el-button>
        <el-button
          type="primary"
          @click="onSubmit1"
        >同步基础库品牌</el-button>
      </el-form-item>
    </el-form>
    <template>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="bid"
          label="序号"
          width="300"
        >
        </el-table-column>
        <el-table-column
          prop="bname"
          label="品牌名称"
          width="300"
        >
        </el-table-column>
        <el-table-column
          prop="bsite"
          label="品牌网址"
          width="500"
        >
        </el-table-column>
        <el-table-column
          prop="bdescribe"
          label="品牌描述"
          width="300"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="300"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row),dialogTableVisible2 = true"
            >修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="dialogTableVisible3 = true"
            >删除
            </el-button>
            <el-dialog
              title="警告"
              :visible.sync="dialogTableVisible3"
            >
              <p>你确定要删除吗</p>
              <div
                slot="footer"
                class="dialog-footer"
              >
                <el-button @click="dialogTableVisible3=false">取 消</el-button>
                <el-button
                  type="primary"
                  @click="handleDelete(scope.$index, scope.row),dialogTableVisible3=false"
                >确 定</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[2, 3, 4, 5]"
          :page-size="everyPageNum"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNum"
        >
        </el-pagination>
      </div>
    </template>
    <el-dialog
      title="新增品牌信息"
      :visible.sync="dialogTableVisible"
    >
      <el-form
        ref="form"
        :model="form2"
        label-width="200px"
      >
        <el-form-item label="品牌名称:">
          <el-input v-model="form2.bname"></el-input>
        </el-form-item>
        <el-form-item label="品牌网址:">
          <el-input v-model="form2.bsite"></el-input>
        </el-form-item>
        <el-form-item label="品牌描述:">
          <el-input v-model="form2.bdescribe"></el-input>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        @click="onSubmit3"
      >保存</el-button>
    </el-dialog>
    <el-dialog
      title="修改品牌信息"
      :visible.sync="dialogTableVisible2"
    >
      <el-form
        ref="form"
        :model="form3"
        label-width="200px"
      >
        <el-form-item label="品牌名称:">
          <el-input v-model="form3.bname"></el-input>
        </el-form-item>
        <el-form-item label="品牌网址:">
          <el-input v-model="form3.bsite"></el-input>
        </el-form-item>
        <el-form-item label="品牌描述:">
          <el-input v-model="form3.bdescribe"></el-input>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        @click="onSubmit4"
      >保存</el-button>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data () {
    return {
      formInline: {
        bname: '',

      },
      tableData: '',
      currentPage4: '',
      totalNum: '',
      everyPageNum: 3,
      gridData: '',
      form2: {
        bname: '',
        bsite: '',
        bdescribe: '',
      },
      form3: {
        bname: '',
        bsite: '',
        bdescribe: '',
        bid: '',
      },
      dialogTableVisible: false,
      dialogTableVisible2: false,
      dialogTableVisible3: false,
    };
  },
  methods: {
    onSubmit1 () {
      var s = this.$qs.stringify(this.formInline);
      this.$axios.get('../product/selectbrand?' + s + "&pageSize=" + this.everyPageNum + "&currentPage=" + this.currentPage4)
        .then(response => {
          if (response.code == 20000) {
            this.tableData = response.data.list;
            this.totalNum = response.data.total;
            this.currentPage4 = response.data.pageNum;
            this.everyPageNum = response.data.pageSize;
          }
        }).catch(function (error) {
          console.log(error)

        })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
      this.everyPageNum = val;
      var s = this.$qs.stringify(this.formInline);
      this.$axios.get('../product/selectbrand?' + s + "&pageSize=" + this.everyPageNum + "&currentPage=" + this.currentPage4)
        .then(response => {
          if (response.code == 20000) {
            this.tableData = response.data.list;
            this.totalNum = response.data.total;
            this.currentPage4 = response.data.pageNum;
            this.everyPageNum = response.data.pageSize;
          }
        }).catch(function (error) {
          console.log(error)

        })
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.currentPage4 = val;
      var s = this.$qs.stringify(this.formInline);
      this.$axios.get('../product/selectbrand?' + s + "&pageSize=" + this.everyPageNum + "&currentPage=" + this.currentPage4)
        .then(response => {
          if (response.code == 20000) {
            this.tableData = response.data.list;
            this.totalNum = response.data.total;
            this.currentPage4 = response.data.pageNum;
            this.everyPageNum = response.data.pageSize;
          }
        }).catch(function (error) {
          console.log(error)

        })
    },
    handleEdit (index, row) {
      console.log(row);
      this.form3.bname = row.bname;
      this.form3.bsite = row.bsite;
      this.form3.bdescribe = row.bdescribe;
      this.form3.bid = row.bid;
    },
    handleDelete (index, row) {
      console.log(index, row);
      this.$axios.get('../product/deletebrand?bid=' + row.bid + "&pageSize=" + this.everyPageNum + "&currentPage=" + this.currentPage4)
        .then(response => {
          if (response.code == 20000) {
            this.totalNum = response.data.total;
            this.currentPage4 = response.data.pageNum;
            this.everyPageNum = response.data.pageSize;
          }
        }).catch(function (error) {
          console.log(error)

        }),
        this.onSubmit1();
    },
    onSubmit3 () {
      console.log("onsubmit3")
      var s = this.$qs.stringify(this.form2);
      this.$axios.get('../product/insertbrand?' + s + "&pageSize=" + this.everyPageNum + "&currentPage=" + this.currentPage4)
        .then(response => {
          if (response.code == 20000) {
            this.totalNum = response.data.total;
            this.currentPage4 = response.data.pageNum;
            this.everyPageNum = response.data.pageSize;
          }
        }).catch(function (error) {
          console.log(error)

        }),
        this.onSubmit1();

    },
    onSubmit4 () {
      var s = this.$qs.stringify(this.form3);
      console.log(s)
      this.$axios.get('../product/updatebrand?' + s + "&pageSize=" + this.everyPageNum + "&currentPage=" + this.currentPage4)
        .then(response => {
          if (response.code == 20000) {
            this.totalNum = response.data.total;
            this.currentPage4 = response.data.pageNum;
            this.everyPageNum = response.data.pageSize;
          }
        }).catch(function (error) {
          console.log(error)
        }),
        this.onSubmit1();
    }

  },
  components: {},
  computed: {},
  created () {
    this.$axios.get('../product/selectbrand')
      .then(response => {
        if (response.code == 20000) {
          this.tableData = response.data.list;
          this.totalNum = response.data.total;
          this.currentPage4 = response.data.pageNum;
          this.everyPageNum = response.data.pageSize;
        }
      }).catch(function (error) {
        console.log(error)

      })
  },
  mounted () { }
}
</script>

<style scoped>
</style>