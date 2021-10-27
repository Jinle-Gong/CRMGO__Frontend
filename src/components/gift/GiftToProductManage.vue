<template>
  <div id="main">
    <el-card class="box-card">
      <!--查询-->
      <el-form
        :inline="true"
        :model="queryForm"
        class="demo-form-inline"
      >
        <el-button
          type="success"
          @click="addDialogFormVisible = true"
        >新增赠品转商品</el-button>
        <el-form-item label="商品名称">
          <el-input v-model="queryForm.goodsName"></el-input>
        </el-form-item>
        <el-form-item
          label="商品类型"
          :label-width="formLabelWidth"
        >
          <el-cascader
            :options="typeOptions"
            :props="{ value: 'typeId', label: 'typeName'}"
            :show-all-levels="false"
            @change="handleChange"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item
          label="商品品牌"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="queryForm.goodsBrand"
            placeholder="请选择商品品牌"
          >
            <el-option
              v-for="item in brandOptions"
              :key="item.dic_key"
              :label="item.dic_value"
              :value="item.dic_key"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="商品颜色"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="queryForm.goodsColor"
            placeholder="请选择赠品颜色"
          >
            <el-option
              v-for="item in colorOptions"
              :key="item.dic_key"
              :label="item.dic_value"
              :value="item.dic_key"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="审核状态"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="queryForm.checkState"
            placeholder="请选择审核状态"
          >
            <el-option
              v-for="item in checkStateOptions"
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
            @click="query()"
          >查询</el-button>
        </el-form-item>
        <el-button
          type="primary"
          @click="queryEmpty()"
        >重置</el-button>
      </el-form>
      <hr>
      <!--表格-->
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          prop="checkId"
          label="审核序号"
          width="180"
        >
          <span
            slot-scope="scope"
            style="margin-left: 10px"
          >{{ scope.row.checkId }}</span>
        </el-table-column>
        <el-table-column
          prop="goodsName"
          label="商品名称"
          width="180"
        >
          <span
            slot-scope="scope"
            style="margin-left: 10px"
          >{{ scope.row.goodsName }}</span>
        </el-table-column>
        <el-table-column
          prop="goodsType"
          label="商品类型"
          width="180"
        >
          <span
            slot-scope="scope"
            style="margin-left: 10px"
          >{{ scope.row.goodsType }}</span>
        </el-table-column>
        <el-table-column
          prop="goodsBrand"
          label="商品品牌"
        >
          <span
            slot-scope="scope"
            style="margin-left: 10px"
          >{{ scope.row.goodsBrand }}</span>
        </el-table-column>
        <el-table-column
          prop="goodsColor"
          label="商品颜色"
        >
          <span
            slot-scope="scope"
            style="margin-left: 10px"
          >{{ scope.row.goodsColor }}</span>
        </el-table-column>
        <el-table-column
          prop="goodsPrice"
          label="商品价格"
        >
          <span
            slot-scope="scope"
            style="margin-left: 10px"
          >{{ scope.row.goodsPrice }}</span>
        </el-table-column>
        <el-table-column
          prop="goodsNumber"
          label="商品数量"
        >
          <span
            slot-scope="scope"
            style="margin-left: 10px"
          >{{ scope.row.goodsNumber }}</span>
        </el-table-column>
        <el-table-column
          prop="checkState"
          label="审核状态"
        >
          <span
            slot-scope="scope"
            style="margin-left: 10px"
          >{{ scope.row.checkState }}</span>
        </el-table-column>
        <el-table-column
          prop="channelHandle"
          label="操作"
        >
          <span
            slot-scope="scope"
            style="margin-left: 10px"
          >{{ scope.row.channelHandle }}</span>

          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              round
              icon="el-icon-search"
              @click="lookDialogFormVisible = true,handleLook(scope.row)"
            >查看
            </el-button>
            <el-button
              v-show="scope.row.checkState=='未审核'"
              size="mini"
              type="warning"
              round
              icon="el-icon-edit"
              @click="updateDialogFormVisible = true,handleUpdate(scope.row)"
            >修改
            </el-button>
            <el-button
              v-show="scope.row.checkState=='未审核'"
              size="mini"
              type="danger"
              round
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
            >删除
            </el-button>
            <el-button
              size="mini"
              type="success"
              round
              icon="el-icon-search"
              @click="checkDialogFormVisible = true, handleCheck(scope.row),handleLook(scope.row)"
            >审核跟踪
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--查看弹窗-->
      <el-dialog
        title="查看详情"
        :visible.sync="lookDialogFormVisible"
      >
        <el-form :model="lookForm">
          <el-form-item
            label="商品名称"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.goodsName"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品类型"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.goodsType"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品型号"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.goodsModelNumber"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品单价"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.goodsPrice"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="采购成本"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.goodsCost"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="采购部门"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.goodsDepartment"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品数量"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.goodsNumber"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品颜色"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.goodsColor"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品品牌"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.goodsBrand"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="入库数量"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.inventoryQuantity"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="天翼价"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.physicalPrice"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="审核状态"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.checkState"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!--修改弹窗-->
      <el-dialog
        title="修改赠品"
        :visible.sync="updateDialogFormVisible"
      >
        <el-form :model="updateForm">
          <el-form-item
            label="商品名称"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="updateForm.goodsName"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品类型"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="updateForm.goodsType"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品型号"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="updateForm.goodsModelNumber"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品价格"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="updateForm.goodsPrice"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="采购成本"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="updateForm.goodsCost"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="采购成本"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="updateForm.goodsCost"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="采购部门"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="updateForm.goodsDepartment"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品颜色"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="updateForm.goodsColor"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品品牌"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="updateForm.goodsBrand"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品数量"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="updateForm.goodsNumber"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="入库数量"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="updateForm.inventoryQuantity"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="天翼价"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="updateForm.physicalPrice"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
          style="text-align: center"
        >
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="updateDialogFormVisible = false,cancel()">取 消</el-button>
            <el-button
              type="primary"
              @click="updateDialogFormVisible = false,update()"
            >确 定</el-button>
          </div>
        </div>
      </el-dialog>
      <!--分页-->
      <div
        class="block"
        style="text-align: center"
      >
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.pageNum"
          :page-sizes="[5,10,15,20]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        >
        </el-pagination>
      </div>
      <!--添加弹窗-->
      <el-dialog
        width="90%"
        title="选择转变为商品的赠品"
        :visible.sync="addDialogFormVisible"
      >
        <el-form
          :inline="true"
          :model="presentQueryForm"
          class="demo-form-inline"
        >
          <el-form-item label="赠品名称">
            <el-input v-model="presentQueryForm.presentName"></el-input>
          </el-form-item>
          <el-form-item label="赠品型号">
            <el-input v-model="presentQueryForm.presentModelNumber"></el-input>
          </el-form-item>
          <el-form-item
            label="赠品类型"
            :label-width="formLabelWidth"
          >
            <el-cascader
              :options="typeOptions"
              :props="{ value: 'typeId', label: 'typeName'}"
              :show-all-levels="false"
              @change="presentHandleChangeQueryType"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item
            label="赠品品牌"
            :label-width="formLabelWidth"
          >
            <el-select
              v-model="presentQueryForm.presentBrand"
              placeholder="请选择赠品品牌"
            >
              <el-option
                v-for="item in brandOptions"
                :key="item.dic_key"
                :label="item.dic_value"
                :value="item.dic_key"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="赠品颜色"
            :label-width="formLabelWidth"
          >
            <el-select
              v-model="presentQueryForm.presentColour"
              placeholder="请选择赠品颜色"
            >
              <el-option
                v-for="item in colorOptions"
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
              @click="presentQuery()"
            >查询</el-button>
          </el-form-item>
          <el-button
            type="primary"
            @click="presentQueryEmpty()"
          >重置</el-button>
        </el-form>
        <hr>
        <!--赠品表格-->
        <el-table
          :data="presentTableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            prop="presentId"
            label="赠品序号"
            width="180"
          >
            <span
              slot-scope="scope"
              style="margin-left: 10px"
            >{{ scope.row.presentId }}</span>
          </el-table-column>
          <el-table-column
            prop="presentName"
            label="赠品名称"
            width="180"
          >
            <span
              slot-scope="scope"
              style="margin-left: 10px"
            >{{ scope.row.presentName }}</span>
          </el-table-column>
          <el-table-column
            prop="presentModelNumber"
            label="赠品型号"
            width="180"
          >
            <span
              slot-scope="scope"
              style="margin-left: 10px"
            >{{ scope.row.presentModelNumber }}</span>
          </el-table-column>
          <el-table-column
            prop="presentType"
            label="赠品类型"
            width="180"
          >
            <span
              slot-scope="scope"
              style="margin-left: 10px"
            >{{ scope.row.presentType }}</span>
          </el-table-column>
          <el-table-column
            prop="presentMinimumStock"
            label="最低库存量"
          >
            <span
              slot-scope="scope"
              style="margin-left: 10px"
            >{{ scope.row.presentMinimumStock }}</span>
          </el-table-column>
          <el-table-column
            prop="presentPrice"
            label="赠品单价"
          >
            <span
              slot-scope="scope"
              style="margin-left: 10px"
            >{{ scope.row.presentPrice }}</span>
          </el-table-column>
          <el-table-column
            prop="presentCost"
            label="采购成本"
          >
            <span
              slot-scope="scope"
              style="margin-left: 10px"
            >{{ scope.row.presentCost }}</span>
          </el-table-column>
          <el-table-column
            prop="presentColour"
            label="赠品颜色"
          >
            <span
              slot-scope="scope"
              style="margin-left: 10px"
            >{{ scope.row.presentColour }}</span>
          </el-table-column>
          <el-table-column
            prop="presentBrand"
            label="赠品品牌"
          >
            <span
              slot-scope="scope"
              style="margin-left: 10px"
            >{{ scope.row.presentBrand }}</span>
          </el-table-column>
          <el-table-column
            prop="presentState"
            label="赠品状态"
          >
            <span
              slot-scope="scope"
              style="margin-left: 10px"
            >{{ scope.row.presentState }}</span>
          </el-table-column>
          <el-table-column
            prop="channelHandle"
            label="操作"
          >
            <span
              slot-scope="scope"
              style="margin-left: 10px"
            >{{ scope.row.channelHandle }}</span>

            <template slot-scope="scope">
              <el-button
                v-show="scope.row.presentState=='有效'"
                size="mini"
                type="primary"
                round
                icon="el-icon-search"
                @click="addInnerVisible=true,addPresentHandle(scope.row)"
              >选择
              </el-button>
            </template>
          </el-table-column>
          <el-dialog
            width="80%"
            title="新增赠品转商品"
            :visible.sync="addInnerVisible"
            append-to-body
          >
            <el-form :model="addForm">
              <el-form-item
                label="商品名称"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="addForm.goodsName"
                  autocomplete="off"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item
                label="商品类型"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="addForm.goodsType"
                  autocomplete="off"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item
                label="商品型号"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="addForm.goodsModelNumber"
                  autocomplete="off"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item
                label="商品价格"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="addForm.goodsPrice"
                  autocomplete="off"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item
                label="采购成本"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="addForm.goodsCost"
                  autocomplete="off"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item
                label="采购成本"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="addForm.goodsCost"
                  autocomplete="off"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item
                label="采购部门"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="addForm.goodsDepartment"
                  autocomplete="off"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item
                label="商品颜色"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="addForm.goodsColor"
                  autocomplete="off"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item
                label="商品品牌"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="addForm.goodsBrand"
                  autocomplete="off"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item
                label="商品数量"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="addForm.goodsNumber"
                  autocomplete="off"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item
                label="入库数量"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="addForm.inventoryQuantity"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="天翼价"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="addForm.physicalPrice"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div
              slot="footer"
              class="dialog-footer"
              style="text-align: center"
            >
              <div
                slot="footer"
                class="dialog-footer"
              >
                <el-button @click="addInnerVisible = false,cancel()">取 消</el-button>
                <el-button
                  type="primary"
                  @click="addInnerVisible = false,addSubmit()"
                >确 定</el-button>
              </div>
            </div>
          </el-dialog>
        </el-table>
        <!--赠品分页-->
        <div
          class="block"
          style="text-align: center"
        >
          <el-pagination
            @size-change="presentHandleSizeChange"
            @current-change="presentHandleCurrentChange"
            :current-page="presentPage.pageNum"
            :page-sizes="[5,10,15,20]"
            :page-size="presentPage.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="presentPage.total"
          >
          </el-pagination>
        </div>
      </el-dialog>
      <!--审核跟踪弹窗-->
      <el-dialog
        title="审核跟踪"
        :visible.sync="checkDialogFormVisible"
      >
        <el-form :model="lookForm">
          <el-form-item
            label="商品名称"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.goodsName"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品类型"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.goodsType"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品型号"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.goodsModelNumber"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品单价"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.goodsPrice"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="采购成本"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.goodsCost"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="采购部门"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.goodsDepartment"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品数量"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.goodsNumber"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品颜色"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.goodsColor"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品品牌"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.goodsBrand"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="入库数量"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.inventoryQuantity"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="天翼价"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.physicalPrice"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
        </el-form>
        <!--审核记录表格-->
        <el-table
          :data="checkTableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            prop="recordAuditor"
            label="审核人"
            width="180"
          >
            <span
              slot-scope="scope"
              style="margin-left: 10px"
            >{{ scope.row.recordAuditor }}</span>
          </el-table-column>
          <el-table-column
            prop="recordTime"
            label="审核时间"
            width="180"
          >
            <span
              slot-scope="scope"
              style="margin-left: 10px"
            >{{ scope.row.recordTime }}</span>
          </el-table-column>
          <el-table-column
            prop="checkState"
            label="审核状态"
            width="180"
          >
            <span
              slot-scope="scope"
              style="margin-left: 10px"
            >{{ scope.row.checkState }}</span>
          </el-table-column>
          <el-table-column
            prop="recordOpinion"
            label="审核意见"
            width="180"
          >
            <span
              slot-scope="scope"
              style="margin-left: 10px"
            >{{ scope.row.recordOpinion }}</span>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkTableData: [],
      presentTableData: [],
      typeOptions: [],
      checkStateOptions: [],
      brandOptions: [],
      colorOptions: [],
      firstClass: '',
      firstSelect: '',
      firstOption: [],
      secondOption: [],
      lookForm: {},
      updateForm: {
        goodsName: '',
        goodsNumber: '',
        goodsModelNumber: '',
        goodsType: '',
        goodsBrand: '',
        goodsColor: '',
        goodsDepartment: '',
        goodsPrice: '',
        goodsCost: '',
        inventoryQuantity: '',
        physicalPrice: '',
      },
      presentQueryForm: {
        presentId: '',
        presentName: '',
        presentType: '',
        presentColour: '',
        presentBrand: '',
      },
      queryForm: {

      },
      checkDialogFormVisible: false,
      choiceDialogFormVisible: false,
      addDialogFormVisible: false,
      lookDialogFormVisible: false,
      updateDialogFormVisible: false,
      addInnerVisible: false,
      addForm: {
        goodsId: '',
        goodsNumber: '',
        goodsName: '',
        goodsType: '',
        goodsBrand: '',
        goodsColor: '',
        goodsPrice: '',
        inventoryQuantity: '',
        physicalPrice: '',
        checkState: '',
      },
      formLabelWidth: '120px',
      value: [],
      tableData: [],
      page: {},
      presentPage: {},
    };

  },
  methods: {
    handleSizeChange (val) {
      this.query({
        pageNum: this.page.pageNum,
        pageSize: val
      })
    },
    // 当前改变----当前页码改变之后，触发这个函数
    handleCurrentChange (val) {
      this.query({
        pageNum: val,
        pageSize: this.page.pageSize
      })
    },
    queryEmpty () {
      this.queryForm.goodsName = '';
      this.queryForm.goodsType = '';
      this.queryForm.goodsColor = '';
      this.queryForm.goodsBrand = '';
      this.queryForm.checkState = '';
    },
    query (param) {
      if (param === undefined) param = {}
      Object.assign(param, this.queryForm);
      this.$axios.get('/presentCheck', {
        params: param
      }).then(response => {
        if (response.code === 20000) {
          this.tableData = response.data.list;
          this.page = response.data;
        } else {
          this.$message.error('数据查询失败！');
        }
      }).catch(error => {
        console.log(error)
        this.$message.error('服务器连接失败！');
      })
    },
    //改变查询表单类型数据
    handleChange (value) {
      this.queryForm.goodsType = value[value.length - 1];
    },
    //获取类型数据
    queryType () {
      this.$axios.get('/goodsType/selectTree',
      ).then(response => {
        if (response.code === 20000) {
          this.$nextTick(() => { this.typeOptions = this.getTreeData(response.data) }); //解决异步问题
          //将回调函数延迟在下一次dom更新数据后调用，简单的理解是：当数据更新了，在dom中渲染后，自动执行该函数
        } else {
          this.$message.error('数据查询失败！');
        }
      }).catch(error => {
        console.log(error)
        this.$message.error('服务器连接失败！');
      })
    },
    //获取审核状态数据
    queryCheckState () {
      this.$axios.get('/presentCheck/getCheckState',
      ).then(response => {
        if (response.code === 20000) {
          this.checkStateOptions = response.data;
        } else {
          this.$message.error('数据查询失败！');
        }
      }).catch(error => {
        console.log(error)
        this.$message.error('服务器连接失败！');
      })
    },
    //获取品牌数据
    queryBrand () {
      this.$axios.get('/present/getBrand',
      ).then(response => {
        if (response.code === 20000) {
          this.brandOptions = response.data;
        } else {
          this.$message.error('数据查询失败！');
        }
      }).catch(error => {
        console.log(error)
        this.$message.error('服务器连接失败！');
      })
    },
    //获取颜色数据
    queryColor () {
      this.$axios.get('/present/getColor',
      ).then(response => {
        if (response.code === 20000) {
          this.colorOptions = response.data;
        } else {
          this.$message.error('数据查询失败！');
        }
      }).catch(error => {
        console.log(error)
        this.$message.error('服务器连接失败！');
      })
    },
    //获取审核记录
    handleCheck (row) {
      this.$axios.get('/PresentCheckRecordHandler/selectPresentCheckRecordByCheckId/' + row.checkId
      ).then(response => {
        if (response.code === 20000) {
          this.checkTableData = response.data;
        } else {
          this.$message.error('数据查询失败！');
        }
      }).catch(error => {
        console.log(error)
        this.$message.error('服务器连接失败！');
      })
    },
    //内嵌模态框的添加确定
    addSubmit () {
      this.$axios.post('/presentCheck/addPresentCheck', this.addForm).then(response => {
        if (response.code === 20000) {
          this.$message({
            message: '添加成功！',
            type: 'success'
          });
          this.query();
        } else {
          this.$message.error('添加失败！');
        }
      })
    },
    //修改弹窗确认键
    update () {
      this.$axios.put('/presentCheck', this.updateForm)
        .then(response => {
          if (response.code === 20000) {
            this.$message({
              message: '修改赠品成功！',
              type: 'success'
            });
            this.query();
          } else {
            this.$message.error('修改赠品失败！');
          }
        }).catch(error => {
          console.log(error)
          this.$message.error('修改赠品异常！');
        });
    },
    //弹窗取消键
    cancel () {
      this.$message({
        type: 'info',
        message: '已取消操作'
      });
    },
    //点击内嵌模态框内的选择
    addPresentHandle (row) {
      this.addForm.goodsId = row.presentId;
      this.addForm.goodsName = row.presentName;
      this.addForm.goodsNumber = row.presentMinimumStock;
      this.addForm.goodsModelNumber = row.presentModelNumber;
      this.addForm.goodsType = row.presentType;
      this.addForm.goodsBrand = row.presentBrand;
      this.addForm.goodsColor = row.presentColour;
      this.addForm.goodsDepartment = row.presentDepartment;
      this.addForm.goodsPrice = row.presentPrice;
      this.addForm.goodsCost = row.presentCost;
      this.addForm.physicalPrice = "";
      this.addForm.inventoryQuantity = "";
    },
    //点击每行的查看
    handleLook (row) {
      this.lookForm.goodsName = row.goodsName;
      this.lookForm.goodsNumber = row.goodsNumber;
      this.lookForm.goodsModelNumber = row.goodsModelNumber;
      this.lookForm.goodsType = row.goodsType;
      this.lookForm.goodsBrand = row.goodsBrand;
      this.lookForm.goodsColor = row.goodsColor;
      this.lookForm.goodsDepartment = row.goodsDepartment;
      this.lookForm.goodsPrice = row.goodsPrice;
      this.lookForm.goodsCost = row.goodsCost;
      this.lookForm.inventoryQuantity = row.inventoryQuantity;
      this.lookForm.physicalPrice = row.physicalPrice;
      this.lookForm.checkState = row.checkState;
    },
    //点击每行的修改
    handleUpdate (row) {
      this.updateForm.checkId = row.checkId;
      this.updateForm.goodsName = row.goodsName;
      this.updateForm.goodsNumber = row.goodsNumber;
      this.updateForm.goodsModelNumber = row.goodsModelNumber;
      this.updateForm.goodsType = row.goodsType;
      this.updateForm.goodsBrand = row.goodsBrand;
      this.updateForm.goodsColor = row.goodsColor;
      this.updateForm.goodsDepartment = row.goodsDepartment;
      this.updateForm.goodsPrice = row.goodsPrice;
      this.updateForm.goodsCost = row.goodsCost;
      this.updateForm.inventoryQuantity = row.inventoryQuantity;
      this.updateForm.physicalPrice = row.physicalPrice;
    },
    //点击每行的删除
    handleDelete (row) {
      this.$confirm('此操作将永久删除,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete("/presentCheck/delPresentCheckById/" + row.checkId)
          .then(response => {
            this.query();
            if (response.code === 20000) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              this.$message({
                type: 'info',
                message: '删除失败'
              });
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '错误'
            });
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    tableRowClassName ({rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'success-row';
      }
      return '';
    },
    getTreeData (data) {
      // 循环遍历json数据
      for (let i = 0; i < data.length; i++) {
        if (data[i].children == null || data[i].children.length < 1) {
          // subMenu若为空数组，则将subMenu设为undefined
          data[i].children = undefined;
        } else {
          // subMenu若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].children);
        }
      }
      return data;
    },
    //新增转化选择赠品界面
    presentHandleChangeQueryType (value) {
      this.presentQueryForm.goodsType = value[value.length - 1];
    },
    presentHandleSizeChange (val) {
      this.presentQuery({
        pageNum: this.presentPage.pageNum,
        pageSize: val
      })
    },
    // 当前改变----当前页码改变之后，触发这个函数
    presentHandleCurrentChange (val) {
      this.presentQuery({
        pageNum: val,
        pageSize: this.presentPage.pageSize
      })
    },
    presentQuery (param) {
      if (param === undefined) param = {};
      Object.assign(param, this.presentQueryForm);
      this.$axios.get('/present', {
        params: param
      }).then(response => {
        if (response.code === 20000) {
          this.presentTableData = response.data.list;
          this.presentPage = response.data;
        } else {
          this.$message.error('数据查询失败！');
        }
      }).catch(error => {
        console.log(error)
        this.$message.error('服务器连接失败！');
      })
    },
    presentQueryEmpty () {
      this.presentQueryForm.presentColour = '';
      this.presentQueryForm.presentBrand = '';
      this.presentQueryForm.presentColour = '';
      this.presentQueryForm.presentModelNumber = '';
      this.presentQueryForm.presentName = '';
      this.presentQueryForm.presentType = '';
    },
  },
  components: {},
  computed: {},
  created () {
    this.query();
    this.queryType();
    this.queryBrand();
    this.queryCheckState();
    this.queryColor();
    this.presentQuery();
  },
  mounted () { }
}
</script>

<style scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.el-input {
  width: 90%;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 100%;
}
</style>