<template>
  <div id="app">
    <!-- 路由占位符 -->
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>


export default {
  name: 'app',
  components: {

  }
}
</script>

<style lang="less" scoped>
#app{
  height: 100%;
}
</style>
