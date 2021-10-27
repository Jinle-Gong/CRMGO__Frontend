<template>
  <div id='main'>
    <!-- :model="form" 绑定一个对象, form表单提交给后台时，将提交这个对象 -->
    <!-- :rules="rules" 是动态绑定的rules，表单验证规则 -->
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      class="login-box"
    >
      <h3
        class="login-title"
        style="margin:0 auto 0px auto"
      >欢迎登录</h3>

      <div style="margin:10px 0px 10px 25px">
        <el-button
          id="passwordLogin"
          @click="password=true"
          type="text"
          :disabled="password"
        >密码登录</el-button>
        <el-button
          id="phoneLogin"
          @click="password=false"
          type="text"
          :disabled="!password"
        >手机登录</el-button>
      </div>

      <div v-show="password">
        <el-form-item
          label="账号"
          prop="username"
        >
          <el-input
            type="text"
            placeholder="请输入账号"
            v-model="form.username"
          />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="form.password"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
      </div>

      <!-- 使用手机号码登录 -->
      <div v-show="!password">
        <el-form-item label="手机号">
          <el-input
            type="text"
            placeholder="请输入手机号"
            v-model="formII.uphone"
          />
        </el-form-item>

        <el-form-item label="验证码">

          <el-input
            type="text"
            placeholder="请输入验证码"
            v-model="formII.valCode"
            style="width:62%"
            @keyup.enter.native="onSubmit"
          />
          <el-button
            v-show="sendAuthCode"
            @click="getAuthCode"
          >获取验证码</el-button>
          <el-button
            v-show="!sendAuthCode"
            style="width:34%"
            disabled
          >{{authTime}} s</el-button>
        </el-form-item>

      </div>

      <el-form-item id="buttons">
        <el-button
          type="primary"
          v-on:click="onSubmit"
        >登录</el-button>
        <el-button type="success">注册</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: "Login",
  data () {
    return {
      sendAuthCode: true,
      authTime: 0,
      password: true,
      phone: false,
      form: {
        username: '',
        password: ''
      },
      formII: {
        uphone: "",
        valCode: "",
      },
      // 在el-form中绑定的rules，进行表单的验证
      rules: {
        // 我们在el-form-item中绑定的prop属性，需要具有唯一性
        username: [
          { required: true, message: '账号不可为空', trigger: 'blur' }
          // require:是否必填，如不设置，则会根据校验规则自动生成;message:是提示的内容；trigger：是什么事件触发
        ],
        password: [
          { required: true, message: '密码不可为空', trigger: 'blur' }
        ]
      },
      // 对话框显示和隐藏
      dialogVisible: false
    }
  },
  methods: {
    getAuthCode () {
      //发送请求，获取验证码
      if(this.formII.uphone == ""){
        this.$message.error('请输入电话号码');
      }else{
        this.$axios.post('/valCode', this.$qs.stringify({uphone:this.formII.uphone})).then(res => {
          console.log(res)
          if (res.code == 50000) {
            this.$message.error('系统出错，获取验证码失败');
          }
        })
        this.sendAuthCode = false;
        this.authTime = 60;
        var auth_timer = setInterval(() => {
          this.authTime--;
          if (this.authTime <= 0) {
            this.sendAuthCode = true;
            clearInterval(auth_timer);
          }
        }, 1000);
      }
    },
    onSubmit () {
      //如果是使用账号密码登录，使用form
      if (this.password) {
        this.$axios.post('/loginByPassword', this.form)
          .then(res => {
            if (res.code == 20001) {
              let loginUser = res.data.username;
              sessionStorage.setItem("user", JSON.stringify(loginUser));
              this.$store.dispatch('setUser', loginUser)
              this.$router.push("/main");//跳转到主页面
            } else {
              this.$message.error('用户名或者密码错误，请重新输入');
            }
          }).catch(function (error) {
            console.log(error);
          });
      } else {
        this.$axios.post('/loginByPhone', this.formII)
          .then(res => {
            if (res.code == 20001) {
              let loginUser = res.data.username;
              sessionStorage.setItem("user", JSON.stringify(loginUser));
              this.$store.dispatch('setUser', loginUser)
              this.$router.push("/main");//跳转到主页面
            } else {
              this.$message.error('手机号或验证码有误，请重新输入');
            }
          }).catch(function (error) {
            console.log(error);
          });
      }
    },

    beforeRouteEnter (to, from, next) {
      // 已登录状态回到登录界面，即为登出
      next(vm => {
        vm.$store.dispatch("setUser", null);
      });
    }
  }
}
</script>

<style scoped>
#main {
  width: 100%;
  height: 100%;
  margin: 0;
  background: url('../assets/b3.jpg') no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  border: 1px solid white;
}

.login-box {
  /* border: 1px solid #DCDFE6; */
  width: 380px;
  margin: 250px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
#buttons {
  margin-left: 10%;
}
/* >>> .el-input__inner{
    BACKGROUND-COLOR: transparent;
  } */
</style>