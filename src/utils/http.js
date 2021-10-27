import router from '../router'
import axios from 'axios'

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'http://localhost:8080';

axios.interceptors.request.use(function (config) {
  let url = config.url;
  if (url == '/loginByPhone' || url == '/valCode' || url == "/loginByPassword"){
    return config;
  }else{
    let token = localStorage.getItem('token');
    //每次请求时，携带token. 如果token = null，说明没有登录，跳转页面
    if (token != null) {
      config.headers['token'] = localStorage.getItem('token');
    } else {
      router.push("/");
    }
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

//axios请求后
axios.interceptors.response.use(function (response) {
  let data = response.data;
  if (data.code == 52000) {
    //token失效
    router.push("/");
  }
  //登录时，token会在响应头中,将token保存
  if ('token' in response.headers) {
    let token = response.headers['token'];
    localStorage.setItem("token", token);
  }
  return data;
}, function (error) {
  return Promise.reject(error);
});

export default axios;