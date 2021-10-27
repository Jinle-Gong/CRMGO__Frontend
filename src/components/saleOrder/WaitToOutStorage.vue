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
                @click="handleOut(scope.row)"
              >
                出库
              </el-button>
            </template>
          </el-table-column>
        </el-table>

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
      orderForm: {
        orderId: '',
        orderType: '',
        orderActive: '',
        orderService: '',
        orderPaytype: '',
      },
      options: [],
    }
  },
  methods: {
    tableRowClassName ({ rowIndex }) {
      if (rowIndex % 2 == 1) {
        return 'success-row';
      }
      return '';
    },
    resetForm (formName) {
      this.orderForm.orderId = '';
      this.$refs[formName].resetFields();
    },
    query (param) {
      this.$axios.get('/query/waitout', {
        params: param
      }).then(response => {
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
      var param = {
        "orderId": this.orderForm.orderId,
        "orderType": this.orderForm.orderType,
        "orderActive": this.orderForm.orderActive,
        "orderService": this.orderForm.orderService,
        "orderPaytype": this.orderForm.orderPaytype,
        'page': "1",
        'pageSize': this.pageSize
      };
      this.query(param);
    },
    handleOut (row) {
      location.href = "http://localhost:8080/dowloadWord?orderId=" + row.orderId;
      this.query();
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