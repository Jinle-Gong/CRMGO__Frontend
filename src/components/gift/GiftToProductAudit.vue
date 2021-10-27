<template>
<div id="main">
    <el-card class="box-card">
        <!--查询-->
        <el-form :inline="true" :model="queryForm" class="demo-form-inline">
            <el-form-item label="商品名称">
                <el-input v-model="queryForm.goodsName"></el-input>
            </el-form-item>
            <el-form-item label="商品类型" :label-width="formLabelWidth">
                <el-cascader :options="typeOptions" :props="{ value: 'typeId', label: 'typeName'}"
                             :show-all-levels="false" @change="handleChange">
                </el-cascader>
            </el-form-item>
            <el-form-item label="商品品牌" :label-width="formLabelWidth">
                <el-select v-model="queryForm.goodsBrand" placeholder="请选择商品品牌">
                    <el-option
                            v-for="item in brandOptions"
                            :key="item.dic_key"
                            :label="item.dic_value"
                            :value="item.dic_key">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品颜色" :label-width="formLabelWidth">
                <el-select v-model="queryForm.goodsColor" placeholder="请选择赠品颜色">
                    <el-option
                            v-for="item in colorOptions"
                            :key="item.dic_key"
                            :label="item.dic_value"
                            :value="item.dic_key">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="审核状态" :label-width="formLabelWidth">
                <el-select v-model="queryForm.checkState" placeholder="请选择审核状态">
                    <el-option
                            v-for="item in checkStateOptions"
                            :key="item.dic_key"
                            :label="item.dic_value"
                            :value="item.dic_key">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="query()">查询</el-button>
            </el-form-item>
            <el-button type="primary" @click="queryEmpty()">重置</el-button>
        </el-form>
        <hr>
        <!--表格-->
        <el-table
                :data="tableData"
                style="width: 100%"
                :row-class-name="tableRowClassName">
            <el-table-column
                    prop="checkId"
                    label="审核序号"
                    width="180">
                <span slot-scope="scope" style="margin-left: 10px">{{ scope.row.checkId }}</span>
            </el-table-column>
            <el-table-column
                    prop="goodsName"
                    label="商品名称"
                    width="180">
                <span slot-scope="scope" style="margin-left: 10px">{{ scope.row.goodsName }}</span>
            </el-table-column>
            <el-table-column
                    prop="goodsType"
                    label="商品类型"
                    width="180">
                <span slot-scope="scope" style="margin-left: 10px">{{ scope.row.goodsType }}</span>
            </el-table-column>
            <el-table-column
                    prop="goodsBrand"
                    label="商品品牌">
                <span slot-scope="scope" style="margin-left: 10px">{{ scope.row.goodsBrand }}</span>
            </el-table-column>
            <el-table-column
                    prop="goodsColor"
                    label="商品颜色">
                <span slot-scope="scope" style="margin-left: 10px">{{ scope.row.goodsColor }}</span>
            </el-table-column>
            <el-table-column
                    prop="goodsPrice"
                    label="商品价格">
                <span slot-scope="scope" style="margin-left: 10px">{{ scope.row.goodsPrice }}</span>
            </el-table-column>
            <el-table-column
                    prop="goodsNumber"
                    label="商品数量">
                <span slot-scope="scope" style="margin-left: 10px">{{ scope.row.goodsNumber }}</span>
            </el-table-column>
            <el-table-column
                    prop="checkState"
                    label="审核状态">
                <span slot-scope="scope" style="margin-left: 10px">{{ scope.row.checkState }}</span>
            </el-table-column>
            <el-table-column
                    prop="channelHandle"
                    label="操作">
                <span slot-scope="scope" style="margin-left: 10px">{{ scope.row.channelHandle }}</span>
                <template slot-scope="scope">
                    <el-button
                            v-show="scope.row.checkState=='未审核'"
                            size="mini"
                            type="warning"
                            round
                            icon="el-icon-edit"
                            @click="lookDialogFormVisible = true,handleLook(scope.row)">审核
                    </el-button>
                    <el-button
                            size="mini"
                            type="success"
                            round
                            icon="el-icon-search"
                            @click="checkDialogFormVisible = true,handleLook(scope.row),queryCheck(scope.row)">审核跟踪
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <div class="block" style="text-align: center">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pageNum"
                           :page-sizes="[5,10,15,20]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
            </el-pagination>
        </div>
        <!--审核弹窗-->
        <el-dialog title="审核" :visible.sync="lookDialogFormVisible">
            <el-form :model="updateForm">
                <el-form-item label="商品名称" :label-width="formLabelWidth">
                    <el-input v-model="lookForm.goodsName" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="商品类型" :label-width="formLabelWidth">
                    <el-input v-model="lookForm.goodsType" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="商品型号" :label-width="formLabelWidth">
                    <el-input v-model="lookForm.goodsModelNumber" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="商品单价" :label-width="formLabelWidth">
                    <el-input v-model="lookForm.goodsPrice" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="采购成本" :label-width="formLabelWidth">
                    <el-input v-model="lookForm.goodsCost" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="采购部门" :label-width="formLabelWidth">
                    <el-input v-model="lookForm.goodsDepartment" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="商品数量" :label-width="formLabelWidth">
                    <el-input v-model="lookForm.goodsNumber" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="商品颜色" :label-width="formLabelWidth">
                    <el-input v-model="lookForm.goodsColor" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="商品品牌" :label-width="formLabelWidth">
                    <el-input v-model="lookForm.goodsBrand" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="入库数量" :label-width="formLabelWidth">
                    <el-input v-model="lookForm.inventoryQuantity" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="天翼价" :label-width="formLabelWidth">
                    <el-input v-model="lookForm.physicalPrice" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="审核意见">
                    <el-input type="textarea" v-model="updateForm.recordOpinion" autocomplete="off" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <div slot="footer" class="dialog-footer">
                    <el-button @click="lookDialogFormVisible = false,cancel()">取 消</el-button>
                    <el-button type="primary" @click="lookDialogFormVisible = false,updateFalse()">通过审核</el-button>
                    <el-button type="primary" @click="lookDialogFormVisible = false,updateTrue()">驳回审核</el-button>
                </div>
            </div>
        </el-dialog>
        <!--审核跟踪弹窗-->
        <el-dialog title="审核跟踪" :visible.sync="checkDialogFormVisible">
            <el-form :model="lookForm">
                <el-form-item label="商品名称" :label-width="formLabelWidth">
                    <el-input v-model="lookForm.goodsName" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="商品类型" :label-width="formLabelWidth">
                    <el-input v-model="lookForm.goodsType" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="商品型号" :label-width="formLabelWidth">
                    <el-input v-model="lookForm.goodsModelNumber" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="商品单价" :label-width="formLabelWidth">
                    <el-input v-model="lookForm.goodsPrice" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="采购成本" :label-width="formLabelWidth">
                    <el-input v-model="lookForm.goodsCost" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="采购部门" :label-width="formLabelWidth">
                    <el-input v-model="lookForm.goodsDepartment" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="商品数量" :label-width="formLabelWidth">
                    <el-input v-model="lookForm.goodsNumber" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="商品颜色" :label-width="formLabelWidth">
                    <el-input v-model="lookForm.goodsColor" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="商品品牌" :label-width="formLabelWidth">
                    <el-input v-model="lookForm.goodsBrand" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="入库数量" :label-width="formLabelWidth">
                    <el-input v-model="lookForm.inventoryQuantity" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="天翼价" :label-width="formLabelWidth">
                    <el-input v-model="lookForm.physicalPrice" autocomplete="off" disabled></el-input>
                </el-form-item>
            </el-form>
            <!--审核记录表格-->
            <el-table
                    :data="checkTableData"
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
                <el-table-column
                        prop="recordAuditor"
                        label="审核人"
                        width="180">
                    <span slot-scope="scope" style="margin-left: 10px">{{ scope.row.recordAuditor }}</span>
                </el-table-column>
                <el-table-column
                        prop="recordTime"
                        label="审核时间"
                        width="180">
                    <span slot-scope="scope" style="margin-left: 10px">{{ scope.row.recordTime }}</span>
                </el-table-column>
                <el-table-column
                        prop="checkState"
                        label="审核状态"
                        width="180">
                    <span slot-scope="scope" style="margin-left: 10px">{{ scope.row.checkState }}</span>
                </el-table-column>
                <el-table-column
                        prop="recordOpinion"
                        label="审核意见"
                        width="180">
                    <span slot-scope="scope" style="margin-left: 10px">{{ scope.row.recordOpinion }}</span>
                </el-table-column>
            </el-table>
        </el-dialog>
    </el-card>
