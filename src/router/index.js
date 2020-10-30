//配置路由相关的信息
import VueRouter from "vue-router";
import Vue from 'vue'

const Login =()=>import ('../views/login/Login');
const Home =()=>import ('../views/home/Home');
const User =()=>import ('../views/user/User');



//1.通过Vue.use(插件),安装插件
Vue.use(VueRouter);
//2.创建VueRouter 对象
const routes = [
	{
	name:'login',
	path:'/login',
	component:Login
	},
	{
	name:'home',
	path:'/',
	component:Home,
	children:[{
		name:'user',
		path:'user',
		component:User
	}]
	},
]
const router = new VueRouter({
  //配置路由和组件之间的应用关系
  routes,
//   mode:'history'
})

//3.将router对象导出到Vue 实例中
export default router