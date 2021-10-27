<template>
  <div id="app">
    <el-container>
      <el-header></el-header>
      <el-container>
        <el-aside width="200px"></el-aside>
        <el-main>
          <el-form
            ref="applicationform"
            :model="applicationform"
            label-width="100px"
            :inline="true"
          >
            <el-form-item
              label="订单编号:"
              prop="orderId"
            >
              <el-input
                v-model="applicationform.orderId"
                style="width: 150px;"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="记录人:"
              prop="notetakerName"
            >
              <el-input
                v-model="applicationform.notetakerName"
                style="width: 150px;"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="审批人:"
              prop="approver"
            >
              <el-input
                v-model="applicationform.approver"
                style="width: 150px;"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="单据状态"
              prop="billstate"
            >
              <el-select
                v-model="applicationform.billstate"
                placeholder="全部"
                style="width: 150px;"
              >
                <el-option
                  label=""
                  value=""
                ></el-option>
                <el-option
                  label="未审核"
                  value="未审核"
                ></el-option>
                <el-option
                  label="已通过"
                  value="已通过"
                ></el-option>
                <el-option
                  label="未通过"
                  value="未通过"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                label="1"
                border
                size="medium"
                @click="addApplaction = true"
              >
                新增申诉记录
              </el-button>
              <el-button
                type="primary"
                @click="exportApplaction"
              >导出</el-button>
            </el-form-item>
            <br>
            <el-form-item
              label="记录时间"
              prop="recoedUpdatetime"
            >
              <div class="block">
                <el-date-picker
                  v-model="applicationform.recoedUpdatetime"
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

            <el-form-item
              label="审批时间"
              prop="approvalTime"
            >
              <div class="block">
                <el-date-picker
                  v-model="applicationform.approvalTime"
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
            <el-form-item>
              <el-button
                type="primary"
                @click="goSearch"
              >搜索</el-button>
              <el-button @click="resetForm('applicationform')">清除条件</el-button>
            </el-form-item>
          </el-form>
          <hr />

          <el-table
            :data="rratableData"
            :header-cell-style="headClass"
            :cell-style="rowClass"
            border
            style="width: 100% "
          >
            <el-table-column
              prop="rrappId"
              label="序号"
              width="80"
            >
            </el-table-column>
            <el-table-column
              prop="orderId"
              label="订单编号"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="reqcodeName"
              label="申述记录名称"
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="notetakerName"
              label="记录人"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="recoedUpdatetime"
              label="记录时间"
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="approver"
              label="审批人"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="approvalTime"
              label="审核时间"
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="billstate"
              label="单据状态"
              width="120"
            >
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  @click="viewDetails=true;selectApplactionDetails(scope.row)"
                  type="success"
                >查看</el-button>
                <el-button
                  @click="updateApplaction=true;updateApplactionDetails(scope.row)"
                  type="warning"
                >修改</el-button>
                <el-button
                  type="danger"
                  @click="deleteApplactionDetails(scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.pageNum"
            :page-sizes="[2,5,10]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
          >
          </el-pagination>

          <!-- 添加申诉记录模态框 -->
          <div>
            <el-dialog
              title="添加申诉记录"
              :visible.sync="addApplaction"
            >
              <el-form
                label-width="100px"
                :inline="true"
              >
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-form-item label="申述记录名称:">
                      <el-input
                        v-model="applactionDetalis.representationname"
                        style="width: 150px;"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="申述来源:">
                      <el-input
                        v-model="applactionDetalis.representationsource"
                        style="width: 200px;"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="17">
                    <el-form-item label="申述记录描述:">
                      <el-input
                        type="textarea"
                        :rows="3"
                        style="width: 400px;"
                        v-model="applactionDetalis.representationdescribe"
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <div>
                <el-row style="text-align: left;">
                  申述详细信息：
                </el-row>
                <el-row>
                  <el-col
                    :span="3"
                    :offset="1"
                  >订单基本资料：</el-col>
                  <el-col
                    :span="3"
                    :offset="14"
                  >
                    <el-button
                      type="primary"
                      size="small"
                      icon="el-icon-edit"
                      @click="selectOrder = true;selectOrderMethod()"
                    >选择订单</el-button>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col
                    :span="16"
                    :offset="3"
                  >
                    <div style="text-align: center;">
                      <table
                        border="1"
                        bordercolor="aqua"
                        cellspacing="0"
                        style="width: 600px; height:100px;"
                      >
                        <tr>
                          <td>订单编号</td>
                          <td>
                            <el-input
                              v-model="saleOrder.orderId"
                              placeholder="订单编号"
                              :disabled="true"
                            >
                              </el-input>
                          </td>
                          <td>下单日期</td>
                          <td>
                            <el-input
                              v-model="saleOrder.orderTime"
                              placeholder="订单日期"
                              :disabled="true"
                            >
                              </el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>订单类型</td>
                          <td>
                            <el-input
                              v-model="saleOrder.orderType"
                              placeholder="订单类型"
                              :disabled="true"
                            >
                              </el-input>
                          </td>
                          <td>订单动作</td>
                          <td>
                            <el-input
                              v-model="saleOrder.orderActive"
                              placeholder="订单动作"
                              :disabled="true"
                            >
                              </el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>业务类型</td>
                          <td>
                            <el-input
                              v-model="saleOrder.orderService"
                              placeholder="业务类型"
                              :disabled="true"
                            >
                              </el-input>
                          </td>
                          <td>订单状态</td>
                          <td>
                            <el-input
                              v-model="saleOrder.orderStatus"
                              placeholder="业务状态"
                              :disabled="true"
                            >
                              </el-input>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col
                    :span="3"
                    :offset="1"
                  >收货人资料：</el-col>
                </el-row>

                <el-row>
                  <el-col
                    :span="16"
                    :offset="3"
                  >
                    <div style="text-align: center;">
                      <table
                        border="1"
                        bordercolor="aqua"
                        cellspacing="0"
                        style="width: 600px; height:100px;"
                      >
                        <tr>
                          <td>收货人姓名</td>
                          <td>
                            <el-input
                              v-model="consignee.consigneeName"
                              placeholder="收货人姓名"
                              :disabled="true"
                            >
                              </el-input>
                          </td>
                          <td>会员账号</td>
                          <td>
                            <el-input
                              v-model="consignee.consigneeId"
                              placeholder="会员账号"
                              :disabled="true"
                            >
                              </el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>联系电话</td>
                          <td>
                            <el-input
                              v-model="consignee.consigneeLinephone"
                              placeholder="联系电话"
                              :disabled="true"
                            >
                              </el-input>
                          </td>
                          <td>联系手机</td>
                          <td>
                            <el-input
                              v-model="consignee.consigneeMobilephone"
                              placeholder="联系手机"
                              :disabled="true"
                            >
                              </el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>邮政编码</td>
                          <td>
                            <el-input
                              v-model="consignee.consigneePostalcode"
                              placeholder="邮政编码"
                              :disabled="true"
                            >
                              </el-input>
                          </td>
                          <td>收货地址</td>
                          <td>
                            <el-input
                              v-model="consignee.consigneeAddress"
                              placeholder="收货地址"
                              :disabled="true"
                            >
                              </el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>配送地区</td>
                          <td>
                            <el-input
                              v-model="consignee.consigneeArea"
                              placeholder="配送地区"
                              :disabled="true"
                            ></el-input>
                          </td>
                          <td>配送方式</td>
                          <td>
                            <el-input
                              v-model="saleOrder.orderDispatcher"
                              placeholder="配送方式"
                              :disabled="true"
                            ></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>配送费用</td>
                          <td>
                            <el-input
                              v-model="delivery.deliveryCost"
                              placeholder="配送费用"
                              :disabled="true"
                            ></el-input>
                          </td>
                          <td>支付方式</td>
                          <td>
                            <el-input
                              v-model="saleOrder.orderPaytype"
                              placeholder="支付方式"
                              :disabled="true"
                            ></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>自取时间：</td>
                          <td>
                            <el-input
                              v-model="delivery.deliveryTime"
                              placeholder="自取时间"
                              :disabled="true"
                            ></el-input>
                          </td>
                          <td>电子邮箱</td>
                          <td>
                            <el-input
                              v-model="consignee.consigneeMail"
                              placeholder="电子邮箱"
                              :disabled="true"
                            ></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>汇款人</td>
                          <td>
                            <el-input
                              v-model="saleOrder.orderPayer"
                              placeholder="汇款人"
                              :disabled="true"
                            ></el-input>
                          </td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>备注：</td>
                          <td colspan="3">
                            <el-input
                              type="textarea"
                              :rows="3"
                              :disabled="true"
                              placeholder="备注信息内容"
                              v-model="saleOrder.textarea"
                            >
                            </el-input>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col
                    :span="5"
                    :offset="1"
                  >订单中商品信息：</el-col>
                </el-row>

                <el-row>
                  <el-col
                    :span="16"
                    :offset="3"
                  >
                    <template>
                      <el-table
                        :data="goodsOrderData"
                        :header-cell-style="headClass"
                        :cell-style="rowClass"
                        border
                        style="width: 100%"
                      >
                        <el-table-column
                          prop="serializeNum"
                          label="商品串码"
                          width="130"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="goodsName"
                          label="商品名称"
                          width="130"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="goodsNum"
                          label="商品数量"
                          width="130"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="goodsPrice"
                          label="商品价格"
                        >
                        </el-table-column>
                      </el-table>
                    </template>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col
                    :span="4"
                    :offset="1"
                  >退货/维修信息：</el-col>
                </el-row>

                <el-row>
                  <el-col
                    :span="4"
                    :offset="2"
                  >
                    退货/维修类型：
                  </el-col>
                  <el-col :span="8">
                    <div style="margin-top: 0px;">
                      <el-radio
                        v-model="applactionDetalis.goodState"
                        label="1"
                        border
                        size="medium"
                        @change="showRepair = false"
                      >退货</el-radio>
                      <el-radio
                        v-model="applactionDetalis.goodState"
                        label="2"
                        border
                        size="medium"
                        @change="showRepair = true"
                      >维修</el-radio>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col
                    :span="4"
                    :offset="2"
                  >订单退修商品信息：</el-col>
                  <el-col
                    :span="3"
                    :offset="12"
                  >
                    <el-button
                      type="primary"
                      size="small"
                      icon="el-icon-edit"
                      @click="selectGoodByOrder = true"
                    >选择商品</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col
                    :span="16"
                    :offset="3"
                  >
                    <template>
                      <el-table
                        :data="retrunRepairgood"
                        :header-cell-style="headClass"
                        :cell-style="rowClass"
                        border
                        style="width: 100%"
                      >
                        <el-table-column
                          prop="serializeNum"
                          label="商品串码"
                          width="130"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="goodsName"
                          label="商品名称"
                          width="130"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="goodsNum"
                          label="商品数量"
                          width="130"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="goodsPrice"
                          label="商品价格"
                        >
                        </el-table-column>
                      </el-table>
                    </template>
                  </el-col>
                </el-row>

                <div v-if="showRepair">
                  <el-row>
                    <el-col
                      :span="3"
                      :offset="2"
                    >维修点信息：</el-col>
                    <el-col
                      :span="3"
                      :offset="13"
                    >
                      <el-button
                        type="primary"
                        size="small"
                        icon="el-icon-edit"
                        @click="slectRepairplace = true;slectRepairPlaceMethod()"
                      >选择维修点</el-button>
                    </el-col>
                  </el-row>
                  <el-row>
                    <div>
                      <el-col
                        :span="16"
                        :offset="5"
                      >
                        <div style="text-align: center;">
                          <table
                            border="1"
                            bordercolor="aqua"
                            cellspacing="0"
                            style="width: 500px; height:100px;"
                          >
                            <tr>
                              <td>检修点名称</td>
                              <td>
                                <el-input
                                  v-model="repairPlace.rpAddress"
                                  placeholder="检修点名称"
                                  :disabled="true"
                                ></el-input>
                              </td>
                            </tr>
                            <tr>
                              <td>检修点电话</td>
                              <td>
                                <el-input
                                  v-model="repairPlace.rpPhone"
                                  placeholder="检修点电话"
                                  :disabled="true"
                                ></el-input>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </el-col>
                    </div>
                  </el-row>

                </div>
                <div>
                  <el-row>
                    <el-button
                      type="primary"
                      icon="el-icon-message"
                      round
                      @click="addApplaction = false"
                    >暂存</el-button>
                    <el-button
                      type="success"
                      icon="el-icon-check"
                      round
                      @click="addApplaction = false;insertApplaction();"
                    >提交</el-button>
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      round
                      @click="addApplaction = false;wipeData()"
                    >返回</el-button>
                  </el-row>
                </div>
              </div>

            </el-dialog>
          </div>
          <!-- 选择订单模态框 -->
          <div>
            <el-dialog
              title="选择订单"
              :visible.sync="selectOrder"
            >

              <el-table
                :data="orderData"
                :header-cell-style="headClass"
                :cell-style="rowClass"
                border
                style="width: 100%"
              >
                <el-table-column
                  prop="orderId"
                  label="订单编号"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="orderType"
                  label="订单类型"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="orderActive"
                  label="订单动作"
                  width="80"
                >
                </el-table-column>
                <el-table-column
                  prop="orderService"
                  label="业务类型"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="orderPaytype"
                  label="支付方式"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="orderDispatcher"
                  label="配送方式"
                  width="80"
                >
                </el-table-column>
                <el-table-column
                  prop="orderStatus"
                  label="订单状态"
                  width="100"
                >
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="selectOrder = false;selectRetrunRepairOrderMethod(scope.row)"
                      type="success"
                    >选择</el-button>
                  </template>
                </el-table-column>
              </el-table>

              <div
                slot="footer"
                class="dialog-footer"
              >
                <el-button @click="selectOrder = false">取 消</el-button>
                <el-button
                  type="primary"
                  @click="selectOrder = false"
                >确 定</el-button>
              </div>
            </el-dialog>
          </div>
          <!-- 选择商品模态框 selectGoodByOrder-->
          <div>
            <el-dialog
              title="商品"
              :visible.sync="selectGoodByOrder"
            >
              <el-table
                :data="goodsOrderData"
                :header-cell-style="headClass"
                :cell-style="rowClass"
                border
                style="width: 100%"
              >
                <el-table-column
                  prop="serializeNum"
                  label="商品串码"
                  width="130"
                >
                </el-table-column>
                <el-table-column
                  prop="goodsName"
                  label="商品名称"
                  width="130"
                >
                </el-table-column>
                <el-table-column
                  prop="goodsNum"
                  label="商品数量"
                  width="130"
                >
                </el-table-column>
                <el-table-column
                  prop="goodsPrice"
                  label="商品价格"
                >
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="selectGoodByOrder = false;selectRepairGoodMethod(scope.row);"
                      type="success"
                    >选择</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div
                slot="footer"
                class="dialog-footer"
              >
                <el-button @click="selectGoodByOrder = false">取 消</el-button>
                <el-button
                  type="primary"
                  @click="selectGoodByOrder = false"
                >确 定</el-button>
              </div>
            </el-dialog>
          </div>
          <!-- 选择维修点模态框 -->
          <div>
            <el-dialog
              title="选择维修点"
              :visible.sync="slectRepairplace"
            >
              <el-table
                :data="repairPlaceData"
                :header-cell-style="headClass"
                :cell-style="rowClass"
                border
                style="width: 100% "
              >
                <el-table-column
                  prop="rpId"
                  label="序号"
                  width="80"
                >
                </el-table-column>
                <el-table-column
                  prop="rpAddress"
                  label="维修点名称"
                  width="350"
                >
                </el-table-column>
                <el-table-column
                  prop="rpPhone"
                  label="维修点电话"
                  width="200"
                >
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="slectRepairplace = false;repairPlace = scope.row;"
                      type="success"
                    >选择</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div
                slot="footer"
                class="dialog-footer"
              >
                <el-button @click="slectRepairplace = false">取 消</el-button>
                <el-button
                  type="primary"
                  @click="slectRepairplace = false"
                >确 定</el-button>
              </div>
            </el-dialog>
          </div>

          <!--查看详情模态框 -->
          <div>
            <el-dialog
              title="详细信息"
              :visible.sync="viewDetails"
            >
              <el-form
                label-width="100px"
                :inline="true"
              >
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-form-item label="申述记录名称:">
                      <el-input
                        v-model="applactionDetalis.representationname"
                        style="width: 150px;"
                        :disabled="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="申述来源:">
                      <el-input
                        v-model="applactionDetalis.representationsource"
                        style="width: 200px;"
                        :disabled="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="17">
                    <el-form-item label="申述记录描述:">
                      <el-input
                        type="applactionDetalis.representationdescribe"
                        :rows="3"
                        style="width: 400px;"
                        :disabled="true"
                        v-model="applactionDetalis.representationdescribe"
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <div>
                <el-row style="text-align: left;">
                  申述详细信息：
                </el-row>
                <el-row>
                  <el-col
                    :span="3"
                    :offset="1"
                  >订单基本资料：</el-col>
                </el-row>

                <el-row>
                  <el-col
                    :span="16"
                    :offset="3"
                  >
                    <div style="text-align: center;">
                      <table
                        border="1"
                        bordercolor="aqua"
                        cellspacing="0"
                        style="width: 600px; height:100px;"
                      >
                        <tr>
                          <td>订单编号</td>
                          <td>
                            <el-input
                              v-model="saleOrder.orderId"
                              placeholder="订单编号"
                              :disabled="true"
                            ></el-input>
                          </td>
                          <td>下单日期</td>
                          <td>
                            <el-input
                              v-model="saleOrder.orderTime"
                              placeholder="订单日期"
                              :disabled="true"
                            ></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>订单类型</td>
                          <td>
                            <el-input
                              v-model="saleOrder.orderType"
                              placeholder="订单类型"
                              :disabled="true"
                            ></el-input>
                          </td>
                          <td>订单动作</td>
                          <td>
                            <el-input
                              v-model="saleOrder.orderActive"
                              placeholder="订单动作"
                              :disabled="true"
                            ></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>业务类型</td>
                          <td>
                            <el-input
                              v-model="saleOrder.orderService"
                              placeholder="业务类型"
                              :disabled="true"
                            ></el-input>
                          </td>
                          <td>订单状态</td>
                          <td>
                            <el-input
                              v-model="saleOrder.orderStatus"
                              placeholder="业务状态"
                              :disabled="true"
                            ></el-input>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col
                    :span="3"
                    :offset="1"
                  >收货人资料：</el-col>
                </el-row>

                <el-row>
                  <el-col
                    :span="16"
                    :offset="3"
                  >
                    <div style="text-align: center;">
                      <table
                        border="1"
                        bordercolor="aqua"
                        cellspacing="0"
                        style="width: 600px; height:100px;"
                      >
                        <tr>
                          <td>收货人姓名</td>
                          <td>
                            <el-input
                              v-model="consignee.consigneeName"
                              placeholder="收货人姓名"
                              :disabled="true"
                            ></el-input>
                          </td>
                          <td>会员账号</td>
                          <td>
                            <el-input
                              v-model="consignee.consigneeId"
                              placeholder="会员账号"
                              :disabled="true"
                            ></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>联系电话</td>
                          <td>
                            <el-input
                              v-model="consignee.consigneeLinephone"
                              placeholder="联系电话"
                              :disabled="true"
                            ></el-input>
                          </td>
                          <td>联系手机</td>
                          <td>
                            <el-input
                              v-model="consignee.consigneeMobilephone"
                              placeholder="联系手机"
                              :disabled="true"
                            ></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>邮政编码</td>
                          <td>
                            <el-input
                              v-model="consignee.consigneePostalcode"
                              placeholder="邮政编码"
                              :disabled="true"
                            ></el-input>
                          </td>
                          <td>收货地址</td>
                          <td>
                            <el-input
                              v-model="consignee.consigneeAddress"
                              placeholder="收货地址"
                              :disabled="true"
                            ></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>配送地区</td>
                          <td>
                            <el-input
                              v-model="consignee.consigneeArea"
                              placeholder="配送地区"
                              :disabled="true"
                            ></el-input>
                          </td>
                          <td>配送方式</td>
                          <td>
                            <el-input
                              v-model="saleOrder.orderDispatcher"
                              placeholder="配送方式"
                              :disabled="true"
                            ></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>配送费用</td>
                          <td>
                            <el-input
                              v-model="delivery.deliveryCost"
                              placeholder="配送费用"
                              :disabled="true"
                            ></el-input>
                          </td>
                          <td>支付方式</td>
                          <td>
                            <el-input
                              v-model="saleOrder.orderPaytype"
                              placeholder="支付方式"
                              :disabled="true"
                            ></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>自取时间：</td>
                          <td>
                            <el-input
                              v-model="delivery.deliveryTime"
                              placeholder="自取时间"
                              :disabled="true"
                            ></el-input>
                          </td>
                          <td>电子邮箱</td>
                          <td>
                            <el-input
                              v-model="consignee.consigneeMail"
                              placeholder="电子邮箱"
                              :disabled="true"
                            ></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>汇款人</td>
                          <td>
                            <el-input
                              v-model="saleOrder.orderPayer"
                              placeholder="汇款人"
                              :disabled="true"
                            ></el-input>
                          </td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>备注：</td>
                          <td colspan="3">
                            <el-input
                              type="textarea"
                              :rows="3"
                              :disabled="true"
                              placeholder="请输入备注信息内容"
                              v-model="saleOrder.textarea"
                            >
                            </el-input>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col
                    :span="5"
                    :offset="1"
                  >订单退换商品信息：</el-col>
                </el-row>
                <el-row>
                  <el-col
                    :span="16"
                    :offset="3"
                  >
                    <template>
                      <el-table
                        :data="goodsOrderData"
                        :header-cell-style="headClass"
                        :cell-style="rowClass"
                        border
                        style="width: 100%"
                      >
                        <el-table-column
                          prop="serializeNum"
                          label="商品串码"
                          width="130"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="goodsName"
                          label="商品名称"
                          width="130"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="goodsNum"
                          label="商品数量"
                          width="130"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="goodsPrice"
                          label="商品价格"
                        >
                        </el-table-column>
                      </el-table>
                    </template>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col
                    :span="4"
                    :offset="1"
                  >退货/维修信息：</el-col>
                </el-row>
                <el-row>
                  <el-col
                    :span="2"
                    :offset="2"
                  >类型：</el-col>
                  <el-col :span="8">
                    <div style="margin-top: 0px;">
                      <el-radio
                        v-model="applactionDetalis.goodState"
                        label="1"
                        border
                        disabled
                        size="medium"
                        @change="showRepair = false"
                      >退货</el-radio>
                      <el-radio
                        v-model="applactionDetalis.goodState"
                        label="2"
                        border
                        disabled
                        size="medium"
                        @change="showRepair = true"
                      >维修</el-radio>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col
                    :span="4"
                    :offset="2"
                  >订单退修商品信息：</el-col>
                </el-row>
                <el-row>
                  <el-col
                    :span="16"
                    :offset="3"
                  >
                    <template>
                      <el-table
                        :data="retrunRepairgood"
                        :header-cell-style="headClass"
                        :cell-style="rowClass"
                        border
                        style="width: 100%"
                      >
                        <el-table-column
                          prop="serializeNum"
                          label="商品串码"
                          width="130"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="goodsName"
                          label="商品名称"
                          width="130"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="goodsNum"
                          label="商品数量"
                          width="130"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="goodsPrice"
                          label="商品价格"
                        >
                        </el-table-column>
                      </el-table>
                    </template>
                  </el-col>
                </el-row>

                <div v-if="showRepair">
                  <el-row>
                    <el-col
                      :span="3"
                      :offset="2"
                    >维修点信息：</el-col>
                  </el-row>
                  <el-row>
                    <div>
                      <el-col
                        :span="16"
                        :offset="5"
                      >
                        <div style="text-align: center;">
                          <table
                            border="1"
                            bordercolor="aqua"
                            cellspacing="0"
                            style="width: 500px; height:100px;"
                          >
                            <tr>
                              <td>检修点名称</td>
                              <td>
                                <el-input
                                  v-model="repairPlace.rpAddress"
                                  placeholder="检修点名称"
                                  :disabled="true"
                                ></el-input>
                              </td>
                            </tr>
                            <tr>
                              <td>检修点电话</td>
                              <td>
                                <el-input
                                  v-model="repairPlace.rpPhone"
                                  placeholder="检修点电话"
                                  :disabled="true"
                                ></el-input>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </el-col>
                    </div>
                  </el-row>
                </div>
                <div
                  slot="footer"
                  class="dialog-footer"
                >
                  <el-button
                    type="primary"
                    @click="viewDetails = false;wipeData()"
                  >返 回</el-button>
                </div>
              </div>

            </el-dialog>
          </div>
          <!-- 修改申诉记录模态框 -->
          <div>
            <el-dialog
              title="修改申诉记录"
              :visible.sync="updateApplaction"
            >
              <el-form
                label-width="100px"
                :inline="true"
              >
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-form-item label="申述记录名称:">
                      <el-input
                        v-model="applactionDetalis.representationname"
                        style="width: 150px;"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="申述来源:">
                      <el-input
                        v-model="applactionDetalis.representationsource"
                        style="width: 200px;"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="17">
                    <el-form-item label="申述记录描述:">
                      <el-input
                        type="applactionDetalis.representationdescribe"
                        :rows="3"
                        style="width: 400px;"
                        v-model="applactionDetalis.representationdescribe"
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <div>
                <el-row style="text-align: left;">
                  申述详细信息：
                </el-row>
                <el-row>
                  <el-col
                    :span="3"
                    :offset="1"
                  >订单基本资料：</el-col>
                </el-row>

                <el-row>
                  <el-col
                    :span="16"
                    :offset="3"
                  >
                    <div style="text-align: center;">
                      <table
                        border="1"
                        bordercolor="aqua"
                        cellspacing="0"
                        style="width: 600px; height:100px;"
                      >
                        <tr>
                          <td>订单编号</td>
                          <td>
                            <el-input
                              v-model="saleOrder.orderId"
                              placeholder="订单编号"
                              :disabled="true"
                            ></el-input>
                          </td>
                          <td>下单日期</td>
                          <td>
                            <el-input
                              v-model="saleOrder.orderTime"
                              placeholder="订单日期"
                              :disabled="true"
                            ></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>订单类型</td>
                          <td>
                            <el-input
                              v-model="saleOrder.orderType"
                              placeholder="订单类型"
                              :disabled="true"
                            ></el-input>
                          </td>
                          <td>订单动作</td>
                          <td>
                            <el-input
                              v-model="saleOrder.orderActive"
                              placeholder="订单动作"
                              :disabled="true"
                            ></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>业务类型</td>
                          <td>
                            <el-input
                              v-model="saleOrder.orderService"
                              placeholder="业务类型"
                              :disabled="true"
                            ></el-input>
                          </td>
                          <td>订单状态</td>
                          <td>
                            <el-input
                              v-model="saleOrder.orderStatus"
                              placeholder="业务状态"
                              :disabled="true"
                            ></el-input>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col
                    :span="3"
                    :offset="1"
                  >收货人资料：</el-col>
                </el-row>

                <el-row>
                  <el-col
                    :span="16"
                    :offset="3"
                  >
                    <div style="text-align: center;">
                      <table
                        border="1"
                        bordercolor="aqua"
                        cellspacing="0"
                        style="width: 600px; height:100px;"
                      >
                        <tr>
                          <td>收货人姓名</td>
                          <td>
                            <el-input
                              v-model="consignee.consigneeName"
                              placeholder="收货人姓名"
                              :disabled="true"
                            ></el-input>
                          </td>
                          <td>会员账号</td>
                          <td>
                            <el-input
                              v-model="consignee.consigneeId"
                              placeholder="会员账号"
                              :disabled="true"
                            ></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>联系电话</td>
                          <td>
                            <el-input
                              v-model="consignee.consigneeLinephone"
                              placeholder="联系电话"
                              :disabled="true"
                            ></el-input>
                          </td>
                          <td>联系手机</td>
                          <td>
                            <el-input
                              v-model="consignee.consigneeMobilephone"
                              placeholder="联系手机"
                              :disabled="true"
                            ></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>邮政编码</td>
                          <td>
                            <el-input
                              v-model="consignee.consigneePostalcode"
                              placeholder="邮政编码"
                              :disabled="true"
                            ></el-input>
                          </td>
                          <td>收货地址</td>
                          <td>
                            <el-input
                              v-model="consignee.consigneeAddress"
                              placeholder="收货地址"
                              :disabled="true"
                            ></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>配送地区</td>
                          <td>
                            <el-input
                              v-model="consignee.consigneeArea"
                              placeholder="配送地区"
                              :disabled="true"
                            ></el-input>
                          </td>
                          <td>配送方式</td>
                          <td>
                            <el-input
                              v-model="saleOrder.orderDispatcher"
                              placeholder="配送方式"
                              :disabled="true"
                            ></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>配送费用</td>
                          <td>
                            <el-input
                              v-model="delivery.deliveryCost"
                              placeholder="配送费用"
                              :disabled="true"
                            ></el-input>
                          </td>
                          <td>支付方式</td>
                          <td>
                            <el-input
                              v-model="saleOrder.orderPaytype"
                              placeholder="支付方式"
                              :disabled="true"
                            ></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>自取时间：</td>
                          <td>
                            <el-input
                              v-model="delivery.deliveryTime"
                              placeholder="自取时间"
                              :disabled="true"
                            ></el-input>
                          </td>
                          <td>电子邮箱</td>
                          <td>
                            <el-input
                              v-model="consignee.consigneeMail"
                              placeholder="电子邮箱"
                              :disabled="true"
                            ></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td>汇款人</td>
                          <td>
                            <el-input
                              v-model="saleOrder.orderPayer"
                              placeholder="汇款人"
                              :disabled="true"
                            ></el-input>
                          </td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>备注：</td>
                          <td colspan="3">
                            <el-input
                              type="textarea"
                              :rows="3"
                              :disabled="true"
                              placeholder="请输入备注信息内容"
                              v-model="saleOrder.textarea"
                            >
                            </el-input>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col
                    :span="5"
                    :offset="1"
                  >订单中商品信息：</el-col>
                </el-row>
                <el-row>
                  <el-col
                    :span="16"
                    :offset="3"
                  >
                    <template>
                      <el-table
                        :data="goodsOrderData"
                        :header-cell-style="headClass"
                        :cell-style="rowClass"
                        border
                        style="width: 100%"
                      >
                        <el-table-column
                          prop="serializeNum"
                          label="商品串码"
                          width="130"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="goodsName"
                          label="商品名称"
                          width="130"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="goodsNum"
                          label="商品数量"
                          width="130"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="goodsPrice"
                          label="商品价格"
                        >
                        </el-table-column>
                      </el-table>
                    </template>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col
                    :span="4"
                    :offset="1"
                  >退货/维修信息：</el-col>
                </el-row>
                <el-row>
                  <el-col
                    :span="2"
                    :offset="2"
                  >类型：</el-col>
                  <el-col :span="8">
                    <div style="margin-top: 0px;">
                      <el-radio
                        v-model="applactionDetalis.goodState"
                        label="1"
                        border
                        disabled
                        size="medium"
                        @change="showRepair = false"
                      >退货</el-radio>
                      <el-radio
                        v-model="applactionDetalis.goodState"
                        label="2"
                        border
                        disabled
                        size="medium"
                        @change="showRepair = true"
                      >维修</el-radio>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col
                    :span="4"
                    :offset="2"
                  >退修商品信息：</el-col>
                  <el-col
                    :span="3"
                    :offset="12"
                  >
                    <el-button
                      type="primary"
                      size="small"
                      icon="el-icon-edit"
                      @click="selectGoodByOrder = true"
                    >选择商品</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col
                    :span="16"
                    :offset="3"
                  >
                    <template>
                      <el-table
                        :data="retrunRepairgood"
                        :header-cell-style="headClass"
                        :cell-style="rowClass"
                        border
                        style="width: 100%"
                      >

                        <el-table-column
                          prop="serializeNum"
                          label="商品串码"
                          width="130"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="goodsName"
                          label="商品名称"
                          width="130"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="goodsNum"
                          label="商品数量"
                          width="130"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="goodsPrice"
                          label="商品价格"
                        >
                        </el-table-column>
                      </el-table>
                    </template>
                  </el-col>
                </el-row>

                <div v-if="showRepair">
                  <el-row>
                    <el-col
                      :span="3"
                      :offset="2"
                    >维修点信息：</el-col>
                    <el-col
                      :span="3"
                      :offset="13"
                    >
                      <el-button
                        type="primary"
                        size="small"
                        icon="el-icon-edit"
                        @click="slectRepairplace = true;slectRepairPlaceMethod()"
                      >选择维修点</el-button>
                    </el-col>
                  </el-row>
                  <el-row>
                    <div>
                      <el-col
                        :span="16"
                        :offset="5"
                      >
                        <div style="text-align: center;">
                          <table
                            border="1"
                            bordercolor="aqua"
                            cellspacing="0"
                            style="width: 500px; height:100px;"
                          >
                            <tr>
                              <td>检修点名称</td>
                              <td>
                                <el-input
                                  v-model="repairPlace.rpAddress"
                                  placeholder="检修点名称"
                                  :disabled="true"
                                ></el-input>
                              </td>
                            </tr>
                            <tr>
                              <td>检修点电话</td>
                              <td>
                                <el-input
                                  v-model="repairPlace.rpPhone"
                                  placeholder="检修点电话"
                                  :disabled="true"
                                ></el-input>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </el-col>
                    </div>
                  </el-row>
                </div>

                <el-row>
                  <el-button
                    type="primary"
                    icon="el-icon-message"
                    round
                    @click="updateApplaction = false"
                  >暂存</el-button>
                  <el-button
                    type="success"
                    icon="el-icon-check"
                    round
                    @click="updateApplaction = false;updateApplactionSubmit()"
                  >提交</el-button>
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    round
                    @click="updateApplaction = false;wipeData()"
                  >返回</el-button>
                </el-row>

                <div
                  slot="footer"
                  class="dialog-footer"
                >

                </div>
              </div>

            </el-dialog>
          </div>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 条件搜索表单数据
      applicationform: {},
      rratableData: [],//表格显示数据


      page: {
        pageNum: 1,
        pageSize: 5,
        total: 20,
      },
      param: {},

      addApplaction: false,//添加申诉记录模态框
      updateApplaction: false,//查看详细信息模态框
      viewDetails: false,//修改申诉记录模态框

      orderData: [],//选择订单中所有订单数据
      goodsOrderData: [],//订单中商品信息
      repairPlaceData: [],//选择维修点表格中的数据

      returnRepairApplaction: {},//退货换货简单表信息
      applactionDetalis: {},//退货换货详细表信息

      //添加申诉记录中的模态框
      selectOrder: false,//选择订单
      selectGoodByOrder: false,//选择订单中的商品
      slectRepairplace: false,//选择维修点


      saleOrder: {},//订单信息
      consignee: {},//收件人信息
      delivery: {},//快递与订单关联表信息
      repairPlace: {},//维修点信息
      retrunRepairgood: [],//需要售后的商品信息
      showRepair: true,//维修点模块
    };
  },
  methods: {

    search (param) {
      this.$axios.get("/retrunRepair/getAllAppliction", {
        params: param
      }).then(response => {
        // console.log(response.data.data.list);
        this.rratableData = response.data.list;
        this.page = response.data;
      }).catch(function (error) {
        console.log(error);
      })
    },
    // 把订单id传给后端并返回需要的数据赋值给前端
    selectManyDataByOrderId (selOrderId) {
      this.$axios.get("/out/queryId?orderId=" + selOrderId).then(response => {
        this.delivery = response.data.delivery;
        this.goodsOrderData = response.data.orderDetails;
        this.consignee = response.data.consignee;
        this.saleOrder = response.data.saleOrder;
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 把详细表中的要售后的商品的串号传给后端并返回需要的数据赋值给前端
    selectReturnRepairGoodByGoodSerializeNum (selGoodSerializeNum) {
      this.$axios.get("/out/getGoods?uuid=" + selGoodSerializeNum).then(response => {
        console.log("要售后的商品");
        var selectRetrunRepairgood = [];
        var goodsMustReturn = {};

        goodsMustReturn.serializeNum = selGoodSerializeNum;
        goodsMustReturn.goodsName = response.data.gsort;
        goodsMustReturn.goodsNum = response.data.glevel;
        goodsMustReturn.goodsPrice = response.data.gmarketprize;
        selectRetrunRepairgood.push(goodsMustReturn);
        this.retrunRepairgood = selectRetrunRepairgood;
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 把详细表中的维修点ID传给后端，拿到要维修点信息，赋值给this.repairPlace
    selectRepairPlaceById (selRepairPlaceId) {
      this.$axios.get("/repairPlace/getRepairPlaceById?rpId=" + selRepairPlaceId).then(response => {
        this.repairPlace = response.data;
      }).catch(function (error) {
        console.log(error);
      });
    },
    goSearch (param) {
      console.log("去搜索")
      Object.assign(param, this.applicationform);
      this.$axios.get("/retrunRepair/getApplictionBy", { params: param }).then(response => {
        if (this.applicationform.orderId == undefined && this.applicationform.notationName == undefined) {//修改了
          this.search();
        }
        this.rratableData = response.data;
        this.page = {};
        // this.tableData = response.data.data.list;
        // this.page = response.data.data;
      }).catch(function (error) {
        console.log(error);
      })
    },
    exportApplaction () {
      console.log("导出文件")
    },
    //清空查询条件
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    //表中每行数据查看
    selectApplactionDetails (obj) {
      console.log(obj);
      // 把obj.rrappId传给后端查找到该详细表中的记录,然后把查找的数据给this.applactionDetalis   
      this.$axios.get("/applicationDetail/getapplicationDetailById?rrappId=" + obj.rrappId).then(response => {
        this.applactionDetalis = response.data;
        // 把this.applactionDetalis.orderGoodid传给后端，拿到要维修或者退货的商品，赋值给retrunRepairgood
        this.selectReturnRepairGoodByGoodSerializeNum(this.applactionDetalis.orderGoodid);
        // 把this.applactionDetalis.repairplaceId传给后端，拿到要维修点信息，赋值给this.repairPlace
        this.selectRepairPlaceById(this.applactionDetalis.repairplaceId);
      }).catch(function (error) {
        console.log(error);
      });
      // 把this.obj.orderId传给后端，得到delivery，consignee，saleOrder,
      //并把他们给前端的this.delivery,this.consignee,this.saleOrder,this.goodsOrderData（orderDetails给他）
      this.selectManyDataByOrderId(obj.rrappId);

    },
    //表中每行数据修改
    updateApplactionDetails (obj) {
      console.log(obj);

      this.$axios.get("/applicationDetail/getapplicationDetailById?rrappId=" + obj.rrappId).then(response => {
        // 把obj.rrappId传给后端查找到该详细表中的记录,然后把查找的数据给this.applactionDetalis
        this.applactionDetalis = response.data;
        //把this.obj.orderId传给后端，得到delivery，consignee，saleOrder,
        //并把他们给前端的this.delivery,this.consignee,this.saleOrder,this.goodsOrderData（orderDetails给他）
        this.selectManyDataByOrderId(obj.rrappId);

        // 把this.applactionDetalis.orderGoodid传给后端，拿到要维修或者退货的商品，赋值给retrunRepairgood
        this.selectReturnRepairGoodByGoodSerializeNum(this.applactionDetalis.orderGoodid);
        // 把this.applactionDetalis.repairplaceId传给后端，拿到要维修点信息，赋值给this.repairPlace
        this.selectRepairPlaceById(this.applactionDetalis.repairplaceId);

        if (this.retrunRepairgood.serializeNum != null) {
          this.applactionDetalis.orderGoodid = this.retrunRepairgood.serializeNum;
        }
        if (this.repairPlace.rpId != null) {
          this.applactionDetalis.repairplaceId = this.repairPlace.rpId;
        }
        this.returnRepairApplaction = obj;
        this.returnRepairApplaction.reqcodeName = this.applactionDetalis.representationname;
      }).catch(function (error) {
        console.log(error);
      });
    },
    //表中每行数据删除
    deleteApplactionDetails (obj) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(obj.rrappId);
        this.$axios.delete("/retrunRepair/deleteApplictionByKey", { params: obj }).then(res => {
          this.search();
          if (res.code == 20000) {
            this.$message({
              message: '操作成功',
              type: 'success'
            });
          } else {
            this.$message({
              message: '操作失败',
              type: 'error'
            });
          }
        }).catch(function (error) {
          console.log(error);
        })
        this.$message({
          type: 'success',
          message: '删除成功!',
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //选择订单中的选择某行数据
    selectRetrunRepairOrderMethod (obj) {

      this.selectManyDataByOrderId(obj.orderId);
    },
    // 选择订单中全部商品的某个商品
    selectRepairGoodMethod (obj) {
      var srg = []; srg.push(obj);
      this.retrunRepairgood = srg;
      console.log(this.retrunRepairgood)
    },

    //点击选择订单查出所有已出库订单
    selectOrderMethod () {
      console.log("选择订单");
      // 访问前台获得所有的订单数据
      this.$axios.get("/saleManage/selectAll").then(response => {
        this.orderData = response.orders.list;
      }).catch(function (error) {
        console.log(error);
      })
    },
    //选择维修点方法
    slectRepairPlaceMethod () {
      console.log("选择维修点");
      this.$axios.get("/repairPlace/allRepairPlace").then(response => {
        this.repairPlaceData = response.data;
      }).catch(function (error) {
        console.log(error);
      })
    },
    // 提交新增退货维修单记录
    insertApplaction () {
      console.log("去提交添加");
      // Object.assign(param,this.applicationform);
      // 详细表信息
      this.applactionDetalis.orderId = this.saleOrder.orderId;
      this.applactionDetalis.orderGoodid = this.retrunRepairgood[0].serializeNum;
      if (this.repairPlace.rpId != null) {
        this.applactionDetalis.repairplaceId = this.repairPlace.rpId;
      } else {
        this.applactionDetalis.repairplaceId = 0;
      }
      // 简单表信息
      this.returnRepairApplaction.orderId = this.applactionDetalis.orderId;
      this.returnRepairApplaction.reqcodeName = this.applactionDetalis.representationname;
      this.returnRepairApplaction.billstate = 2;


      console.log(this.applactionDetalis);
      console.log(this.returnRepairApplaction);

      // 把applactionDetalis和returnRepairApplaction传给后端
      var returnData = this.returnRepairApplaction;
      this.$axios.post("/retrunRepair/addAppliction", returnData).then(res => {
        if (res.code == 20000) {
          this.$message({
            message: '操作成功',
            type: 'success'
          });
        } else {
          this.$message({
            message: '操作失败',
            type: 'error'
          });
        }
      }).catch(function (error) {
        console.log(error);
      })
      // 把applactionDetalis和returnRepairApplaction传给后端
      var data = this.applactionDetalis;
      this.$axios.post("/applicationDetail/addApplicationDetail", data).then(res => {
        if (res.code == 20000) {
          this.$message({
            message: '操作成功',
            type: 'success'
          });
        } else {
          this.$message({
            message: '操作失败',
            type: 'error'
          });
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    // 修改退货维修单记录
    updateApplactionSubmit () {
      console.log("去提交修改"),

        console.log(this.applactionDetalis);
      console.log(this.returnRepairApplaction);
      // 把returnRepairApplaction传给后端
      var returnData = this.returnRepairApplaction;
      this.$axios.post("/retrunRepair/updateAppliction", returnData).then(res => {
        if (res.code == 20000) {
          this.$message({
            message: '操作成功',
            type: 'success'
          });
        } else {
          this.$message({
            message: '操作失败',
            type: 'error'
          });
        }
      }).catch(function (error) {
        console.log(error);
      })
      // 把applactionDetalis传给后端
      var data = this.applactionDetalis;
      this.$axios.post("/applicationDetail/updateApplicationDetail", data).then(res => {
        if (res.code == 20000) {
          this.$message({
            message: '操作成功',
            type: 'success'
          });
        } else {
          this.$message({
            message: '操作失败',
            type: 'error'
          });
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    //清空数据
    wipeData () {
      this.prderData = [];
      this.goodsOrderData = [];
      this.repairPlaceData = [];
      this.returnRepairApplaction = {};
      this.applactionDetalis = {};
      this.saleOrder = {};
      this.consignee = {};
      this.delivery = {};
      this.repairPlace = {};
      this.retrunRepairgood = [];
    },
    handleCurrentChange (pageNum) {
      //当前页页码改变
      this.search({ "pageNum": pageNum, "pageSize": this.page.pageSize })
    },
    handleSizeChange (pageSize) {
      //每页记录数改变
      this.search({ "pageNum": this.page.pageNum, "pageSize": pageSize })
    },
    //表格居中
    headClass () { //表头居中显示
      return "text-align:center"
    },
    rowClass () { //表格数据居中显示
      return "text-align:center"
    },
  },
  components: {},
  created () {
    this.search(); //初始化

  },
  mounted () { }
}
</script>

<style scoped>
/* 布局相关 */
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 50px; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
/* 栅格结构相关 */
.el-row {
  margin-bottom: 20px;
  /* &:last-child {
    margin-bottom: 0;
  } */
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #cccccc;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>