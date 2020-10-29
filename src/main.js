import Vue from 'vue'
import App from './App.vue'
// 导入路由
import router from './router/index.js'
// 引入element组件库
import ElementUI from 'element-ui';
// 别忘记引入样式文件
import 'element-ui/lib/theme-chalk/index.css';
// 使用
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
