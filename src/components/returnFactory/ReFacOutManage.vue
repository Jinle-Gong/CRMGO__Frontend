<template>
  <div id="main">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <el-link
          href="#"
          :underline="false"
        >返厂出库管理
        </el-link>
      </el-breadcrumb-item>

    </el-breadcrumb>
    <hr>

    <el-form
      ref="Factoryform"
      :model="Factoryform"
      label-width="100px"
      :inline="true"
    >

      <el-form-item
        label="审批时间"
        style="margin-left: 5%;"
      >
        <div class="block">
          <el-date-picker
            v-model="Factoryform.approvaltime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
      </el-form-item>

      <el-form-item label="返厂出库单号:">
        <el-input
          v-model="Factoryform.deliveryorderno"
          style="width: 150px;"
        ></el-input>
      </el-form-item>

      <br>
      <el-form-item
        label="制作时间"
        style="margin-left: 5%;"
      >
        <div class="block">
          <el-date-picker
            v-model="Factoryform.preparationtime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
      </el-form-item>

      <el-form-item label="返厂出库标志:">
        <el-select
          v-model="Factoryform.outboundsign"
          placeholder="全部"
          style="width: 150px;"
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

      <el-form-item label="审核状态">
        <el-select
          v-model="Factoryform.state"
          placeholder="全部"
          style="width: 150px;"
        >

          <el-option
            label="已通过"
            value="已通过"
          ></el-option>
          <el-option
            label="未通过"
            value="未通过"
          ></el-option>
          <el-option
            label="未审核"
            value="未审核"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-button
        type="primary"
        @click="newSubmit"
      >新增出库单</el-button>
      <el-button
        type="primary"
        @click="search"
      >搜索</el-button>
      <el-button
        type="primary"
        @click="Factorydeletet"
      >删除</el-button>
      <el-button
        type="primary"
        @click="Exportdocument"
      >导出</el-button>

    </el-form>
    <hr />

    <el-table
      :data="tableData"
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
        type="selection"
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
        label="制作时间"
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
        label="审核时间"
        width="150"
      >
      </el-table-column>

      <el-table-column
        prop="state"
        label="状态"
        width="150"
      >
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="query(scope.row)"
            type="warning"
          >查看</el-button>
          <el-button
            @click="modifylog(scope.row) "
            type="warning"
          >修改</el-button>
          <el-button
            type="danger"
            @click="shenhe(scope.row)"
          >审核</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
      :current-page="page.pageNum"
      :page-sizes="[5, 10]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      style="margin-left: 36%;margin-top: 420px;"
    >
    </el-pagination>

    <!-- 第一个模态框-------------------------------------------- -->

    <el-dialog
      title="新增出库单"
      :visible.sync="newformmotai"
      width="80%"
      high="500px"
    >

      <el-form
        ref="Badgoods"
        :model="Badgoods"
        label-width="100px"
        :inline="true"
      >
        <el-form-item
          label="商品名称:"
          style="margin-left: 10%;"
          prop="goodsname"
        >
          <el-input
            v-model="Badgoods.goodsname"
            style="width: 150px;"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item
          label="商品型号:"
          prop="goodstype"
        >
          <el-input
            v-model="Badgoods.goodstype"
            style="width: 150px;"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品颜色"
          prop="goodscolor"
        >
          <el-select
            v-model="Badgoods.goodscolor"
            placeholder="全部"
            style="width: 150px;"
            clearable
          >
            <el-option
              label="黑色"
              value="黑色"
            ></el-option>
            <el-option
              label="白色"
              value="白色"
            ></el-option>
            <el-option
              label="红色"
              value="红色"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="商品品牌"
          prop="goodsbrand"
        >
          <el-select
            v-model="Badgoods.goodsbrand"
            placeholder="全部"
            style="width: 150px;"
            clearable
          >
            <el-option
              label="三星"
              value="三星"
            ></el-option>
            <el-option
              label="华为"
              value="华为"
            ></el-option>
            <el-option
              label="苹果"
              value="苹果"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <!-- 传自定义数据  否则会传事件本身-->
          <el-button
            type="primary"
            @click="badsearch({})"
          >搜索</el-button>
        </el-form-item>

      </el-form>
      <hr />

      <template>
        <el-table
          :data="intableData"
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

          <el-table-column label="返厂配置">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.goodsleixing"
                placeholder="请选择返厂类型"
              >
                <el-option
                  label="维修"
                  value="维修"
                ></el-option>
                <el-option
                  label="退货"
                  value="退货"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="danger"
                @click="indeletebutt(scope.row.id, scope.$index)"
              >删除</el-button>
            </template>
          </el-table-column>

        </el-table>
      </template>

      <el-form
        ref="yanzhengform"
        :model="yanzhengform"
        label-width="100px"
        :rules="rules"
        :inline="true"
        style=" margin: 50px;"
      >

        <el-form-item
          label="返厂地址:"
          prop="address"
          style="margin-left: 2%;"
        >
          <el-select
            v-model="yanzhengform.address"
            placeholder="请选择返地点"
            @change="xindizhi"
            clearable
          >
            <el-option
              label="苹果"
              value="苹果"
            ></el-option>
            <el-option
              label="三星"
              value="三星"
            ></el-option>
            <el-option
              label="华为"
              value="华为"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="margin-left: 45%;">
          <el-button
            type="primary"
            @click="submitForm('yanzhengform')"
          >立即创建</el-button>
          <el-button @click="resetintableData()">重置</el-button>
          <el-button @click="incancel(newformmotai=false)">返回</el-button>
        </el-form-item>
      </el-form>
      <el-pagination
        @size-change="badSizeChange"
        @current-change="badPageChange"
        :current-page="badpage.pageNum"
        :page-sizes="[5, 10]"
        :page-size="badpage.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="badpage.total"
        style="margin-left: 36%;margin-top: 60px;"
      >
      </el-pagination>

    </el-dialog>

    <!-- 首页修改模态框 -->

    <el-dialog
      title="修改出库单"
      :visible.sync="modifyformmotai"
      width="80%"
      high="500px"
    >

      <el-form
        ref="modifyBadgoods"
        :model="modifyBadgoods"
        label-width="100px"
        :inline="true"
      >
        <el-form-item
          label="商品名称:"
          style="margin-left: 35%;"
        >
          <el-input
            v-model="modifyBadgoods.goodsname"
            style="width: 150px;"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="商品型号:">
          <el-input
            v-model="modifyBadgoods.goodsmodel"
            style="width: 150px;"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="商品颜色">
          <el-select
            v-model="modifyBadgoods.goodscolor"
            placeholder="全部"
            style="width: 150px;"
            clearable
          >
            <el-option
              label="黑色"
              value="黑色"
            ></el-option>
            <el-option
              label="白色"
              value="白色"
            ></el-option>
            <el-option
              label="红色"
              value="红色"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 传自定义数据  否则会传事件本身-->
        <el-button
          type="primary"
          @click="modifylog({})"
        >搜索</el-button>

      </el-form>
      <template>
        <el-table
          :data="modifyintableData"
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
          <el-table-column label="返厂配置">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.goodsleixing"
                placeholder="请选择返厂类型"
              >
                <el-option
                  label="维修"
                  value="维修"
                ></el-option>
                <el-option
                  label="退货"
                  value="退货"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="danger"
                @click="modifydeleted(scope.row.id, scope.$index,scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>

        </el-table>
      </template>
      <el-form
        ref="yanzhengform"
        :model="yanzhengform"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item
          label="返厂地址:"
          prop="address"
          style="margin-top: 50px;"
        >
          <el-select
            v-model="yanzhengform.address"
            placeholder="请选择返地点"
            clearable
          >
            <el-option
              label="苹果"
              value="苹果"
            ></el-option>
            <el-option
              label="三星"
              value="三星"
            ></el-option>
            <el-option
              label="华为"
              value="华为"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        @click="modifybutton('yanzhengform')"
        style="margin-left: 85%; margin-top: 80px;"
      >立即修改</el-button>

    </el-dialog>

    <!--审核模态框 -->
    <el-dialog
      title="审核出库单"
      :visible.sync="shenheformmotai"
      width="80%"
      high="500px"
    >

      <template>
        <el-table
          :data="shenhetableData"
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
          :data="shenheneirong"
          border
          style="width: 70%;margin-top: 50px;margin-left: 30%;"
        >
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

      </template>
      <el-button
        type="primary"
        @click="shenhebutton()"
        style="margin-top: 50px;margin-left: 90%;"
      >返回</el-button>

    </el-dialog>

    <!-- 详情页模态框------------------------------------------------ -->

    <el-dialog
      title="新增出库单"
      :visible.sync="xiangqingform"
      width="80%"
      high="500px"
    >
      <template>
        <el-table
          :data="xiangqingtableData"
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
            label="返厂类型"
          >
          </el-table-column>

          <el-table-column
            prop="goodsaddress"
            label="返厂地点"
            width="150"
          >
          </el-table-column>

        </el-table>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {

      Factoryform: {
        deliveryorderno: "",
        state: "",
        preparationtime: "",
        approvaltime: "",
        ppageNum: 1,
        ppageSize: 5,
      },

      intableData: [{
        goodsid: '',
        goodsbrand: '',
        goodsname: '',
        goodsmodel: '',
        goodscolor: '',
        goodssupplier: '',
        goodstrack: '',
        goodsleixing: '',


      }],
      address: '',
      shenhetableData: [{}], //审批表单    

      //审批记录
      shenheneirong: [{}],

      xiangqingtableData: [],
      xiangqingform: false,
      modifyformmotai: false,
      shenheformmotai: false,
      modifyintableData: [],
      tableData: [],
      page: {
        // pageNum:0,
        // pageSize:0,
        // total:0
      },
      inpage: {
        pageNum: '',
        pageSize: '',
      },

      rules: {
        address: [{
          required: true,
          message: '请选择入库地址',
          trigger: 'blur'
        }]
      },

      yanzhengform: { //表单验证
        address: "",
      },


      newformmotai: false,
      number: '',

      modifyform: {},

      // 出库模态框
      Badgoods: {
        goodsname: '',
        goodstype: '',
        goodscolor: '',
        goodsbrand: '',
        goodssupplier: '',
      },
      badtableData: {
        rid: '',
        goodsid: '',
        goodsname: '',
        goodstype: '',
        goodsbrand: '',
        goodsmodel: '',
        goodscolor: '',
        goodssupplier: '',
        goodsstate: '',
        goodstrack: '',
      },
      modifyBadgoods: {
        goodschuchangid: '', //修改模态框
        goodsname: '',
        goodsmodel: '',
        goodscolor: '',
      },

      badpage: {
        pageNum: '',
        pageSize: '',

      },
      deletednum: [],
    };
  },
  methods: {
    Exportdocument () {
      location.href = "/Factory/Export/";
    },

    search () {

      this.$axios.post("/Factory/search", this.Factoryform).then(response => {
        this.tableData = response.data.list;
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
      this.search({})
    },
    handlePageChange (pageNum) {
      //页码改变
      this.Factoryform.ppageNum = pageNum,
        this.Factoryform.ppageSize = this.page.pageSize
      this.search({})
    },

    query (row) { //	查看详情页

      this.number = row.deliveryorderno

      this.$axios.get("/Factory/query?" + "number=" + this.number).then(response => {

        this.xiangqingtableData = response.data
        this.xiangqingform = true;

      }).catch(function (error) {
        console.log(error);
      })

    },

    modifylog (row) { //首页修改获得数据
      if (this.modifyBadgoods.goodschuchangid == '') {
        this.modifyBadgoods.goodschuchangid = row.deliveryorderno
      }
      this.$axios.get("/Factory/modify?" +
        "goodschuchangid=" + this.modifyBadgoods.goodschuchangid

        +
        "&goodsname=" + this.modifyBadgoods.goodsname +
        "&goodsmodel=" + this.modifyBadgoods.goodsmodel +
        "&goodscolor=" + this.modifyBadgoods.goodscolor
      ).then(response => {
        this.modifyintableData = response.data
        this.modifyformmotai = true;
      }).catch(function (error) {
        console.log(error);
      })
    },


    modifydeleted (id, index, row) { //首页行修改保存 删除当前行

      this.modifyintableData.splice(index, 1)
      this.deletednum.push(row.goodsid)
    },

    modifybutton (yanzhengform) { //首页行修改保存


      this.$refs[yanzhengform].validate((valid) => {
        if (valid) {
          this.$axios.post("/Factory/PPmodify", {
            'address': this.yanzhengform.address,
            'goods': this.modifyintableData,
            'number': this.modifyBadgoods.goodschuchangid,
            'deletednum': this.deletednum
          }).then(response => {
            if (response.data == 1) {
              this.modifyformmotai = false;
              this.$message({
                message: '修改成功',
                type: 'success',

              });

            }
          })

        }
      });

    },


    shenhe (row) { //审核模态框
      this.number = row.deliveryorderno
      this.$axios.get("/Factory/shenhe?" + "shenheid=" + this.number).then(response => {
        this.shenhetableData = response.data.shenhegoods



        this.shenheneirong = response.data.shenhejilu

        this.shenheformmotai = true;

      }).catch(function (error) {
        console.log(error);
      })



    },
    shenhebutton () {

      this.shenheformmotai = false;
    },


    Factorydeletet () { //首页的删除


      this.$axios.post("/Factory/deletet", this.$refs.tableData.selection).then(response => {

        if (response.data == 1) {

          this.$message({
            message: '删除成功',
            type: 'success'
          });

          location.reload();
        } else {
          this.$message({
            message: '删除失败',
            type: 'warning'
          });
        }

      }).catch(function (error) {
        console.log(error);
      })
    },



    //------------------------------------------新增出库单----------------------------------------------------------------

    xindizhi () { //返厂地点搜索
      this.Badgoods.goodssupplier = this.yanzhengform.address

      this.badsearch({

      })

    },

    submitForm (yanzhengform) { //出库单保存



      this.$refs[yanzhengform].validate((valid) => {
        if (valid) {
          this.$axios.post("/Factory/outbound", {
            'address': this.yanzhengform.address,
            'goods': this.intableData
          }).then(response => {
            if (response.data == 1) {
              this.modifyformmotai = false;
              this.$message({
                message: '创建成功',
                type: 'success',

              });
              this.search();
              this.newformmotai = false;
            } else {
              this.$message({
                message: '出库失败',
                type: 'warning'
              });
            }
          })

        }
      });



    },


    newSubmit () {
      this.newformmotai = true;
    },

    indeletebutt (id, index) { //删除当前行

      this.intableData.splice(index, 1)
    },





    newbadparts () {
      this.bad = true;
    },
    //出库单搜索
    badsearch () {

      this.$axios.get("/Factory/bad?" +
        "pageNumber=" + this.badpage.pageNum +
        "&pageSize=" + this.badpage.pageSize +
        "&goodsname=" + this.Badgoods.goodsname +
        "&goodstype=" + this.Badgoods.goodstype +
        "&goodscolor=" + this.Badgoods.goodscolor +
        "&goodsbrand=" + this.Badgoods.goodsbrand +
        "&goodssupplier=" + this.Badgoods.goodssupplier +
        "&goodschuchangid=" + this.number
      ).then(response => {
        this.intableData = response.data.list;
        this.modifyintableData = response.data.list;
        this.badpage = response.data;
      }).catch(function (error) {
        console.log(error);
      })
    },

    badSizeChange (pageSize) {

      this.badpage.pageSize = pageSize,
        this.badsearch({
        })
    },
    badPageChange (pageNum) { //第二个模态框第几页


      this.badpage.pageNum = pageNum,
        this.badsearch()
    },

    resetintableData () { //重置表单

      this.$refs.Badgoods.resetFields()
      this.$refs.yanzhengform.resetFields()


    },

    //返回
    incancel () {
      this.newform = false;
    },

  },
  created () {
    this.search(); //初始化
    this.badsearch();
  },
}
</script>

<style scoped>
</style>