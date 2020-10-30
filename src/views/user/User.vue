<template>
<el-card class="box-card">   
		<!-- 面包屑 -->
		<!-- 首页用户管理用户列表 -->
	<el-breadcrumb separator-class="el-icon-arrow-right">
	  <el-breadcrumb-item>首页</el-breadcrumb-item>
	  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
	  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
	</el-breadcrumb>
		<!-- 搜索框 -->
	<el-row class="row">
	  <el-col>
		<el-input placeholder="请输入内容" v-model="search" class="input">
	    <el-button slot="append" icon="el-icon-search"></el-button>
	  </el-input>
	  <el-button type="primary" class="btn">添加用户</el-button>
	  </el-col>
	</el-row>
		<!-- 表格 -->
	<el-table
	    :data="tableData"
	    stripe
	    style="width: 100%">
	    <el-table-column
		type="index"
	      label="#"
	      width="100">
	    </el-table-column>
	    <el-table-column
	      prop="name"
	      label="姓名"
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="address"
	      label="电话">
	    </el-table-column>
		<el-table-column
	      prop="address"
	      label="角色">
	    </el-table-column>
		<el-table-column
	      prop="address"
	      label="状态">
	    </el-table-column>
		<el-table-column
	      prop="address"
	      label="操作">
	    </el-table-column>
	  </el-table>
		<!-- 分页 -->
</el-card>	
</template>

<script>


export default {
  name: 'User',
  data(){
	  return{
		  search:'',
		  pagenum:1,
		  pagesize:5,

		  tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
	  }
  },
  components: { },
  created(){
	  this.getuserinfo()
  },
  methods:{
	async getuserinfo(){
		// 2.虽然按照接口文档将参数传递过去了,但还是获取不到数据,需要授权的API,必须在请求头中使用Authorization 字段提供token 令牌
// 获取token值
const AUTH_TOKEN = localStorage.getItem('token')
// 设置请求头
this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN

// 1.请求列表的数据
		const res = await this.$http.get(
			`users?query=${this.search}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)  //有参数要传递参数
	console.log(res)
	}
  }
}
</script>

<style scoped>
.box-card{
	height: 100%;
}
.input{
	width: 300px;
}
.btn{
	margin-left: 15px;
}
.row{
	margin-top: 20px;
}
</style>
