<template>
  <div
    id="main"
  >
    <el-card style="margin-top: 20px;width: 86%">
      <el-col
        :span="3"
        style='margin-left: 30px;'
      >
        <el-input
          placeholder="商品名称"
          v-model="formValue.goodsname"
          clearable
          prefix-icon="el-icon-search"
        >
        </el-input>
      </el-col>
      <div
        class="block"
        style="display: inline-block;margin-left: 5px;"
      >
        <el-date-picker
          v-model="formValue.effectivetime"
          type="date"
          placeholder="选择生效日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
      <div
        class="block"
        style="display: inline-block;margin-left: 5px"
      >
        <el-date-picker
          v-model="formValue.failuretime"
          type="date"
          placeholder="选择失效日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
      <el-button
        type="primary"
        icon="el-icon-search"
        style='margin-left: 20px;'
        @click="mainQuery"
      >
        搜索
      </el-button>
      <el-button
        type="success"
        icon="el-icon-sunrise"
        style='margin-left: 5px;'
        @click="mainQuery"
      >
        待审核
      </el-button>
      <el-button
        type="success"
        icon="el-icon-sunny"
        style='margin-left: 5px;'
        @click="queryAudited"
      >
        审核通过
      </el-button>
      <el-button
        type="success"
        icon="el-icon-heavy-rain"
        style='margin-left: 5px;'
        @click="queryUnAudited"
      >
        审核不通过
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
        prop="goodsname"
        label="商品名称"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="goodstock"
        label="库存"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="oldsale"
        label="原商场价"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="newsale"
        label="调整后商场价"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="effectivetime"
        label="生效时间"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="failuretime"
        label="失效时间"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="auditstatus"
        label="审核状态"
        width="120"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="520"
      >
        <template slot-scope="scope">
          <el-button
            type="warning"
            icon="el-icon-edit"
            style='margin-left: 5px;'
            @click="dialogFormVisible2 = true"
            v-if="scope.row.auditstatus == '未审核'"
          >
            审核
          </el-button>
          <el-button
            type="success"
            icon="el-icon-full-screen"
            style='margin-left: 5px;'
            @click="viewDialogForm = true"
          >
            查看
          </el-button>
          <el-button
            type="primary"
            icon="el-icon-copy-document"
            style='margin-left: 5px;'
            @click="handleAuthorizationMenu(scope.$index, scope.row),trackVisible= true"
          >
            审核跟踪
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

    <!-- 查看 -->
    <el-dialog
      title="价格申请单:"
      :visible.sync="viewDialogForm"
    >
      <table
        border="1px"
        cellpadding="20px"
        cellspacing="0"
        id="myTable"
      >
        <tr>
          <td class="onLeft">商品id：</td>
          <td class="onRight"><span v-text="updateForm.goodsid"></span></td>
        </tr>
        <tr>
          <td class="onLeft">商品名称：</td>
          <td class="onRight"><span v-text="updateForm.goodsname"></span></td>
        </tr>
        <tr>
          <td class="onLeft">商品库存：</td>
          <td class="onRight"><span v-text="updateForm.goodstock"></span></td>
        </tr>
        <tr>
          <td class="onLeft">商品原始价格：</td>
          <td class="onRight">
            <span>市场价：</span>
            <span v-text="updateForm.oldprice"></span>
            <span style="margin-left: 200px">商城价：</span>
            <span v-text="updateForm.oldsale"></span>
          </td>
        </tr>
        <tr>
          <td class="onLeft">商品调价幅度：</td>
          <td class="onRight">
            <span>市场价：</span>
            <span v-text="updateForm.newprice"></span>
            <span style="margin-left: 200px">商城价：</span>
            <span v-text="updateForm.newsale"></span>
          </td>
        </tr>
        <tr>
          <td class="onLeft">希望价格生效时间：</td>
          <td class="onRight"><span v-text="updateForm.effectivetime"></span></td>
        </tr>
        <tr>
          <td class="onLeft">希望价格失效时间：</td>
          <td class="onRight"><span v-text="updateForm.failuretime"></span></td>
        </tr>
        <tr>
          <td class="onLeft">活动情况及原因：</td>
          <td class="onRight"><span v-text="updateForm.reasons"></span></td>
        </tr>
        <tr>
          <td class="onLeft">备注：</td>
          <td class="onRight"><span v-text="updateForm.remark"></span></td>
        </tr>
      </table>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="viewDialogForm = false">返 回</el-button>
      </div>
    </el-dialog>

    <!-- 审核模态框 -->
    <el-dialog
      title="审核:"
      :visible.sync="dialogFormVisible2"
    >
      <el-form
        :model="updateForm"
        ref="insertFormRe"
      >
        <table
          border="1px"
          cellpadding="20px"
          cellspacing="0"
          id="myTable"
        >
          <tr>
            <td class="onLeft">商品id：</td>
            <td class="onRight">
              <el-col span="5">
                <el-input
                  v-model="updateForm.goodsid"
                  autocomplete="off"
                  disabled
                ></el-input>
              </el-col>
            </td>
          </tr>
          <tr>
            <td class="onLeft">商品名称：</td>
            <td class="onRight">
              <el-input
                v-model="updateForm.goodsname"
                autocomplete="off"
                disabled
              ></el-input>
            </td>
          </tr>
          <tr>
            <td class="onLeft">商品库存：</td>
            <td class="onRight">
              <el-input
                v-model="updateForm.goodstock"
                autocomplete="off"
                disabled
              ></el-input>
            </td>
          </tr>
          <tr>
            <td class="onLeft">商品原始价格：</td>
            <td class="onRight">
              <el-col span="5">
                <el-input
                  v-model="updateForm.oldprice"
                  autocomplete="off"
                  placeholder="市场价"
                  disabled
                ></el-input>
              </el-col>
              <el-col
                span="5"
                style="margin-left: 60px;"
              >
                <el-input
                  v-model="updateForm.oldsale"
                  placeholder="商场价"
                  disabled
                ></el-input>
              </el-col>
            </td>
          </tr>
          <tr>
            <td class="onLeft">商品调价幅度：</td>
            <td class="onRight">
              <el-col span="5">
                <el-input
                  v-model="updateForm.newprice"
                  autocomplete="off"
                  placeholder="市场价"
                  disabled
                ></el-input>
              </el-col>
              <el-col
                span="5"
                style="margin-left: 60px;"
              >
                <el-input
                  v-model="updateForm.newsale"
                  placeholder="商场价"
                  disabled
                ></el-input>
              </el-col>
            </td>
          </tr>
          <tr>
            <td class="onLeft">希望价格生效时间：</td>
            <td class="onRight">
              <div
                class="block"
                style="display: inline-block;margin-left: 5px;"
              >
                <el-date-picker
                  v-model="updateForm.effectivetime"
                  type="date"
                  placeholder="选择生效日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  disabled
                >
                </el-date-picker>
              </div>
            </td>
          </tr>
          <tr>
            <td class="onLeft">希望价格失效时间：</td>
            <td class="onRight">
              <div
                class="block"
                style="display: inline-block;margin-left: 5px;"
              >
                <el-date-picker
                  v-model="updateForm.failuretime"
                  type="date"
                  placeholder="选择失效日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  disabled
                >
                </el-date-picker>
              </div>
            </td>
          </tr>
          <tr>
            <td class="onLeft">活动情况及原因：</td>
            <td class="onRight">
              <el-input
                v-model="updateForm.reasons"
                autocomplete="off"
                disabled
              ></el-input>
            </td>
          </tr>
          <tr>
            <td class="onLeft">备注：</td>
            <td class="onRight">
              <el-input
                v-model="updateForm.remark"
                autocomplete="off"
                disabled
              ></el-input>
            </td>
          </tr>
          <tr>
            <td class="onLeft">审核意见：</td>
            <td class="onRight">
              <el-input
                v-model="updateForm.auditopinion"
                autocomplete="off"
              ></el-input>
            </td>
          </tr>
        </table>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button
          type="warning"
          @click="dialogFormVisible2 = false, unAdopt()"
        >不 通 过</el-button>
        <el-button
          type="primary"
          @click="dialogFormVisible2 = false, adopt()"
        >通 过</el-button>
      </div>
    </el-dialog>

    <!-- 审核追踪 -->
    <el-dialog
      title="审核记录:"
      :visible.sync="trackVisible"
    >
      <el-table
        :data="track"
        tooltip-effect="dark"
        style="width: 70%"
        @selection-change="handleSelectionChange"
        highlight-current-row
        @current-change="handleCurrentChange"
        :header-cell-style="headClass"
        :cell-style="rowClass"
      >
        <el-table-column
          prop="approner"
          label="审批人"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="aduittime"
          label="审批时间"
          width="250"
        >
        </el-table-column>
        <el-table-column
          prop="auditstatus"
          label="审批状态"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="auditopinion"
          label="审批意见"
          width="150"
        >
        </el-table-column>
      </el-table>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="trackVisible = false">返 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      calc: '',
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
      // 查看
      viewDialogForm: false,
      // 模态框
      formLabelWidth: '120px',
      dialogFormVisible2: false,
      trackVisible: false,
      updateForm: {},
      track: []
    };
  },
  methods: {
    mainQuery () {
      this.formValue.auditstatus = 0;
      this.query();
    },
    queryAudited () {
      this.formValue.auditstatus = 1;
      this.query();
    },
    queryUnAudited () {
      this.formValue.auditstatus = 2;
      this.query();
    },
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
    adopt () {
      this.updateForm.auditstatus = 1;
      this.update();
    },
    unAdopt () {
      this.updateForm.auditstatus = 2;
      this.update();
    },
    update () {
      this.$axios.post("/audit/createRecord", this.updateForm)
        .then(res => {
          if (res.code == 20000) {
            this.$message({
              message: '审核已处理',
              type: 'success'
            });
          }
          this.query();
        });
    },
    query (param) {
      let data = param;
      if (this.formValue != undefined) {
        Object.assign(this.formValue, param);
        data = this.formValue;
        // console.log(data);
      }
      this.$axios.get("/audit/levelForm", {
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
    },
    calcprice () {
      this.insertForm.newsale = this.insertForm.oldsale * this.calc;
    },
    handleAuthorizationMenu (index, row) {
      this.getAllTrack(row.goodsid);
    },
    getAllTrack (param) {
      this.$axios.get("/audit/trace?id=" + param)
        .then(res => {
          this.track = res.data;
          console.log(this.track);
        });
    }
  },
  created () {
    this.mainQuery();
  },
}
</script>

<style scoped>

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