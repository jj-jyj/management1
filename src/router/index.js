//配置路由相关的信息
import VueRouter from "vue-router";
import Vue from 'vue'

//1.通过Vue.use(插件),安装插件
Vue.use(VueRouter)

//2.创建VueRouter 对象
const routes = [

]
const router = new VueRouter({
  //配置路由和组件之间的应用关系
  routes,
  mode:'history'
})

//3.将router对象导出到Vue 实例中
export default router