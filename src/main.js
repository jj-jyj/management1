import Vue from 'vue'
import App from './App.vue'
// 导入路由
import router from './router/index.js'
// 引入element组件库
import ElementUI from 'element-ui';
// 别忘记引入样式文件
import 'element-ui/lib/theme-chalk/index.css';
// 引入base样式文件
import '@/assets/css/base.css'
// 引入less插件
import less from 'less'
// 引入moment
import moment from 'moment'

Vue.use(ElementUI);
Vue.use(less)




import myhttpserve from '@/network/request.js'
Vue.use(myhttpserve)


Vue.config.productionTip = false


// 全局过滤器- 处理日期
Vue.filter('fmtiem',(v)=>{
  return moment(v).format('YYYY-MM-DD')  //要记得安装moment,然后引入
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
