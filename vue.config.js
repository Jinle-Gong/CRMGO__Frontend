module.exports = {
  devServer: {
    // 跨域
    port: 6060,
    proxy: 'http://192.168.14.198:8080',
    host: "0.0.0.0",

    publicPath: './',
    baseUrl: './', //加 ./ 解决404问题
    outputDir: 'dist',
    // 放置静态资源的地方 (js/css/img/font/...)
    assetsDir: 'static',


    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8080', //要跨域的域名
    //     pathRewrite: {
    //       '^/api': '' //将你的地址代理为这个 /api 接下来请求时就使用这个/api来代替你的地址
    //     },
    //     changeOrigin: true, //是否允许跨越
    //   }
    // },
  }
}