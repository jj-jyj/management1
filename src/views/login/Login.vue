<template>
  <div id="Login">		  
		<el-form class="login-prow" :label-position="labelPosition" label-width="80px" :model="formdata">
		  <h2>用户登录</h2>
		  <el-form-item label="用户名">
		    <el-input v-model="formdata.username"></el-input>
		  </el-form-item>
		  <el-form-item label="密码">
		    <el-input v-model="formdata.password"></el-input>
		  </el-form-item>
		  <el-button type="primary" class="denglu" @click.prevent="btnclick()">登录</el-button>
		</el-form>
  </div>
</template>

<script>


export default {
  name: 'Login',
  components: {},
  data(){
	  return{
		  labelPosition:'top',
		  formdata:{
			  username:'',
			  password:''
		  }
	  }
  },
  methods:{
	 async	btnclick(){
		const res =await this.$http.post('login',this.formdata)
			console.log(res)
			// 现将需要用的东西通过结构提取出来,也可以自己在打塔里面命名保存
			const {
				data,
				meta:{msg,status}
			} = res.data					
		if(status===200){
			// 登录成功
			// 0.保存token值
			localStorage.setItem('token',data.token)
			// 1.跳转首页
			this.$router.push('home')  //路由跳转	
			// 2.弹窗提示成功
			this.$message.success(msg)
		}else{
			// 不成功
			// 1.提示原因
			this.$message.warning(msg)

		}
	  }
  }
}
</script>

<style lang="less" scoped>
#Login{
	height: 100%;
	background-color: #314155;
	display: flex;
	justify-content: center;
	align-items: center;
	.login-prow{
		width: 400px;
		border-radius: 10px;
		padding: 30px;
		background-color: #fff;
		.denglu{
			width: 100%;
		}
	}
}
</style>


