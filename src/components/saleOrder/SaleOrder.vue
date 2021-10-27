<template>
  <div id="app">
    <template>
      <el-card class="box-card">

        <el-form
          :inline="true"
          :model="orderForm"
          ref="orderForm"
          class="demo-ruleForm"
        >
          <el-form-item label="订单编号">
            <el-input
              v-model="orderForm.orderId"
              placeholder="订单编号"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="订单类型"
            prop="orderType"
          >
            <el-select
              v-model="orderForm.orderType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options[0]"
                :key="item.dic_key"
                :label="item.dic_value"
                :value="item.dic_key"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="订单动作"
            prop="orderActive"
          >
            <el-select
              v-model="orderForm.orderActive"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options[1]"
                :key="item.dic_key"
                :label="item.dic_value"
                :value="item.dic_key"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="订单业务"
            prop="orderService"
          >
            <el-select
              v-model="orderForm.orderService"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options[2]"
                :key="item.dic_key"
                :label="item.dic_value"
                :value="item.dic_key"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="支付方式"
            prop="orderPaytype"
          >
            <el-select
              v-model="orderForm.orderPaytype"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options[3]"
                :key="item.dic_key"
                :label="item.dic_value"
                :value="item.dic_key"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="订单状态"
            prop="orderStatus"
          >
            <el-select
              v-model="orderForm.orderStatus"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options[4]"
                :key="item.dic_key"
                :label="item.dic_value"
                :value="item.dic_key"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="配送方式"
            prop="orderDispatcher"
          >
            <el-select
              v-model="orderForm.orderDispatcher"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options[5]"
                :key="item.dic_key"
                :label="item.dic_value"
                :value="item.dic_key"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <span>订单时间</span>
          <el-date-picker
            v-model="targetTime"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd 00:00:00"
          >
          </el-date-picker>
          <el-form-item>
            <el-button
              type="primary"
              @click="queryByType"
            >查询</el-button>
            <el-button
              type="success"
              @click="resetForm('orderForm')"
            >重置</el-button>
          </el-form-item>
        </el-form>

        <el-upload
          class="upload-demo"
          action="http://localhost:8080/saleManage/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-success="uploadFileSuccess"
          multiple
          accept=".xlsx"
          :limit="1"
          :on-exceed="handleExceed"
          :on-error="errorUpload"
          :file-list="fileList"
        >
          <el-button type="primary">导入数据</el-button>
        </el-upload>

        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            prop="orderId"
            label="订单编号"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="orderType"
            label="订单类型"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="orderActive"
            label="订单动作"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="orderService"
            label="业务类型"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="orderPaytype"
            label="支付方式"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="orderDispatcher"
            label="配送方式"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="orderStatus"
            label="订单状态"
            width="180"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="180"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="dialogFormVisible = true,handleCheck(scope.row)"
              >
                查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog title="订单详情" :visible.sync="dialogFormVisible">
                <table width="100%" border="1px" cellpadding="20px" cellspacing="0" id="myTable">
                    <tr>
                    <td colspan="4"><h4 style="text-align: center">订单基本资料</h4></td>
                    </tr>
                    <tr>
                        <td class="onLeft">订单编号:</td>
                        <td class="onRight"><span v-text="orders.orderId"></span></td>
                        <td class="onLeft">下单日期:</td>
                        <td class="onRight"><span v-text="orders.orderTime"></span></td>
                    </tr>
                    <tr>
                        <td class="onLeft">订单类型:</td>
                        <td class="onRight"><span v-text="orders.orderType"></span></td>
                        <td class="onLeft">订单动作:</td>
                        <td class="onRight">
                            <span v-text="orders.orderActive"></span>
                        </td>
                    </tr>
                    <tr>
                        <td class="onLeft">业务类型:</td>
                        <td class="onRight">
                            <span v-text="orders.orderService"></span>
                        </td>
                        <td class="onLeft">订单状态:</td>
                        <td class="onRight"><span v-text="orders.orderStatus"></span></td>
                    </tr>
                    <td colspan="4"><h4 style="text-align: center">收货人资料</h4></td>
                    <tr>
                        <td class="onLeft">收货人姓名:</td>
                        <td class="onRight"><span v-text="consignee.consigneeName"></span></td>
                        <td class="onLeft">会员账号:</td>
                        <td class="onRight"><span v-text="consignee.consigneeId"></span></td>
                    </tr>

                    <tr>
                        <td class="onLeft">联系电话:</td>
                        <td class="onRight"><span v-text="consignee.consigneeLinephone"></span></td>
                        <td class="onLeft">联系手机:</td>
                        <td class="onRight"><span v-text="consignee.consigneeMobilephone"></span></td>
                    </tr>
                    <tr>
                        <td class="onLeft">邮政编码:</td>
                        <td class="onRight"><span v-text="consignee.consigneePostalcode"></span></td>
                        <td class="onLeft">收货地址:</td>
                        <td class="onRight"><span v-text="consignee.consigneeAddress"></span></td>
                    </tr>

                    <tr>
                        <td class="onLeft">配送地区:</td>
                        <td class="onRight"><span v-text="consignee.consigneeArea"></span></td>
                        <td class="onLeft">配送方式:</td>
                        <td class="onRight"><span v-text="orders.orderDispatcher"></span></td>
                    </tr>

                    <tr>
                        <td class="onLeft">配送费用:</td>
                        <td class="onRight"><span v-text="delivery.deliveryCost"></span></td>
                        <td class="onLeft">电子邮箱:</td>
                        <td class="onRight"><span v-text="consignee.consigneeMail"></span></td>
                    </tr>
                    <tr>
                        <td class="onLeft">支付人:</td>
                        <td class="onRight"><span v-text="orders.orderPayer"></span></td>
                    </tr>
                </table>
                <h4>订单商品信息</h4>
                <el-table
                        :data="goods"
                        height="250"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="goodsId"
                            label="商品编号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="goodsName"
                            label="商品名称"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="goodsPrice"
                            label="单价"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="goodsNum"
                            label="数量"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="totalPrice"
                            label="总金额"
                            width="180">
                    </el-table-column>
                </el-table>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">返回</el-button>
                </div>
            </el-dialog>

        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[2, 3, 4, 5]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>

      </el-card>
    </template>
  </div>

