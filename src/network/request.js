import axios from 'axios'
const myhttpserve = {}
myhttpserve.install = (Vue) =>{
	axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
	// 添加实例
	Vue.prototype.$http = axios
}
export default myhttpserve

// axios 原本不是Vue的插件,这样操作就可以将axios拿来当vue插件使用
// 在main.js 中导入之后 Vue.use(插件名)
// 在其他页面就可以以: this.$http.get()