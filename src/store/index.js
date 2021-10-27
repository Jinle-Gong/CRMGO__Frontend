import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null, // 当前用户
    isLogin: false, //判断当前用户是否已经登录
    // token: '', //保存用户登录后持有的token
  },
  mutations: {
    userStatus(state, user) {
      if (user) {
        state.currentUser = user
        state.isLogin = true
      } else if (user == null) {
        // 登出的时候，清空session storage里的信息
        sessionStorage.setItem("userName", null);
        // sessionStorage.setItem("userToken", "");
        state.currentUser = null;
        state.isLogin = false;
        // state.token = "";
      }
    }
  },
  actions: {
    setUser(user) {
      this.commit("userStatus", user)
    }
  },
  getters: {
    isLogin(state) {
      return state.isLogin;
    },
    currentUser(state) {
      return state.currentUser
    }
  }
})