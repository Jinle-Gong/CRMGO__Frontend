<template>
  <div id="app">
    <!--
      Vue初始化完成后，App.vue被渲染到index.html下的div标签内
      此后，页面所有内容都是通过路由，
      把内容 (view 和 components) 渲染在下面的router-view中
    -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
