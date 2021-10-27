<template>
  <div id="main">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="#">返厂出库单审核</a></el-breadcrumb-item>
    </el-breadcrumb>
    <hr>
    <el-button
      type="info"
      plain
      @click="daishenhe"
    >待审核</el-button>
    <el-button
      type="warning"
      plain
      @click="shenheguo "
    >审核通过</el-button>
    <el-button
      type="danger"
      plain
      @click="shenhebu"
    >审核不过</el-button>
    <hr>
    <!-- 首页表头 -->
    <el-form
      ref="Factoryform"
      :model="Factoryform"
      label-width="100px"
      :inline="true"
    >

      <el-form-item
        label="审批时间："
        style="margin-left:5%;"
      >
        <div class="block">
          <el-date-picker
            style="width: 170px;"
            v-model="Factoryform.beginTimeA"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            clearable
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="至">
        <div class="block">
          <el-date-picker
            style="width: 170px;"
            v-model="Factoryform.endTimeA"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            clearable
          >
          </el-date-picker>
        </div>
      </el-form-item>

      <el-form-item label="返厂出库单号:">
        <el-input
          v-model="Factoryform.DeliveryOrderNo"
          style="width: 170px"
          clearable
        ></el-input>
      </el-form-item>

      <br>
      <el-form-item
        label="制单时间："
        style="margin-left:5%;"
      >
        <div class="block">
          <el-date-picker
            style="width: 170px;"
            v-model="Factoryform.beginTimeP"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            clearable
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="至">
        <div class="block">
          <el-date-picker
            style="width: 170px;"
            v-model="Factoryform.endTimeP"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            clearable
          >
          </el-date-picker>
        </div>
      </el-form-item>

      <el-form-item label="制单人:">
        <el-input
          v-model="Factoryform.Creator"
          style="width: 170px;"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item label="返厂出库标志:">
        <el-select
          v-model="Factoryform.OutboundSign"
          placeholder="全部"
          style="width: 150px;"
          clearable
        >

          <el-option
            label="已出库"
            value="已出库"
          ></el-option>
          <el-option
            label="未出库"
            value="未出库"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="返厂地点:">
        <el-input
          v-model="Factoryform.address"
          style="width: 150px;"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="rushenhesearch"
        >搜索</el-button>
        <el-button
          type="primary"
          @click="Exportdocument"
        >导出</el-button>
      </el-form-item>

    </el-form>
    <hr />
    <!--  首页内容 -->
    <el-table
      :data="shenhetableData"
      highlight-current-row
      style="width: 99% "
      ref="tableData"
    >
      <el-table-column
        prop="rid"
        label="序号"
        width="100"
      >
      </el-table-column>

      <el-table-column
        prop="deliveryorderno"
        label="返厂出库单号"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="outboundsign"
        label="返厂出库标志"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="creator"
        label="制单人"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="preparationtime"
        label="制单时间"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="approvedby"
        label="审批人"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="approvaltime"
        label="审批时间"
        width="150"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="shenhe(scope.row)"
            type="warning"
          >审核</el-button>
          <el-button
            @click="RFAudit(scope.row) "
            type="warning"
          >审核时间</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
      :current-page="page.pageNum"
      :page-sizes="[5,8]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      style="margin-left: 36%;margin-top: 350px;"
    >
    </el-pagination>

    <!-- 审核模态框 -->
    <el-dialog
      title="返厂出库单审核"
      :visible.sync="shenheformmotai"
      width="80%"
      high="500px"
    >
      <el-form
        ref="yijianform"
        :model="yijianform"
        label-width="100px"
        :rules="rules"
      >
        <el-table
          :data="neirong"
          border
          style="width: 100%;margin-top: 30px;"
        >
          <el-table-column
            prop="goodsid"
            label="商品串号"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="goodsbrand"
            label="商品品牌"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="goodsname"
            label="商品名称"
          >
          </el-table-column>
          <el-table-column
            prop="goodsmodel"
            label="商品型号"
          >
          </el-table-column>
          <el-table-column
            prop="goodscolor"
            label="商品颜色"
          >
          </el-table-column>
          <el-table-column
            prop="goodssupplier"
            label="商品供应商"
          >
          </el-table-column>
          <el-table-column
            prop="goodstrack"
            label="商品跟踪信息"
          >
          </el-table-column>
          <el-table-column
            prop="goodsleixing"
            label="商品跟踪信息"
          >
          </el-table-column>
        </el-table>
        <el-table
          :data="neirongaddress"
          border
          style="width: 300px;margin-top: 50px;margin-left: 70%;"
        >
          <el-table-column
            prop="address"
            label="返厂地点"
          >
          </el-table-column>
        </el-table>

        <el-form-item
          label="审核意见:"
          prop="shenpijilu"
          style="margin-left: 68%;margin-top: 20px; "
        >
          <el-input
            type="textarea"
            v-model="yijianform.shenpijilu"
            style="width: 200px; "
          ></el-input>
        </el-form-item>

        <el-form-item
          label="审核状态:"
          prop="state"
          style="margin-left: 68%;margin-top: 20px; "
        >
          <el-select
            v-model="yijianform.state"
            placeholder="请选择审核状态"
          >
            <el-option
              label="审核通过"
              value="已通过"
            ></el-option>
            <el-option
              label="审核未通过"
              value="未通过"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button
        @click="yijiansub('yijianform')"
        style="margin-left: 70%;"
      >确定</el-button>
      <el-button @click="shenheformmotai=false">返回</el-button>

      <el-pagination
        @size-change="shenheSizeChange"
        @current-change="shenhePageChange"
        :current-page="shenhepage.pageNum"
        :page-sizes="[5, 8]"
        :page-size="shenhepage.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="shenhepage.total"
        style="margin-left: 36%;margin-top: 60px;"
      >
      </el-pagination>
    </el-dialog>

    <!-- 查看审核模态框 -->
    <el-dialog
      title="返厂出库单审核跟踪"
      :visible.sync="RFAuditformmotai"
      width="80%"
      high="500px"
    >
      <el-table
        :data="RFAudittable"
        border
        style="width: 100%;margin-top: 30px;"
      >
        <el-table-column
          prop="goodsid"
          label="商品串号"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="goodsbrand"
          label="商品品牌"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="goodsname"
          label="商品名称"
        >
        </el-table-column>
        <el-table-column
          prop="goodsmodel"
          label="商品型号"
        >
        </el-table-column>
        <el-table-column
          prop="goodscolor"
          label="商品颜色"
        >
        </el-table-column>
        <el-table-column
          prop="goodssupplier"
          label="商品供应商"
        >
        </el-table-column>
        <el-table-column
          prop="goodstrack"
          label="商品跟踪信息"
        >
        </el-table-column>
        
       
      
      </el-table>

      <el-table
        :data="RFAudittable2"
        border
        style="width: 70%;margin-top: 30px;margin-left: 30%;"
      >
        <el-table-column
          prop="address"
          label="返厂地点"
          width="120"
        >
        </el-table-column>
       
        <el-table-column
          prop="approvedby"
          label="审批人"
        >
        </el-table-column>
        <el-table-column
          prop="approvaltime"
          label="审批时间"
        >
        </el-table-column>
        <el-table-column
          prop="state"
          label="审批状态"
        >
        </el-table-column>
        <el-table-column
          prop="shenpijilu"
          label="审批意见"
        >
        </el-table-column>
      </el-table>
      <el-button
        @click="RFAuditformmotai=false"
        style="margin-left: 90%; margin-top: 50px;"
      >返回</el-button>

    </el-dialog>

  </div>