</template>

<script>
export default {
  data () {
    return {
      currentPage: {},
      pageSize: {},
      total: {},
      tableData: [],
      goods: [],
      orderForm: {
        orderId: '',
        orderType: '',
        orderActive: '',
        orderService: '',
        orderPaytype: '',
        orderStatus: '',
        orderDispatcher: ''
      },
      options: [],
      targetTime: [],
      fileList: [],
      delivery: {},
      consignee: {},
      orders: {},
      dialogFormVisible: false
    }
  },
  methods: {
    tableRowClassName ({rowIndex }) {
      if (rowIndex % 2 == 1) {
        return 'success-row';
      }
      return '';
    },
    resetForm (formName) {
      this.orderForm.orderId = '';
      this.targetTime = [];
      this.$refs[formName].resetFields();
    },
    query (param) {
      this.$axios.get('/saleManage/selectAll', {
        params: param
      })
        .then(response => {
          if (response.code === 20000) {
            this.total = response.data.orders.total;
            this.pageSize = response.data.orders.pageSize;
            this.currentPage = response.data.orders.pageNum;
            this.options = response.data.alltype;
            this.tableData = response.data.orders.list;
          } else {
            this.$message({
              type: 'info',
              message: '查询失败'
            });
          }
        }).catch((error) => {
          console.log(error)
          this.$message({
            type: 'warning',
            message: '服务器连接失败,请联系管理员'
          });
        });
    },
    queryByType () {
      var beginTime = this.targetTime[0]
      var endTime = this.targetTime[1]
      var param = {
        "orderId": this.orderForm.orderId,
        "orderType": this.orderForm.orderType,
        "orderActive": this.orderForm.orderActive,
        "orderService": this.orderForm.orderService,
        "orderPaytype": this.orderForm.orderPaytype,
        "orderStatus": this.orderForm.orderStatus,
        "orderDispatcher": this.orderForm.orderDispatcher,
        "beginTime": beginTime,
        "endTime": endTime,
        'page': "1",
        'pageSize': this.pageSize
      };
      this.query(param);
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
      console.log(file);
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove (file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    uploadFileSuccess (res) {
      this.fileList = [];
      console.log(res)
      if (res.code == 20000) {
        this.$message({
          message: '导入成功' + res.data.successCount + '条数据,失败' + res.data.failCount + '条数据',
          type: 'success'
        });
        this.query();
      } else {
        this.$message({
          type: 'warning',
          message: '导入失败，请检查数据条数是否匹配'
        });
      }
    },
    errorUpload () {
      this.$message.error('导入失败');
    },
    handleCheck (row) {
      this.$axios.get('/queryById?orderId=' + row.orderId)
        .then(response => {
          console.log(response)
          if (response.code === 20000) {
            this.consignee = response.data.consignee;
            this.delivery = response.data.delivery;
            this.orders = response.data.saleOrder;
            this.goods = response.data.orderDetails;
          } else {
            this.$message({
              type: 'info',
              message: '查询失败'
            });
          }
        }).catch((error) => {
          console.log(error)
          this.$message({
            type: 'warning',
            message: '服务器连接失败,请联系管理员'
          });
        });
    },
    handleSizeChange (val) {
      this.query({
        'page': "1",
        'pageSize': val
      })
    },
    handleCurrentChange (val) {
      this.query({
        'page': val,
        'pageSize': this.pageSize
      })

    },
  },
  created () {
    this.query();
  }
}
</script>

<style scoped>
.el-table .success-row {
  background: #f0f9eb;
}

.box-card {
  width: 100%;
}

.el-row {
  margin-bottom: 20px;
}

.el-col {
  font-size: 22px;
  border-radius: 4px;
}

.bg-purple-green {
  background: #b1eec5;
}

.bg-purple {
  background: #e5e9f2;
}
</style>