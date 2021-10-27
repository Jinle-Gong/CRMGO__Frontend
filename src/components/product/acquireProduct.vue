<template>
  <div
    id="main"
    v-clock
  >
    <template>
      <el-table
        :data="tableData"
        border
        style="width: 66%"
      >
        <el-table-column
          prop="gid"
          label="序号"
          width="55"
        >
        </el-table-column>
        <el-table-column
          prop="gcode"
          label="商品id"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="gname"
          label="商品名称"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="gsort"
          label="商品分类"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="gbrand"
          label="商品品牌"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="gmodel"
          label="商品型号"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="gcolor"
          label="商品颜色"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="gmarketprize"
          label="市场价"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="gmallprize"
          label="商城价"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="gminsum"
          label="库存"
          width="120"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="120"
        >
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="text"
              size="small"
            >选择</el-button>
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

  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: -1,
      currentPage4: -1,
      totalNum: -1,
      everyPageNum: 3,
    };
  },
  methods: {
    onSubmit1 () {
      var s = window.Qs.stringify(this.formInline);
      this.$axios.get('/product/selectParent?' + s)
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
      this.everyPageNum = val;
      var s = window.Qs.stringify(this.formInline);
      this.$axios.get('/product/selectParent?' + s + "&pageSize=" + this.everyPageNum + "&currentPage=" + this.currentPage4)
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
      this.currentPage4 = val;
      var s = window.Qs.stringify(this.formInline);
      this.$axios.get('/product/selectParent?' + s + "&pageSize=" + this.everyPageNum + "&currentPage=" + this.currentPage4)
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
    handleClick (row) {
      sessionStorage.setItem("product", JSON.stringify(row));
      this.$router.push("/main/PriceAudit")
    }
  },
  created () {
    this.$axios.get('/product/selectParent')
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
[v-clock] {
  display: none;
}
</style>