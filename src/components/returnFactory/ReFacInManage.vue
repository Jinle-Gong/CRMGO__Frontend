<template>

  <div id="main">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="#">返厂入库管理</a></el-breadcrumb-item>
    </el-breadcrumb>
    <hr>

    <el-form
      ref="ruform"
      :model="ruform"
      label-width="100px"
      :inline="true"
    >

      <el-form-item
        label="制单时间："
        prop="beginTimeP"
        style="margin-left: 5%;"
      >
        <div class="block">
          <el-date-picker
            style="width: 170px"
            v-model="ruform.beginTimeP"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
      </el-form-item>

      <el-form-item
        label="至"
        prop="endTimeP"
      >
        <div class="block">
          <el-date-picker
            style="width: 170px"
            v-model="ruform.endTimeP"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
      </el-form-item>

      <el-form-item
        label="返入出库单号:"
        prop="deliveryorderno"
      >
        <el-input
          v-model="ruform.deliveryorderno"
          style="width: 150px; "
        ></el-input>
      </el-form-item>

      <el-form-item
        label="审核状态"
        prop="state"
      >
        <el-select
          v-model="ruform.state"
          placeholder="全部"
          style="width: 150px;"
        >
          <el-option
            label="已通过"
            value="已通过"
          ></el-option>
          <el-option
            label="未审核"
            value="未审核"
          ></el-option>
          <el-option
            label="未通过"
            value="未通过"
          ></el-option>
        </el-select>
      </el-form-item>

      <br>
      <el-form-item
        label="审批时间："
        prop="beginTimeA"
        style="margin-left: 5%;"
      >
        <div class="block">
          <el-date-picker
            style="width: 170px"
            v-model="ruform.beginTimeA"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item
        label="至"
        prop="endTimeA"
      >
        <div class="block">
          <el-date-picker
            style="width: 170px"
            v-model="ruform.endTimeA"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
      </el-form-item>

      <el-form-item
        label="制单人:"
        prop="creator"
      >
        <el-input
          v-model="ruform.creator"
          style="width: 150px;"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="返入出库标志:"
        prop="outboundsign"
      >
        <el-select
          v-model="ruform.outboundsign"
          placeholder="未选择"
          style="width: 150px;"
        >

          <el-option
            label="已入库"
            value="已入库"
          ></el-option>
          <el-option
            label="未入库"
            value="未入库"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>

        <el-button
          type="primary"
          @click="ruSubmit"
        >新增入库单</el-button>
        <el-button
          type="primary"
          @click="rusearch"
        >搜索</el-button>
        <el-button
          type="primary"
          @click="rudeletet('ruform')"
        >删除</el-button>
        <el-button
          type="primary"
          @click="Exportdocument"
        >导出</el-button>
      </el-form-item>

    </el-form>
    <hr />

    <el-table
      :data="rutableData"
      highlight-current-row
      style="width: 99% "
      ref="rutableData"
    >
      <el-table-column
        prop="rid"
        label="序号"
        width="100"
      >
      </el-table-column>
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        prop="deliveryorderno"
        label="返厂入库单号"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="outboundsign"
        label="返厂入库标志"
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
      style="margin-left: 36%;margin-top: 320px;"
    >
    </el-pagination>

    <!-- 新增入库模态框 -->
    <el-dialog
      title="新增入库单"
      :visible.sync="ruformmotai"
      width="80%"
      high="500px"
    >
      <el-form
        ref="ruBadgoods"
        :model="ruBadgoods"
        label-width="100px"
        :inline="true"
      >
        <el-form-item
          label="商品名称:"
          style="margin-left: 10%;"
          prop="goodsname"
        >
          <el-input
            v-model="ruBadgoods.goodsname"
            style="width: 150px;"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品型号:"
          prop="goodsmodel"
        >
          <el-input
            v-model="ruBadgoods.goodsmodel"
            style="width: 150px;"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品颜色"
          prop="goodscolor"
        >
          <el-select
            v-model="ruBadgoods.goodscolor"
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
            v-model="ruBadgoods.goodsbrand"
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
            @click="rubadsearch({})"
          >搜索</el-button>
        </el-form-item>

      </el-form>
      <hr />
      <template>
        <el-table
          :data="rutable"
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
                @click="rudeletebutt(scope.row.id, scope.$index)"
              >删除</el-button>
            </template>
          </el-table-column>

        </el-table>
      </template>

      <el-form
        ref="yanzhengform"
        :model="yanzhengform"
        label-width="150px"
        :rules="rules"
        style="margin-top: 50px;"
        :inline="true"
      >
        <el-form-item
          label="返厂入库地址:"
          prop="address"
          style="margin-left: 2%;"
        >
          <el-select
            v-model="yanzhengform.address"
            placeholder="请选择返地点"
            clearable
          >
            <el-option
              label="天翼一库"
              value="天翼一库"
            ></el-option>
            <el-option
              label="天翼二库"
              value="天翼二库"
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

    <!-- 首页行查看 -->
    <el-dialog
      title="新增入库单"
      :visible.sync="xiangqingmotai"
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

    <!-- 首页修改模态框 -->

    <el-dialog
      title="修改入库单"
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
          style="margin-left: 300px;"
        >
          <el-input
            v-model="modifyBadgoods.goodsname"
            style="width: 150px;"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="商品型号:">
          <el-input
            v-model="modifyBadgoods.goodstype"
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
        <el-form-item label="商品品牌">
          <el-select
            v-model="modifyBadgoods.goodsbrand"
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
            @click="modifylog({})"
          >搜索</el-button>
        </el-form-item>

      </el-form>
      <template>
        <el-table
          :data="modifytable"
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
        style="margin-top: 50px; margin-left: 70%;"
      >
        <el-form-item
          label="返厂地址:"
          prop="address"
        >
          <el-select
            v-model="yanzhengform.address"
            placeholder="请选择返地点"
            clearable
          >
            <el-option
              label="天翼一库"
              value="天翼一库"
            ></el-option>
            <el-option
              label="天翼二库"
              value="天翼二库"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        @click="modifybutton('yanzhengform')"
        style="margin-top: 50px; margin-left: 90%;"
      >立即修改</el-button>

    </el-dialog>

    <!--审核模态框 -->
    <el-dialog
      title="审核入库单"
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
        @click="shenheformmotai=false "
        style="margin-top: 50px;margin-left: 90%;"
      >返回</el-button>

    </el-dialog>

  </div>
