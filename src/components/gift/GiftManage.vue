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
          @click="addDialogFormVisible = true,addPresent()"
        >新增赠品</el-button>
        <el-form-item label="赠品名称">
          <el-input v-model="queryForm.presentName"></el-input>
        </el-form-item>
        <el-form-item label="赠品型号">
          <el-input v-model="queryForm.presentModelNumber"></el-input>
        </el-form-item>
        <el-form-item
          label="赠品类型"
          :label-width="formLabelWidth"
        >
          <el-cascader
            :options="typeOptions"
            :props="{ value: 'typeId', label: 'typeName'}"
            :show-all-levels="false"
            @change="handleChangeQueryType"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item
          label="赠品品牌"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="queryForm.presentBrand"
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
            v-model="queryForm.presentColour"
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
            @click="query()"
          >查询</el-button>
        </el-form-item>
        <el-button
          type="primary"
          @click="queryEmpty"
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
              size="mini"
              type="primary"
              round
              icon="el-icon-search"
              @click="lookDialogFormVisible = true,handleLook(scope.row)"
            >查看
            </el-button>
            <el-button
            v-show="scope.row.presentState=='有效'"
              size="mini"
              type="warning"
              round
              icon="el-icon-edit"
              @click="updateDialogFormVisible = true,handleUpdate(scope.row)"
            >修改
            </el-button>
            <el-button
            v-show="scope.row.presentState=='有效'"
              size="mini"
              type="danger"
              round
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
            >删除
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
            label="赠品名称"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.presentName"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="赠品类型"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.presentType"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="赠品型号"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.presentModelNumber"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="赠品单价"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.presentPrice"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="采购成本"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.presentCost"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="采购部门"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.presentDepartment"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="最低库存量"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.presentMinimumStock"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="赠品颜色"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.presentColour"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="赠品品牌"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="lookForm.presentBrand"
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
        <el-form :model="addForm">
          <el-form-item
            label="赠品名称"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="updateForm.presentName"
              autocomplete="off"
              placeholder="请输入赠品名称"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="赠品类型"
            :label-width="formLabelWidth"
          >
            <el-cascader
              :options="typeOptions"
              :props="{ value: 'typeId', label: 'typeName'}"
              @change="handleChangeUpdateType"
              :show-all-levels="false"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item
            label="赠品型号"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="updateForm.presentModelNumber"
              autocomplete="off"
              placeholder="请输入赠品型号"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="赠品单价"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="updateForm.presentPrice"
              autocomplete="off"
              placeholder="请输入赠品单价"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="采购成本"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="updateForm.presentCost"
              autocomplete="off"
              placeholder="请输入采购成本"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="采购部门"
            :label-width="formLabelWidth"
          >
            <el-select
              v-model="updateForm.presentDepartment"
              placeholder="请选择采购部门"
              style="width: 100%"
            >
              <el-option
                v-for="item in deptOptions"
                :key="item.dic_key"
                :label="item.dic_value"
                :value="item.dic_key"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="最低库存量"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="updateForm.presentMinimumStock"
              autocomplete="off"
              placeholder="请输入采购部门"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="赠品颜色"
            :label-width="formLabelWidth"
          >
            <el-select
              v-model="updateForm.presentColour"
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
            label="赠品品牌"
            :label-width="formLabelWidth"
          >
            <el-select
              v-model="updateForm.presentBrand"
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
        title="新增赠品"
        :visible.sync="addDialogFormVisible"
      >
        <el-form :model="addForm">
          <el-form-item
            label="赠品名称"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addForm.presentName"
              autocomplete="off"
              placeholder="请输入赠品名称"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="赠品类型"
            :label-width="formLabelWidth"
          >
            <el-cascader
              :options="typeOptions"
              :props="{ value: 'typeId', label: 'typeName'}"
              @change="handleChangeAddType"
              :show-all-levels="false"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item
            label="赠品型号"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addForm.presentModelNumber"
              autocomplete="off"
              placeholder="请输入赠品型号"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="赠品单价"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addForm.presentPrice"
              autocomplete="off"
              placeholder="请输入赠品单价"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="采购成本"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addForm.presentCost"
              autocomplete="off"
              placeholder="请输入采购成本"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="采购部门"
            :label-width="formLabelWidth"
          >
            <el-select
              v-model="addForm.presentDepartment"
              placeholder="请选择采购部门"
            >
              <el-option
                v-for="item in deptOptions"
                :key="item.dic_key"
                :label="item.dic_value"
                :value="item.dic_key"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="最低库存量"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addForm.presentMinimumStock"
              autocomplete="off"
              placeholder="请输入最低库存量"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="赠品颜色"
            :label-width="formLabelWidth"
          >
            <el-select
              v-model="addForm.presentColour"
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
            label="赠品品牌"
            :label-width="formLabelWidth"
          >
            <el-select
              v-model="addForm.presentBrand"
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
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
          style="text-align: center"
        >
          <el-button
            type="primary"
            @click="addSubmit(),addDialogFormVisible = false "
          >确 定</el-button>
          <el-button @click="addDialogFormVisible = false,cancel()">取 消</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      typeOptions: [],
      deptOptions: [],
      brandOptions: [],
      colorOptions: [],
      firstClass: '',
      firstSelect: '',
      firstOption: [],
      secondOption: [],
      lookForm: {},
      updateForm: {
        presentId: '',
        presentName: '',
        presentType: '',
        presentColour: '',
        presentBrand: '',
        presentModelNumber: '',
        presentMinimumStock: '',
        presentPrice: '',
        presentCost: '',
        presentDepartment: '',
        presentState: '',
      },
      queryForm: {
        presentId: '',
        presentName: '',
        presentType: '',
        presentColour: '',
        presentBrand: '',
      },
      addDialogFormVisible: false,
      lookDialogFormVisible: false,
      updateDialogFormVisible: false,
      addForm: {
        presentId: '',
        presentName: '',
        presentType: '',
        presentColour: '',
        presentBrand: '',
        presentModelNumber: '',
        presentMinimumStock: '',
        presentPrice: '',
        presentCost: '',
        presentDepartment: '',
        presentState: '',
      },
      formLabelWidth: '120px',
      value: [],
      formInline: { user: '', region: '', },
      tableData: [],
      page: {},
  };
},
methods: {
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
    this.queryForm.presentColour = '';
    this.queryForm.presentBrand = '';
    this.queryForm.presentColour = '';
    this.queryForm.presentModelNumber = '';
    this.queryForm.presentName = '';
    this.queryForm.presentType = '';
  },
  query(param) {
    if (param === undefined) param = {}
    Object.assign(param, this.queryForm);
    this.$axios.get('/present', {
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
  //改变新增表单类型数据
  handleChangeAddType(value){
    this.addForm.presentType = value[value.length - 1];
  },
  //改变查询表单类型数据
  handleChangeQueryType(value){
    this.queryForm.presentType = value[value.length - 1];
  },
  //改变修改表单类型数据
  handleChangeUpdateType(value){
    this.updateForm.presentType = value[value.length - 1];
  },
  //获取部门数据
  queryPresentDepartment() {
    this.$axios.get('/present/getDepartment',
    ).then(response => {
      if (response.code === 20000) {
        this.deptOptions = response.data;
      } else {
        this.$message.error('数据查询失败！');
      }
    }).catch(error => {
      console.log(error)
      this.$message.error('服务器连接失败！');
    })
  },
  //获取品牌数据
  queryPresentBrand() {
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
  queryPresentColor() {
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
  //获取类型数据
  queryPresentType() {
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
  addSubmit() {
    this.$axios.post('/present/addPresent', this.addForm).then(response => {
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
  update() {
    this.$axios.put('../present', this.updateForm)
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
  cancel() {
    this.$message({
      type: 'info',
      message: '已取消操作'
    });
  },
  addPresent() {
    this.addForm.presentId = '';
    this.addForm.presentName = '';
    this.addForm.presentModelNumber = '';
    this.addForm.presentType = '';
    this.addForm.presentMinimumStock = '';
    this.addForm.presentPrice = '';
    this.addForm.presentCost = '';
    this.addForm.presentDepartment = '';
    this.addForm.presentColour = '';
    this.addForm.presentBrand = '';
    this.addForm.presentState = '';
  },
  //点击每行的查看
  handleLook(row){
    this.$axios.get('/present/selectPresentById/' + row.presentId
    ).then(response => {
      if (response.code === 20000) {
        this.lookForm = response.data;
      } else {
        this.$message.error('数据查询失败！');
      }
    }).catch(error => {
            console.log(error)

      this.$message.error('服务器连接失败！');
    })

  },
  //点击每行的修改
  handleUpdate(row){
    this.updateForm.presentId = row.presentId;
    this.updateForm.presentName = row.presentName;
    this.updateForm.presentModelNumber = row.presentModelNumber;
    this.updateForm.presentType = "";
    this.updateForm.presentMinimumStock = row.presentMinimumStock;
    this.updateForm.presentPrice = row.presentPrice;
    this.updateForm.presentCost = row.presentCost;
    this.updateForm.presentDepartment = "";
    this.updateForm.presentColour = "";
    this.updateForm.presentBrand = "";
    this.updateForm.presentState = "";
  },
  //点击每行的删除
  handleDelete(row) {
    this.$confirm('此操作将永久删除,是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$axios.put("/present/updateState/" + row.presentId)
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
  tableRowClassName({rowIndex }) {
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
computed: { },
created() {
  this.query();
  this.queryPresentType();
  this.queryPresentColor();
  this.queryPresentDepartment();
  this.queryPresentBrand();
},
mounted() { }
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