</template>

<script>
export default {
  data () {
    return {

      // 首页表单
      Factoryform: {
        DeliveryOrderNo: "",
        OutboundSign: "",
        Creator: "",
        address: "",
        beginTimeP: '', //开始制单时间
        endTimeP: '', //结束制单时间
        beginTimeA: '', //开始审批时间
        endTimeA: '', //开始接受时间
        ppageNum: 5,
        ppageSize: 8,
        state: "",
      },
      shenheformmotai: false,
      RFAuditformmotai: false,
      shenhetableData: [{}], //审批表单  
      shenheneirong: [],


      yijianform: {
        shenpijilu: "",
        state: "",
        deliveryorderno: "",
      },
      RFAudittable: [{}],
      RFAudittable2: [{}],

      rules: {
        shenpijilu: [{ required: true, message: '请输入审核意见', trigger: 'change' }],
        state: [{ required: true, message: '请选择审核状态', trigger: 'blur' }]
      },

      page: {},
      neirong: [],

      neirongaddress: [{
        address: "",
      }],
      shenhepage: {
        pageNum: '5',
        pageSize: '8',

      },
      RFAuditpage: {
        pageNum: '5',
        pageSize: '8',
      },
      number: "",
    };
  },
  methods: {
    Exportdocument () {
      location.href = "http://localhost:8080/CFactoryshenhe/Export/"
    },

    // 首页搜索
    rushenhesearch () {

      this.$axios.post("/CFactoryshenhe/Cshenhesearch", this.Factoryform).then(response => {
        this.shenhetableData = response.data.list;
        this.page = response.data;
      }).catch(function (error) {
        console.log(error);
      })
    },
    handleSizeChange (pageSize) {
      //每页记录数改变
      console.log(pageSize)
      this.Factoryform.ppageNum = this.page.pageNum
      this.Factoryform.ppageSize = pageSize
      this.rushenhesearch({})
    },
    handlePageChange (pageNum) {
      //页码改变
      this.Factoryform.ppageNum = pageNum,
        this.Factoryform.ppageSize = this.page.pageSize
      this.rushenhesearch({})
    },

    daishenhe () {
      this.Factoryform.state = "未审核"
      this.rushenhesearch();
    },
    shenheguo () {
      this.Factoryform.state = "已通过"
      this.rushenhesearch();
    },
    shenhebu () {
      this.Factoryform.state = "未通过"
      this.rushenhesearch();
    },

    shenhe (row) {
      if (row.deliveryorderno != undefined) {
        this.number = row.deliveryorderno
      }
      this.$axios.get("/CFactoryshenhe/CFshenhe?" + "pageNumber=" + this.shenhepage.pageNum + "&pageSize=" + this.shenhepage.pageSize + "&RFshenheid=" + this.number).then(response => {
        this.neirong = response.data.list

        this.neirongaddress[0].address = this.neirong[0].goodsaddress
        this.shenhepage = response.data;

        this.shenheformmotai = true;
      }).catch(function (error) {
        console.log(error);
      })

    },
    shenheSizeChange (pageSize) {
      this.shenhepage.pageSize = pageSize,
      this.shenhe({})
    },
    shenhePageChange (pageNum) {     //第二个模态框第几页
      this.shenhepage.pageNum = pageNum,
      this.shenhe({})
    },

    yijiansub (yijianform) {				//审核意见,状态
      this.yijianform.deliveryorderno = this.number

      this.$refs[yijianform].validate((valid) => {
        if (valid) {
          this.$axios.post("/CFactoryshenhe/yijiansub", this.yijianform).then(response => {
            if (response.data == 1) {
              this.$message({
                message: '操作成功',
                type: 'success'
              });

            } else {
              this.$message({
                message: '操作失败',
                type: 'warning'
              });
            }
          }).catch(function (error) {
            console.log(error);
          })


        }
      });
    },

    RFAudit (row) {
      if (row.deliveryorderno != undefined) {
        this.number = row.deliveryorderno
      }
      this.$axios.get("/CFactoryshenhe/CFAudit?" + "RFshenheid=" + this.number).then(response => {

        if (response.code == 20000) {

          this.RFAuditformmotai = true;
          this.RFAudittable = response.data.goods

          this.RFAudittable2[0] = response.data.fact
          console.log(response.data.data.goods);
        }

      }).catch(function (error) {
        console.log(error);
      })
    },
  },
  components: {},
  computed: {},
  created () {
    this.rushenhesearch(); //初始化
  },
  mounted () { }
}
</script>

<style scoped>
</style>