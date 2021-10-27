<template>
  <div id="app">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">商品与赠品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>产品查询列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
    >
      <el-form-item label="存货档案编码">
        <el-input
          v-model="formInline.gcode"
          placeholder="请输入编码"
        ></el-input>
      </el-form-item>
      <el-form-item label="产品型号">
        <el-input
          v-model="formInline.gmodel"
          placeholder="请输入产品型号"
        ></el-input>
      </el-form-item>
      <el-form-item label="基础库-颜色">
        <el-select
          v-model="formInline.gcolor"
          placeholder="全部"
        >
          <el-option>无</el-option>
          <el-option
            v-for="item in options"
            :key="item.dic_key"
            :label="item.dic_value"
            :value="item.dic_value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品品牌">
        <el-select
          v-model="formInline.gbrand"
          placeholder="全部"
        >
          <el-option>无</el-option>
          <el-option
            v-for="item in options2"
            :key="item.dic_key"
            :label="item.dic_value"
            :value="item.dic_value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品分类">
        <el-select
          v-model="formInline.gsort"
          placeholder="全部"
        >
          <el-option>无</el-option>
          <el-option
            v-for="item in options3"
            :key="item.dic_key"
            :label="item.dic_value"
            :value="item.dic_value"
          >
          </el-option>

        </el-select>
      </el-form-item>

      <!--<option value="双网双待手机">双网双待手机</option>-->
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit1"
        >搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit2"
        >同步</el-button>
      </el-form-item>
    </el-form>
    <template>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="gid"
          label="序号"
          width="300"
        >
        </el-table-column>
        <el-table-column
          prop="gcode"
          label="存货档案编码"
          width="300"
        >
        </el-table-column>
        <el-table-column
          prop="gsort"
          label="基础库分类"
          width="300"
        >
        </el-table-column>
        <el-table-column
          prop="gbrand"
          label="基础库品牌"
          width="300"
        >
        </el-table-column>
        <el-table-column
          prop="gmodel"
          label="基础库型号"
          width="300"
        >
        </el-table-column>
        <el-table-column
          prop="gcolor"
          label="基础库颜色"
          width="300"
        >
        </el-table-column>
        <!--<template slot-scope="scope">-->
        <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
        <!--<el-button type="text" size="small">编辑</el-button>-->
        <!--</template>-->
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

  </div>
</template>

<script>
export default {
  data () {
    return {
      formInline: {
        gcode: '',
        gmodel: '',
        gcolor: '',
        gbrand: '',
        gsort: '',
      },
      options: '',
      options2: '',
      options3: '',
      tableData: '',
      currentPage4: '',
      totalNum: '',
      everyPageNum: 3,
    };
  },
  methods: {
    onSubmit1 () {
      var s = this.$qs.stringify(this.formInline);
      console.log(s + "sss");
      this.$axios.get('../product/selectParent?' + s)
        .then(response => {
          console.log(response.data);
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
    onSubmit2 () {
      console.log('submit2');
      this.$axios.get('../product/selectParent')
        .then(response => {
          console.log(response + "selectParent")
          console.log(response.data);
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
      this.$axios.get('../product/selectParent?' + s + "&pageSize=" + this.everyPageNum + "&currentPage=" + this.currentPage4)
        .then(response => {
          console.log(response.data);
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
      this.$axios.get('../product/selectParent?' + s + "&pageSize=" + this.everyPageNum + "&currentPage=" + this.currentPage4)
        .then(response => {
          console.log(response.data);
          if (response.code == 20000) {
            this.tableData = response.data.list;
            this.totalNum = response.data.total;
            this.currentPage4 = response.data.pageNum;
            this.everyPageNum = response.data.pageSize;
          }
        }).catch(function (error) {
          console.log(error)
        })


    }
  },
  components: {},
  computed: {},
  created () {
    this.$axios.get('../product/selectParent')
      .then(response => {
        console.log(response + "selectParent")
        console.log(response.data);
        if (response.code == 20000) {
          this.tableData = response.data.list;
          this.totalNum = response.data.total;
          this.currentPage4 = response.data.pageNum;
          this.everyPageNum = response.data.pageSize;
        }
      }).catch(function (error) {
        console.log(error)

      }),
      this.$axios.get('../product/color')
        .then(response => {
          if (response.code == 20000) {
            this.options = response.data;//得到数据的json格式的值；
          }
        }).catch(function (error) {
          console.log(error)

        }),
      this.$axios.get('../product/brand')
        .then(response => {
          if (response.code == 20000) {
            this.options2 = response.data;


          }
        }).catch(function (error) {
          console.log(error)

        }),
      this.$axios.get('../product/sort')
        .then(response => {
          if (response.code == 20000) {
            this.options3 = response.data;
          }
        }).catch(function (error) {
          console.log(error)

        })
  },
}
</script>

<style scoped>
</style>