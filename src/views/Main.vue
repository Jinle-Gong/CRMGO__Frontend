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
          <el-menu id="menubar" mode="vertical" style="max-height:100px;" :default-active="this.$route.path" router>
            <el-menu-item index="/main">
              <i class="el-icon-house"></i>
              <span slot="title">首页</span>
            </el-menu-item>

            <el-submenu v-for="menu in menus" :index='menu.mid+""' :key="menu.mid">

              <template slot="title">
                  <span>{{menu.menuName}}</span>
              </template>

              <!--遍历二级菜单 -->
              <div v-for="secMenu in menu.children" :key="secMenu.mid" :index="secMenu.mid+''">
                <div v-if="secMenu.children.length!=0">
                  <el-submenu :index="secMenu.mid+''">
                    <template slot="title">
                      <span>{{secMenu.menuName}}</span>
                    </template>

                    <el-menu-item v-for="trdMenu in secMenu.children" :key="trdMenu.mid" :index="trdMenu.menuUrl">
                      {{ trdMenu.menuName }}
                    </el-menu-item>
                  </el-submenu>
                </div>

                <div v-else>
                  <el-menu-item :key="secMenu.mid" :index="secMenu.menuUrl">
                    {{secMenu.menuName}}
                  </el-menu-item>
                </div>
              </div>

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
      menus:[]
    }
  },
  methods: {
    changePassword () {
      this.$router.push({ path: '/main/changePassword' })
    },
    getMenus () {
      this.$axios.get("/getMenus").then(res=>{
        console.log(res)
        this.menus = res.data;
      })
     },
    logout () {
      this.$router.push("/");//跳转到登录页面
      //登出，发送请求到后端，将token加入黑名单
      this.$axios.get("/logout")
      localStorage.removeItem("token");
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
