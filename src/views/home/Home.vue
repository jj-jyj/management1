<template>
  <el-container class="home">
    <el-header class="header">
      <el-row>
        <el-col :span="4" class="div-left">
			<div class="grid-content bg-purple">
				<img src="@/assets/img/logo.png" alt="">
			</div>
		</el-col>
        <el-col :span="18" class="div-center">
			<div class="grid-content bg-purple-light">
				<h2>电商后台管理系统</h2>	
			</div>
		</el-col>
        <el-col :span="2" class="div-right">
			<div class="grid-content bg-purple">
				<a href="#" @click=aclick()>退出</a>
			</div>
		</el-col>
      </el-row>
    </el-header>
	<!-- 身体部分 -->
    <el-container class="body">
		<!-- 左边 -->
    	<el-aside width="200px" class="body-left">
			<!-- element的导航组件 -->
			<el-menu 
			:router="true"
			:unique-opened="true">
    		  <el-submenu index="1">
    		    <template slot="title">
    		      <i class="el-icon-location"></i>
    		      <span>用户管理</span>
    		    </template>
    		      <el-menu-item index="user">
					  <i class="el-icon-menu"></i>
					  <span>用户列表</span>
				  </el-menu-item>
    		  </el-submenu>
    		  <el-submenu index="2">
    		    <template slot="title">
    		      <i class="el-icon-location"></i>
    		      <span>用户管理</span>
    		    </template>
    		      <el-menu-item index="1-2">
					  <i class="el-icon-menu"></i>
					  <span>用户列表</span>
				  </el-menu-item>
    		  </el-submenu>
    		</el-menu>
			
	  	</el-aside>

		<!-- 右边 -->
      <el-main class="body-right">
		  <router-view></router-view>
	  </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
//   vue实例渲染之前判断有无token值
beforeCreate(){
	// 获取之前保存的token值
	const token = localStorage.getItem('token')
	if(!token){
		// 没有token ->跳转到登录页
		this.$router.push({name:'login'})
	}
		// 有token值 -> 继续渲染组件
	
},
methods:{
	aclick(){
		// 1.清除token值
		localStorage.clear()
		// 2.弹窗提示退出成功
		this.$message.success('退出成功')
		// 3.跳转到登录页
		this.$router.push({name:'login'})
	}
}
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .header {
    color: #fff;
    text-align: center;
    line-height: 60px;
	background-color: #b2bfd2;
	.div-left{
		text-align: left;
		img{
		height: 55px;
	}
	}
	.div-center{
		line-height: 23px;
		color:#000000
	}
	.div-right{
		a{
			text-decoration: none;
		}
		
	}
	
  }
  .body {
    .body-left {
      background-color: #d3dce9;
    }
    .body-right {
	  background-color: #eaedf1;
	  
	 
    }
  }
}
</style>
