import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from './utils/http'

import qs from 'qs'
import store from './store'
Vue.config.productionTip = false;

// 通过全局方法 Vue.use() 使用插件。它需要在你调用 new Vue() 启动应用之前完成：
Vue.use(ElementUI)
Vue.prototype.$qs = qs;
Vue.prototype.$axios = axios;

/**
 * main.js是项目的入口文件， 定义了vue实例， 并引入根组件App.vue， 
 * 将其挂载到index.html中id为'app' 的节点上。
 * 在index.js的代码中， 建立了路由相关的内容，
 * 也就会渲染到App.vue下面的 <router-view> 中
 */

new Vue({
       el: '#app', //挂载点
       //render函数渲染一个视图，然后提供给el挂载
       render: h => h(App), //App 为根组件
       router,
       store,
       template: '<App/>'
})