</div>
</template>

<script>
export default {
  data() {
            return {
                updateForm:{
                    checkId : '',
                    recordId : '',
                    recordAuditor : '',
                    recordOpinion : '',
                    checkState : '',
                    recordTime : '',
                },
                typeOptions: [],
                checkStateOptions: [],
                brandOptions: [],
                colorOptions: [],
                firstOption: [],
                secondOption: [],
                lookForm:{},
                queryForm: {},
                checkDialogFormVisible: false,
                lookDialogFormVisible: false,
                formLabelWidth: '120px',
                checkTableData: [],
                tableData: [],
                page: {},
                presentPage: {},
            };
  },
        methods: {
            //审核意见
            updateTrue(){
                this.updateForm.checkState="2";
                this.$axios.put('/PresentCheckRecordHandler', this.updateForm)
                    .then(response => {
                        if(response.code === 20000) {
                            this.$message({
                                message: '审核成功！',
                                type: 'success'
                            });
                            this.query();
                        } else {
                            this.$message.error('审核失败！');}
                    }).catch(error => {
                      console.log(error)
                    this.$message.error('审核异常！');
                });
            },
            updateFalse(){
                this.updateForm.checkState="1";
                this.$axios.put('/PresentCheckRecordHandler', this.updateForm)
                    .then(response => {
                        if(response.code === 20000) {
                            this.$message({
                                message: '审核成功！',
                                type: 'success'
                            });
                            this.query();
                        } else {
                            this.$message.error('审核失败！');}
                    }).catch(error => {
                      console.log(error)
                    this.$message.error('审核异常！');
                });
            },
            handleSizeChange(val) {
                this.query({
                    pageNum: this.page.pageNum,
                    pageSize: val
                })
            },
            // 当前改变----当前页码改变之后，触发这个函数
            handleCurrentChange(val) {
                this.query({
                    pageNum: val,
                    pageSize: this.page.pageSize
                })
            },
            queryEmpty() {
                this.queryForm.goodsName = '';
                this.queryForm.goodsType = '';
                this.queryForm.goodsColor = '';
                this.queryForm.goodsBrand = '';
                this.queryForm.checkState = '';
            },
            query(param) {
                if (param === undefined) param = {}
                Object.assign(param, this.queryForm);
                this.$axios.get('/presentCheck', {
                    params: param
                }).then(response => {
                    if(response.code === 20000){
                        this.tableData = response.data.list;
                        this.page = response.data;
                    }else{
                        this.$message.error('数据查询失败！');
                    }
                }).catch(error => {
                  console.log(error)
                    this.$message.error('服务器连接失败！');
                })
            },
            //查询审核记录表数据
            queryCheck(row) {
                this.$axios.get('/PresentCheckRecordHandler/selectPresentCheckRecordByCheckId/'+row.checkId
                ).then(response => {
                    if(response.code === 20000){
                        this.checkTableData = response.data;
                    }else{
                        this.$message.error('数据查询失败！');
                    }
                }).catch(error => {
                  console.log(error)
                    this.$message.error('服务器连接失败！');
                })
            },
            //改变查询表单类型数据
            handleChange(value){
                this.queryForm.goodsType= value[value.length-1];
            },
            //获取类型数据
            queryType() {
                this.$axios.get('/goodsType/selectTree',
                ).then(response => {
                    if(response.code === 20000){
                        this.$nextTick(() => {this.typeOptions =this.getTreeData(response.data)}); //解决异步问题
                        //将回调函数延迟在下一次dom更新数据后调用，简单的理解是：当数据更新了，在dom中渲染后，自动执行该函数
                    }else{
                        this.$message.error('数据查询失败！');
                    }
                }).catch(error => {
                  console.log(error)
                    this.$message.error('服务器连接失败！');
                })
            },
            //获取审核状态数据
            queryCheckState() {
                this.$axios.get('/presentCheck/getCheckState',
                ).then(response => {
                    if(response.code === 20000){
                        this.checkStateOptions =response.data;
                    }else{
                        this.$message.error('数据查询失败！');
                    }
                }).catch(error => {
                  console.log(error)
                    this.$message.error('服务器连接失败！');
                })
            },
            //获取品牌数据
            queryBrand() {
                this.$axios.get('/present/getBrand',
                ).then(response => {
                    if(response.code === 20000){
                        this.brandOptions =response.data;
                    }else{
                        this.$message.error('数据查询失败！');
                    }
                }).catch(error => {
                  console.log(error)
                    this.$message.error('服务器连接失败！');
                })
            },
            //获取颜色数据
            queryColor() {
                this.$axios.get('/present/getColor',
                ).then(response => {
                    if(response.code === 20000){
                        this.colorOptions =response.data;
                    }else{
                        this.$message.error('数据查询失败！');
                    }
                }).catch(error => {
                  console.log(error)
                    this.$message.error('服务器连接失败！');
                })
            },

            //弹窗取消键
            cancel() {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            },
            //点击每行的查看
            handleLook(row){
                this.lookForm.goodsName =  row.goodsName;
                this.lookForm.goodsNumber =  row.goodsNumber;
                this.lookForm.goodsModelNumber = row.goodsModelNumber;
                this.lookForm.goodsType =  row.goodsType;
                this.lookForm.goodsBrand =  row.goodsBrand;
                this.lookForm.goodsColor =  row.goodsColor;
                this.lookForm.goodsDepartment =  row.goodsDepartment;
                this.lookForm.goodsPrice =  row.goodsPrice;
                this.lookForm.goodsCost =  row.goodsCost;
                this.lookForm.inventoryQuantity =  row.inventoryQuantity;
                this.lookForm.physicalPrice =  row.physicalPrice;
                this.lookForm.checkState =  row.checkState;
                this.updateForm.recordOpinion ="";
                this.updateForm.checkId =row.checkId;
                this.updateForm.checkState ="";
            },
            tableRowClassName ({rowIndex}) {
                if (rowIndex % 2 === 0) {
                    return 'success-row';
                }
                return '';
            },
            getTreeData(data) {
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
        },
  components: {},
  computed: {},
        created() {
            this.query();
            this.queryType();
            this.queryBrand();
            this.queryCheckState();
            this.queryColor();
        },
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