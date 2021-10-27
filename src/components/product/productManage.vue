<template>
  <div id="app">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">商品与赠品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品信息列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
    >
      <el-form-item label="商品编码">
        <el-input
          v-model="formInline.gcode"
          placeholder="请输入编码"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品型号">
        <el-input
          v-model="formInline.gmodel"
          placeholder="请输入产品型号"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品颜色">
        <el-select
          v-model="formInline.gcolor"
          placeholder="全部"
        >
          <el-option>无</el-option>
          <el-option
            v-for="item in options"
            :key="item.dic_key"
            :label="item.dic_value"
            :value="item.dic_value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品品牌">
        <el-select
          v-model="formInline.gbrand"
          placeholder="全部"
        >
          <el-option>无</el-option>
          <el-option
            v-for="item in options2"
            :key="item.dic_key"
            :label="item.dic_value"
            :value="item.dic_value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-select
          v-model="formInline.gsort"
          placeholder="全部"
        >
          <el-option>无</el-option>
          <el-option
            v-for="item in options3"
            :key="item.dic_key"
            :label="item.dic_value"
            :value="item.dic_value"
          >
          </el-option>

        </el-select>
      </el-form-item>

      <!--<option value="双网双待手机">双网双待手机</option>-->
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit1"
        >搜索</el-button>
        <el-button
          type="primary"
          @click="createproduct"
        >创建商品</el-button>
      </el-form-item>
    </el-form>

    <template>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column
          prop="gid"
          label="序号"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="gname"
          label="商品名称"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="gsort"
          label="商品分类"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="gbrand"
          label="商品品牌"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="gmodel"
          label="商品型号"
          width="300"
        >
        </el-table-column>
        <el-table-column
          prop="gcolor"
          label="商品颜色"
          width="120"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="800"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handlewatch(scope.$index, scope.row), dialogTableVisible = true"
            >查看
            </el-button>
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row), dialogTableVisible2 = true"
            >修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="dialogTableVisible3=true"
            >删除
            </el-button>
            <el-button
              size="mini"
              @click="handleSelect(scope.$index, scope.row),handleCurrentChange2"
            >选择商品类型
            </el-button>
            <el-dialog
              title="警告"
              :visible.sync="dialogTableVisible3"
            >
              <p>你确定要删除吗</p>
              <div
                slot="footer"
                class="dialog-footer"
              >
                <el-button @click="dialogTableVisible3=false">取 消</el-button>
                <el-button
                  type="primary"
                  @click="handleDelete(scope.$index, scope.row),dialogTableVisible3=false"
                >确 定
                </el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
        <!--<template slot-scope="scope">-->
        <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
        <!--<el-button type="text" size="small">编辑</el-button>-->
        <!--</template>-->
      </el-table>
    </template>
    <template>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[2, 3, 4, 5]"
          :page-size="everyPageNum"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNum"
        >
        </el-pagination>
      </div>
    </template>
    <el-dialog
      title="一类商品详情"
      :visible.sync="dialogTableVisible"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="200px"
      >
        <el-form-item label="存货档案编码:">
          <el-input
            v-model="form.gcode"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="基础库-分类:">
          <el-input
            v-model="form.gsort"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="基础库品牌:">
          <el-input
            v-model="form.gbrand"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="基础库-型号:">
          <el-input
            v-model="form.gmodel"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="基础库-颜色:">
          <el-input
            v-model="form.gcolor"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="基础库-采购模式:">
          <el-input
            placeholder="集团采购"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="基础库-铺货:">
          <el-input
            placeholder="非铺货"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="基础库-备机:">
          <el-input
            placeholder="非铺货"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品名称:">
          <el-input
            v-model="form.gname"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品类型:">
          <el-input
            v-model="form.gtype"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="市场价:">
          <el-input
            v-model="form.gmarketprize"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="商城价:">
          <el-input
            v-model="form.gmallprize"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="最低库存量:">
          <el-input
            v-model="form.gminsum"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否可采购:">
          <el-input
            v-model="form.gifBuy"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-form>

    </el-dialog>
    <el-dialog
      title="修改一类商品"
      :visible.sync="dialogTableVisible2"
    >
      <el-form
        ref="form"
        :model="form2"
        label-width="200px"
      >
        <el-form-item label="存货档案编码:">
          <el-input
            v-model="form2.gcode"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="基础库-分类:">
          <el-input
            v-model="form2.gsort"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="基础库品牌:">
          <el-input
            v-model="form2.gbrand"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="基础库-型号:">
          <el-input
            v-model="form2.gmodel"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="基础库-颜色:">
          <el-input
            v-model="form2.gcolor"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="基础库-采购模式:">
          <el-input
            placeholder="集团采购"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="基础库-铺货:">
          <el-input
            placeholder="非铺货"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="基础库-备机:">
          <el-input
            placeholder="非铺货"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品名称:">
          <el-input
            v-model="form2.gname"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品类别:">
          <el-cascader
            :options="everytype"
            v-model="form2.gtype"
            :props="{ checkStrictly: true }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="市场价:">
          <el-input v-model="form2.gmarketprize"></el-input>
        </el-form-item>
        <el-form-item label="商城价:">
          <el-input v-model="form2.gmallprize"></el-input>
        </el-form-item>
        <el-form-item label="最低库存量:">
          <el-input v-model="form2.gminsum"></el-input>
        </el-form-item>
        <el-form-item label="是否可采购:">
          <el-select
            v-model="form2.gifBuy"
            placeholder=""
          >
            <el-option
              label="可采购"
              value="可采购"
            ></el-option>
            <el-option
              label="不可采购"
              value="不可采购"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        @click="onSubmit3"
      >保存</el-button>
    </el-dialog>
    <el-dialog
      title="创建一类商品"
      :visible.sync="dialogTableVisible5"
    >
      <el-form
        ref="form"
        :model="form3"
        label-width="200px"
      >
        <el-form-item label="存货档案编码:">
          <el-input
            v-model="form3.gcode"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="基础库-分类:">
          <el-input
            v-model="form3.gsort"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="基础库品牌:">
          <el-input
            v-model="form3.gbrand"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="基础库-型号:">
          <el-input
            v-model="form3.gmodel"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="基础库-颜色:">
          <el-input
            v-model="form3.gcolor"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="基础库-采购模式:">
          <el-input
            placeholder="集团采购"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="基础库-铺货:">
          <el-input
            placeholder="非铺货"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="基础库-备机:">
          <el-input
            placeholder="非铺货"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品名称:">
          <el-input
            v-model="form3.gname"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品类别:">
          <el-cascader
            :options="everytype"
            v-model="form3.gtype"
            :props="{ checkStrictly: true }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="市场价:">
          <el-input v-model="form3.gmarketprize"></el-input>
        </el-form-item>
        <el-form-item label="商城价:">
          <el-input v-model="form3.gmallprize"></el-input>
        </el-form-item>
        <el-form-item label="最低库存量:">
          <el-input v-model="form3.gminsum"></el-input>
        </el-form-item>
        <el-form-item label="是否可采购:">
          <el-select
            v-model="form3.gifBuy"
            placeholder=""
          >
            <el-option
              label="可采购"
              value="可采购"
            ></el-option>
            <el-option
              label="不可采购"
              value="不可采购"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        @click="onSubmit4"
      >保存</el-button>
    </el-dialog>
    <el-dialog
      title="警告"
      :visible.sync="dialogTableVisible4"
    >
      <p>请先选择商品类型</p>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogTableVisible4=false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogTableVisible4=false"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {

      formInline: {
        gcode: '',
        gmodel: '',
        gcolor: '',
        gbrand: '',
        gsort: '',
      },
      options: '',
      options2: '',
      options3: '',
      tableData: '',
      currentPage4: '',
      totalNum: '',
      everyPageNum: 3,
      gridData: '',
      dialogTableVisible: false,
      form: {
        gcode: "",
        gmodel: '',
        gcolor: '',
        gbrand: '',
        gsort: '',
        gtype: '',
        gmarketprize: '',
        gmallprize: "",
        gminsum: '',
        gifBuy: '',
      },
      form2: {
        gcode: "",
        gmodel: '',
        gcolor: '',
        gbrand: '',
        gsort: '',
        gtype: '',
        gmarketprize: '',
        gmallprize: "",
        gminsum: '',
        gifBuy: '',
        gname: '',
      },
      everytype: {
        value: '',
        label: '',
        children: '',
      },
      dialogTableVisible2: false,
      dialogTableVisible3: false,
      dialogTableVisible4: false,
      dialogTableVisible5: false,
      htmlgid: '',
      currentRow: null,
      form3: {
        gcode: "",
        gmodel: '',
        gcolor: '',
        gbrand: '',
        gsort: '',
        gtype: '',
        gmarketprize: '',
        gmallprize: "",
        gminsum: '',
        gifBuy: '',
      },


    };
  },
  methods: {
    onSubmit1 () {
      var s = this.$qs.stringify(this.formInline);
      this.$axios.get('../product/selectParent?' + s)
        .then(response => {
          if (response.code == 20000) {
            this.tableData = response.data.list;
            this.totalNum = response.data.total;
            this.currentPage4 = response.data.pageNum;
            this.everyPageNum = response.data.pageSize;
          }
        }).catch(function (error) {
          console.log(error)
        })
    },
    createproduct () {
      if (this.htmlgid == '') {
        this.dialogTableVisible4 = true;
      } else {
        this.dialogTableVisible5 = true;
        this.$axios.get('../product/goodstype')
          .then(response => {
            console.log(response)
            console.log(response.data);
            if (response.code == 20000) {
              this.everytype = response.data;
            }
          }).catch(function (error) {
            console.log(error)

          })
      }

    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
      this.everyPageNum = val;
      var s = this.$qs.stringify(this.formInline);
      this.$axios.get('../product/selectParent?' + s + "&pageSize=" + this.everyPageNum + "&currentPage=" + this.currentPage4)
        .then(response => {
          if (response.code == 20000) {
            this.tableData = response.data.list;
            this.totalNum = response.data.total;
            this.currentPage4 = response.data.pageNum;
            this.everyPageNum = response.data.pageSize;
          }
        }).catch(function (error) {
          console.log(error)

        })

    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.currentPage4 = val;
      var s = this.$qs.stringify(this.formInline);
      this.$axios.get('../product/selectParent?' + s + "&pageSize=" + this.everyPageNum + "&currentPage=" + this.currentPage4)
        .then(response => {
          if (response.code == 20000) {
            this.tableData = response.data.list;
            this.totalNum = response.data.total;
            this.currentPage4 = response.data.pageNum;
            this.everyPageNum = response.data.pageSize;
          }
        }).catch(function (error) {
          console.log(error)

        })
    },
    handlewatch (index, row) {
      console.log(index, row);
      this.form = row;
    },
    handleEdit (index, row) {
      console.log(index, row);
      this.form2 = row;
      // this.form2.gname=row.gtype[length-1]+row.gcolor;
      this.$axios.get('../product/goodstype')
        .then(response => {
          console.log(response)
          console.log(response.data);
          if (response.code == 20000) {
            this.everytype = response.data;
          }
        }).catch(function (error) {
          console.log(error)

        })

    },
    handleDelete (index, row) {
      this.$axios.get('../product/deleteproduct?gid=' + row.gid + "&pageSize=" + this.everyPageNum + "&currentPage=" + this.currentPage4)
        .then(response => {
          if (response.code == 20000) {
            this.totalNum = response.data.total;
            this.currentPage4 = response.data.pageNum;
            this.everyPageNum = response.data.pageSize;
          }
        }).catch(function (error) {
          console.log(error)

        }),
        this.onSubmit1();
    },
    onSubmit3 () {
      var gtype = this.form2.gtype;
      this.form2.gtype = gtype[gtype.length - 1];
      var s = this.$qs.stringify(this.form2);
      console.log(s);
      this.$axios.post('../product/update', this.form2)
        .then(response => {
          if (response.data.code == 20000) {
            this.everytype = response.data;
          }
        }).catch(function (error) {
          console.log(error)

        })

    },
    handleSelect (index, row) {
      this.htmlgid = row.gid;
      this.form3.gcode = row.gcode;
      this.form3.gsort = row.gsort;
      this.form3.gbrand = row.gbrand;
      this.form3.gmodel = row.gmodel;
      this.form3.gcolor = row.gcolor;
      this.form3.gtype = row.gtype;
    },
    handleCurrentChange2 (val) {
      console.log(val)
      this.htmlgid = val.gid;
      console.log(this.htmlgid);
      this.form3.gcode = val.gcode;
      this.form3.gsort = val.gsort;
      this.form3.gbrand = val.gbrand;
      this.form3.gmodel = val.gmodel;
      this.form3.gcolor = val.gcolor;
      this.form3.gtype = val.gtype;
    },
    onSubmit4 () {
      this.dialogTableVisible5 = false
      var gtype = this.form3.gtype;
      this.form3.gtype = gtype[gtype.length - 1];
      var s = this.$qs.stringify(this.form3);
      this.$axios.get('../product/insertproduct?' + s)
        .then(response => {
          if (response.code == 20000) {
            this.totalNum = response.data.total;
            this.currentPage4 = response.data.pageNum;
            this.everyPageNum = response.data.pageSize;
          }
        }).catch(function (error) {
          console.log(error)

        })
    }
  },
  created () {

    this.$axios.get('../product/selectParent')
      .then(response => {
        if (response.code == 20000) {
          this.tableData = response.data.list;
          this.totalNum = response.data.total;
          this.currentPage4 = response.data.pageNum;
          this.everyPageNum = response.data.pageSize;
        }
      }).catch(function (error) {
        console.log(error)

      }
      ),
      this.$axios.get('../product/color')
        .then(response => {
          if (response.code == 20000) {
            this.options = response.data;//得到数据的json格式的值；
          }
        }).catch(function (error) {
          console.log(error)

        }),
      this.$axios.get('../product/brand')
        .then(response => {
          if (response.code == 20000) {
            this.options2 = response.data;
          }
        }).catch(function (error) {
          console.log(error)

        }),
      this.$axios.get('../product/sort')
        .then(response => {
          if (response.code == 20000) {
            this.options3 = response.data;
          }
        }).catch(function (error) {
          console.log(error)

        })
  },
}
</script>

<style scoped>
</style>