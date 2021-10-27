<template>
  <div id="main">
    <el-container>
      <!-- 顶部 -->
      <el-header height="130px">
        <el-row>
          <el-col :span="3" >
            <!-- <img src="../assets/OIP.jpg" width="110px" height="85px" style="padding-top: 15px;margin-left:10px"> -->
            <img src="../assets/logo.png" width="200px" height="100" style="padding-top: 15px;">
          </el-col>
          <el-col :span="18">
            <div class="title">
            <span >天翼电子商务进销存系统</span><br>
            <span>Electronic Business Invoicing System</span>
            </div>
          </el-col>

          <el-col :span="3" style="margin-top:40px" >
            <el-dropdown>
              <el-button>
                <i class="el-icon-user-solid"></i>&nbsp;admin&nbsp;<i
                class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item ><a @click="changePassword">修改密码</a></el-dropdown-item>
                    <el-dropdown-item><a @click="logout">退出</a></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>

      <el-container>
        <el-aside width="250px">

      <!-- <el-row>
        <el-header style="padding: 0px;"> -->

        <div class="nevigationBar">
        <!-- 设置顶部菜单的最大高度以避免菜单栏太高 -->
          <el-menu id="menubar" mode="vertical" style="max-height:100px;" :default-active="this.$route.path" router>

            <el-menu-item index="/main">
              <i class="el-icon-house"></i>
              <span slot="title">首页</span>
            </el-menu-item>

            <el-submenu index="1">
              <template slot="title"><i class="el-icon-goods"></i>商品与赠品管理</template>
              <el-submenu index="1-1">
                <template slot="title">商品管理</template>
                <el-menu-item v-for="(item,i) in goodList" :key="i" :index="item.name">
                    {{ item.navItem }}
                </el-menu-item>
              </el-submenu>

              <el-submenu index="1-2">
                <template slot="title">赠品管理</template>
              <el-menu-item v-for="(item,i) in giftList" :key="i" :index="item.name">
                  {{ item.navItem }}
              </el-menu-item>
              </el-submenu>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-shopping-cart-2"></i>
                <span>B2C销售管理</span>
              </template>
              <el-menu-item v-for="(item,i) in bTcSale" :key="i" :index="item.name">
                  {{ item.navItem }}
              </el-menu-item>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title"><i class="el-icon-service"></i>售后管理</template>
              <el-submenu index="3-1">
                <template slot="title">B2C售后管理</template>
                <el-menu-item v-for="(item,i) in bTcAfterSale" :key="i" :index="item.name">
                    {{ item.navItem }}
                </el-menu-item>
              </el-submenu>

              <el-submenu index="3-2">
                <template slot="title">B2C退货审核</template>
                <el-menu-item v-for="(item,i) in bTcReturn" :key="i" :index="item.name">
                    {{ item.navItem }}
                </el-menu-item>
              </el-submenu>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>系统管理</span>
              </template>
              <el-menu-item v-for="(item,i) in systemList" :key="i" :index="item.name">
                  {{ item.navItem }}
              </el-menu-item>
            </el-submenu>

            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-notebook-1"></i>
                <span>日志管理</span>
              </template>
              <el-menu-item v-for="(item,i) in logList" :key="i" :index="item.name">
                  {{ item.navItem }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </div>

      </el-aside>

        <el-main>
          <div id="showComponent">
            <router-view></router-view>
          </div>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Main",
  data () {
    return {
      systemList:[
        {name:'/main/userManage',navItem:'用户管理'},
        {name:'/main/roleManage',navItem:'角色管理'},
        {name:'/main/authManage',navItem:'权限管理'},
        {name:'/main/deptManage',navItem:'部门管理'},
      ],
      goodList:[
        {name:'/main/',navItem:'商品管理'},
        {name:'/main/',navItem:'品牌管理'},
        {name:'/main/',navItem:'类型管理'},
        {name:'/main/',navItem:'供应商管理'},
        {name:'/main/',navItem:'价格调整管理'},
        {name:'/main/',navItem:'价格调整审核'},
      ],
      giftList:[
        {name:'/main/',navItem:'赠品转商品'},
        {name:'/main/',navItem:'赠品转商品审核'},
        {name:'/main/',navItem:'商品转赠品'},
        {name:'/main/',navItem:'商品转赠品审核'},
      ],
      bTcSale:[
        {name:'/main/',navItem:'B2C销售订单查询'},
        {name:'/main/',navItem:'B2C出库管理'},
      ],
      bTcAfterSale:[
        {name:'/main/',navItem:'B2C售后管理'},
        {name:'/main/',navItem:'退货'},
        {name:'/main/',navItem:'售后维修'},
      ],
      bTcReturn:[
        {name:'/main/',navItem:'返厂出库管理'},
        {name:'/main/',navItem:'返厂出库审核'},
        {name:'/main/',navItem:'返厂入库管理'},
        {name:'/main/',navItem:'返厂入库审核'},
      ],
      logList:[
        {name:'/main/',navItem:'用户日志'},
        {name:'/main/',navItem:'商品日志'},
        {name:'/main/',navItem:'字典项管理'},
      ],
      menuList:[]
    }
  },
  methods: {
    changePassword () {
      this.$router.push({ path: '/main/changePassword' })
    },
    getMenus () {
      this.$axios.get("/getMenus").then(res=>{
        console.log(res);

      })
     },
    logout () {
      this.$router.push("/");//跳转到登录页面
      //登出，发送请求到后端，将token加入黑名单
      this.$axios.post("/logout").then(res=>{
        console.log(res);
        localStorage.removeItem("token");
      })
    },
  },

  computed: {
    //刷新页面时，需要从sessionStorage中提取状态再传值给vuex, 以此来获取isLogin的状态
    isLogin () {
      if (sessionStorage.getItem("loginUser")) {
        this.$store.commit("userStatus", sessionStorage.getItem("loginUser"));
      } else {
        this.$store.commit("userStatus", null);
      }
      return this.$store.getters.isLogin;
    }
  },
  created () {
    // 如果未登录，直接跳到登录页面
    if (sessionStorage.getItem("loginUser") == "null") {
      this.$router.push("/")
    }
    this.getMenus()
  }
}

</script>

<style scoped>
html,
body {
  height: 100%;
  margin: 0px;
}

.el-menu {
  border-right: 0 !important;
}
#main {
  height: 100%;
  /* width: 90%; */
  /* background: url("../assets/sky1.jpg") no-repeat;
    background-size: 100% 100% ;
    background-attachment: fixed; */
}

a {
  text-decoration: none;
}

.el-container {
  height: 100%;
}

.el-header {
  background-color: #D0D0D0;
  color: #333;
  text-align: center;
  line-height: 28px;
  font-family: "微软雅黑";
  font-weight:bold;
  font-size: large;
  /* color: white; */
  text-align: left;
}

.el-aside {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 0px;
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

.el-submenu,
.el-menu-item {
  text-align: left;
}

.el-dropdown {
  vertical-align: top;
}

.el-dropdown + .el-dropdown {
  margin-left: 15px;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.title{
  margin-top: 45px;
  margin-left: 20px;
}

/* #showComponent{  在各个componnet的内部调整显示的style
    margin-left: 20%;
    margin-top: 20%;
  } */

.nevigationBar{
  margin-left: 8%;
  font-weight: bold;
}

.el-menu.el-menu--horizontal {
    border-bottom: 0px;
}
</style>
