<!--  -->
<template>
<div id="app">
    <template>
        <el-card class="box-card">

            <el-form :inline="true" :model="logForm" ref="logForm" >
                <el-form-item label="访问用户名" prop="userName">
                    <el-input v-model="logForm.userName" placeholder="用户名"></el-input>
                </el-form-item>

                <el-form-item label="访问模块" prop="userModel">
                    <el-select v-model="logForm.userModel" placeholder="请选择">
                        <el-option label="用户模块" value="用户模块"></el-option>
                        <el-option label="商品模块" value="商品模块"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="操作内容" prop="userMethod">
                    <el-select v-model="logForm.userMethod" placeholder="请选择">
                        <el-option label="查询" value="查询"></el-option>
                    </el-select>
                </el-form-item>

                <span>订单时间</span>
                <el-date-picker
                        v-model="targetTime"
                        type="daterange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd 00:00:00">
                </el-date-picker>
                <el-form-item>
                    <el-button type="primary" @click="queryByType">查询</el-button>
                    <el-button type="success" @click="resetForm('logForm')">重置</el-button>
                </el-form-item>
            </el-form>

            <el-table
                    :data="tableData"
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
                <el-table-column
                        prop="id"
                        label="序号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="操作时间"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="userName"
                        label="访问用户名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="userModel"
                        label="访问模块"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="userMethod"
                        label="操作内容"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="userIp"
                        label="访问ip"
                        width="180">
                </el-table-column>
            </el-table>

            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="currentPage"
                               :page-sizes="[2, 3, 4, 5]" :page-size="pageSize"
                               layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>

        </el-card>
    </template>
</div>
</template>

<script>
export default {
 data() {
            return {
                currentPage:{},
                pageSize:{},
                total:{},
                tableData: [],
                logForm: {
                    userName: '',
                    userModel: '',
                    userMethod: ''
                },
                targetTime: [],
            }
        },
 methods: {
            tableRowClassName({rowIndex}) {
                if (rowIndex % 2 == 1) {
                    return 'success-row';
                }
                return '';
            },
            resetForm(formName) {
                this.targetTime = [];
                this.$refs[formName].resetFields();
            },
            query(param) {
                this.$axios.get('/log/selectAll',{
                    params: param
                }).then(response => {
                    console.log(response)
                        if (response.code === 20000) {
                            this.total=response.data.total;
                            this.pageSize=response.data.pageSize;
                            this.currentPage=response.data.pageNum;
                            this.tableData = response.data.list;
                        } else {
                            this.$message({
                                type: 'info',
                                message: '查询失败,未查到有效数据'
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
            queryByType() {
                var beginTime = this.targetTime[0]
                var endTime = this.targetTime[1]
                var param = {
                    "userName": this.logForm.userName,
                    "userModel": this.logForm.userModel,
                    "userMethod": this.logForm.userMethod,
                    "beginTime": beginTime,
                    "endTime": endTime,
                    'page': "1",
                    'pageSize': this.pageSize
                };
                console.log(param)
                this.query(param);
            },

            handleSizeChange(val) {
                this.query({
                    'page': "1",
                    'pageSize': val
                })
            },
            handleCurrentChange(val) {
                this.query({
                    'page': val,
                    'pageSize': this.pageSize
                })

            },
        },
  created() {
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
</style>