</template>

<script>
export default {
  data () {
    return {
      ruform: {
        deliveryorderno: "",
        state: "",
        beginTimeP: "",
        endTimeP: "",
        beginTimeA: "",
        endTimeA: "",
        outboundsign:"",
       
       creator: "",

      },

      rutableData: [{
        goodsid: '',
        goodsbrand: '',
        goodsname: '',
        goodsmodel: '',
        goodscolor: '',
        goodssupplier: '',
        goodstrack: '',
        goodsleixing: '',
        selection: [],

      }],

      page: {
        pageSize: "5",
        pageNum: "1",
      },

      ruformmotai: false,

      xiangqingmotai: false,   //首页行查看
      xiangqingtableData: [],

      modifyformmotai: false,   //首页行修改
      shenheformmotai: false,    //审核
      shenhetableData: [{}],   //审核表单 
      shenheneirong: [{}], //审核内容

      ruBadgoods: {     //新增查新表单
        goodsname: '',
        goodsmodel: '',
        goodscolor: '',
        goodsbrand: '',
        goodssupplier: '',
      },


      rutable: [{      //新增查询表格
        goodsid: '',
        goodsbrand: '',
        goodsname: '',
        goodsmodel: '',
        goodscolor: '',
        goodssupplier: '',
        goodstrack: '',
        goodsleixing: '',

      }],


      modifyBadgoods: {     //修改查新表单
        goodsname: '',
        goodsmodel: '',
        goodscolor: '',
        goodsbrand: '',
        goodschuchangid: '',

      },


      modifytable: [{      //修改表格
        goodsid: '',
        goodsbrand: '',
        goodsname: '',
        goodsmodel: '',
        goodscolor: '',
        goodssupplier: '',
        goodstrack: '',
        goodsleixing: '',

      }],
      deletednum: [],
      rules: {
        address: [{ required: true, message: '请选择入库地址', trigger: 'blur' }]
      },
      yanzhengform: {    //表单验证
        address: "",
      },

      number: '',
      badpage: {
        pageNum: '1',
        pageSize: '5',

      },
    };
  },
  methods: {
    newSubmit () {

    },
    Exportdocument () {
      location.href = "http://localhost:8080/RFactory/Export/";
    },

    rusearch () {       //首页功能
      this.$axios.get("/RFactory/rusearch?"
        + "pageNum=" + this.page.pageNum
        + "&pageSize=" + this.page.pageSize
       + "&deliveryorderno=" + this.ruform.deliveryorderno
      + "&state=" + this.ruform.state
        + "&beginTimeP=" + this.ruform.beginTimeP
        + "&endTimeP=" + this.ruform.endTimeP
        + "&beginTimeA=" + this.ruform.beginTimeA
        + "&endTimeA=" + this.ruform.endTimeA
       + "&outboundsign=" + this.ruform. outboundsign
        + "&creator=" + this.ruform.creator
      ).then(response => {
        this.rutableData = response.data.list;
        this.page = response.data;
      }).catch(function (error) {
        console.log(error);
      })
    },
    // 首页删除
    rudeletet () {
      this.$axios.post("/RFactory/rudeletet", this.$refs.rutableData.selection).then(response => {
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
    handleSizeChange (pageSize) {
      console.log(pageSize)
      this.page.pageSize = pageSize,

        this.rusearch({})
    },
    handlePageChange (pageNum) {
      this.page.pageNum = pageNum,
        this.rusearch({})
    },


    query (row) {						//	首页行查看

      this.number = row.deliveryorderno
      this.$axios.get("/RFactory/query?" + "number=" + this.number).then(response => {

        this.xiangqingtableData = response.data
        this.xiangqingmotai = true;
      
      }).catch(function (error) {
        console.log(error);
      })

    },

    modifylog (row) {        //首页修改初始化查询
      if (this.modifyBadgoods.goodschuchangid == '') {
        console.log(this.modifyBadgoods.goodschuchangid);
        this.modifyBadgoods.goodschuchangid = row.deliveryorderno
      }

      this.$axios.get("/RFactory/modify?"
        + "goodschuchangid=" + this.modifyBadgoods.goodschuchangid
        + "&goodsname=" + this.modifyBadgoods.goodsname
        + "&goodsmodel=" + this.modifyBadgoods.goodsmodel
        + "&goodscolor=" + this.modifyBadgoods.goodscolor
        + "&goodsbrand=" + this.modifyBadgoods.goodsbrand).then(response => {

          this.modifytable = response.data
          this.modifyformmotai = true;

        }).catch(function (error) {
          console.log(error);
        })
    },

    modifydeleted (id, index, row) {        //首页行修改保存 删除当前行
      this.deletednum.push(row.goodsid)
      console.log(this.deletednum)
      this.modifytable.splice(index, 1)

    },

    modifybutton (yanzhengform) {    //首页行修改保存


      this.$refs[yanzhengform].validate((valid) => {
        if (valid) {
          this.$axios.post("/RFactory/PPmodify", { 'address': this.yanzhengform.address, 'goods': this.modifytable, 'number': this.modifyBadgoods.goodschuchangid, 'deletednum': this.deletednum }).then(response => {
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

    shenhe (row) {    //首页行审核模态框
      this.number = row.deliveryorderno
      this.$axios.get("/RFactory/shenhe?" + "shenheid=" + this.number).then(response => {
        this.shenhetableData = response.data.shenhegoods

        this.shenheneirong = response.data.shenhejilu

        this.shenheformmotai = true;

      }).catch(function (error) {
        console.log(error);
      })

    },


    // 新增模态框------------------------------------------------------------		

    ruSubmit () {
      this.ruformmotai = true;
      this.rubadsearch({});

    },

    rubadsearch () {       //新增查询
      this.$axios.get("/RFactory/rubadgoods?"
        + "pageNum=" + this.badpage.pageNum
        + "&pageSize=" + this.badpage.pageSize
        + "&goodsname=" + this.ruBadgoods.goodsname
        + "&goodsmodel=" + this.ruBadgoods.goodsmodel
        + "&goodscolor=" + this.ruBadgoods.goodscolor
        + "&goodsbrand=" + this.ruBadgoods.goodsbrand
        + "&goodssupplier=" + this.ruBadgoods.goodssupplier
        + "&goodschuchangid=" + this.number
      ).then(response => {
        this.rutable = response.data.list;
        this.badpage = response.data;

       
       
       


      }).catch(function (error) {
        console.log(error);
      })
    },

    badSizeChange (pageSize) {

      this.badpage.pageSize = pageSize,
        this.rubadsearch({})
    },
    badPageChange (pageNum) {


      this.badpage.pageNum = pageNum,
        this.rubadsearch({})
    },

    rudeletebutt (id, index) {        //删除当前行

      this.rutable.splice(index, 1)
    },

    resetintableData () {                //重置表单
      this.$refs.yanzhengform.resetFields()
      this.$refs.ruBadgoods.resetFields()

    },

    //返回
    incancel () {
      this.ruformmotai = false;
    },

    submitForm (yanzhengform) {            //入库单保存
      if (this.rutable.length != 0) {
        this.$refs[yanzhengform].validate((valid) => {
          if (valid) {
            this.$axios.post("/RFactory/putinstorage", { 'address': this.yanzhengform.address, 'goods': this.rutable }).then(response => {
              if (response.data == 1) {
                this.modifyformmotai = false;

                this.$message({
                  message: '创建成功',
                  type: 'success',
                   
                });
                location.reload();
              } else {
                this.$message({
                  message: '出库失败',
                  type: 'warning'
                });
              }
            })
          }
        });
      } else {
        this.$message({
          message: '未选择商品出库失败',
          type: 'warning'
        });

      }
    },

  },
  components: {},
  computed: {},
  created () {
    this.rusearch(); //初始化

  },
}
</script>

<style scoped>
</style>