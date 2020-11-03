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
        <el-input placeholder="请输入内容" v-model="search" class="input" clearable @clear="loaduserlist">
          <el-button slot="append" icon="el-icon-search" @click="searchclick"></el-button>
        </el-input>
        <el-button type="primary" class="btn" @click="showaddformvisible">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="userlist" stripe style="width: 100%">
      <el-table-column type="index" label="#" width="50"> </el-table-column>
      <el-table-column prop="username" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column label="时间">
        <!-- 关于时间格式化的用法   prop="create_time |fmtiem"  不行 -->
        <!-- 1 如果单元格的内容不是文本 需要给该内容外层加容器 template 才会显示 -->
        <!-- 2 作用域拿值问题  一个组件如何想拿另一个组件里面的值则使用: slot-scope="scope" 
	   		这里的scope就是数据源  要拿数据源里面的值 scope.row.具体数据源里面的值-->'
        <template slot-scope="scope">
          {{ scope.row.create_time | fmtiem }}
        </template>
      </el-table-column>
      <el-table-column prop="role_name" label="角色"> </el-table-column>
      <el-table-column prop="mg_state" label="状态">
		<template slot-scope="scope">  
       		<el-switch 
			   @change="changeMgState(scope.row)"
       		  v-model="scope.row.mg_state"
       		  active-color="#13ce66"
       		  inactive-color="#ff4949"
       		>
       		</el-switch>
		</template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="130">
		<template slot-scope="scope">  
  			<el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="useredit(scope.row)"></el-button>
  			<el-button size="mini" plain type="success" icon="el-icon-delete" circle @click="deletelist(scope.row.id)"></el-button>
  			<el-button size="mini" plain type="danger" icon="el-icon-s-tools" circle @click="fenpei(scope.row)"></el-button>
		</template>  
	  </el-table-column>
    </el-table>

    <!-- 分页 -->
 	<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="4"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

<!-- 点击添加用户弹出对话框 -->
<el-dialog title="添加用户" :visible.sync="dialogFormVisibleadd">
  <el-form :model="form">
    <el-form-item label="用户名" label-width="100px">
      <el-input v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>
	<el-form-item label="密码" label-width="100px">
      <el-input v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
	<el-form-item label="邮箱" label-width="100px">
      <el-input v-model="form.email" autocomplete="off"></el-input>
    </el-form-item>
	<el-form-item label="手机" label-width="100px">
      <el-input v-model="form.mobile" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleadd = false">取 消</el-button>
    <el-button type="primary" @click="adduser()">确 定</el-button>
  </div>
</el-dialog>

<!-- 点击修改用户弹出对话框 -->
<el-dialog title="修改用户信息" :visible.sync="dialogFormVisibleedit">
  <el-form :model="form">
    <el-form-item label="用户名" label-width="100px">
      <el-input disabled v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>
	<el-form-item label="邮箱" label-width="100px">
      <el-input v-model="form.email" autocomplete="off"></el-input>
    </el-form-item>
	<el-form-item label="手机" label-width="100px">
      <el-input v-model="form.mobile" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleedit = false">取 消</el-button>
    <el-button type="primary" @click="edituser()">确 定</el-button>
  </div>
</el-dialog>

<!-- 点击分配按钮弹出对话框 -->
<el-dialog title="分配角色" :visible.sync="dialogFormVisibleRol">
  <el-form :model="form">
    <el-form-item label="当前用户" label-width="100px">
      {{name}}
    </el-form-item>
    <el-form-item label="角色" label-width="100px">
      <el-select v-model="currRoleId">
        <el-option label="请选择" :value="-1"></el-option>
        <el-option :label="item.roleName" :value="item.id"
		v-for="(item,i) in roles" :key="i"
		>
		</el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="fenpeiuser()">确 定</el-button>
  </div>
</el-dialog>

  </el-card>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      search: "",
      total: 1,
      pagenum: 1,
      pagesize: 2,

	  userlist: [],
	  //   是否显示对话框
	dialogFormVisibleadd:false,
	dialogFormVisibleedit:false,
	dialogFormVisibleRol:false,
	// 添加用户表单数据
	  form:{
		//   这里面的数据要结合接口文档看
		// | username | 用户名称 | 不能为空 |
		// | password | 用户密码 | 不能为空 |
		// | email    | 邮箱     | 可以为空 |
		// | mobile   | 手机号   | 可以为空 |
		username:'',
		password:'',
		email:'',
		mobile:''
	  },
	  currRoleId:0,
	  name:'',
	  curruserId:-1,
	  roles:[]
	
    }; 
  },
  components: {},
  created() {
    this.getuserinfo();
  },
  methods: {
    async getuserinfo() {
      // 2.虽然按照接口文档将参数传递过去了,但还是获取不到数据,需要授权的API,必须在请求头中使用Authorization 字段提供token 令牌
      // 获取token值
      const AUTH_TOKEN = localStorage.getItem("token");
      // 设置请求头
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;

      // 1.请求列表的数据
      const res = await this.$http.get(
        `users?query=${this.search}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      ); //有参数要传递参数
    //   console.log(res);
      // 拿到数据后将要用到的数据结构出来
      const {
        data: { total, users },
        meta: { msg, status },
      } = res.data;
      if (status === 200) {
        // 1.给表格数据赋值
        this.userlist = users;
        // 2.给total赋值
        this.total = total;
        // 3.提示
        this.$message.success(msg);
      } else {
        this.$message.warning(msg);
      }
	},
	// 分页的相关事件
	handleSizeChange(val) {
		console.log(`每页 ${val} 条`);
		this.pagesize = val
		// 更新视图
		this.getuserinfo()
      },
      handleCurrentChange(val) {
		console.log(`当前页: ${val}`);
		this.pagenum = val
		this.getuserinfo()
		
	  },
	//  搜索事件
	searchclick(){
		// 重新发送请求
		this.getuserinfo()		
	},
	// 点击x清空搜索中数据,并重新获取数据展示
	loaduserlist(){
		this.getuserinfo()		
	},
	// 添加用户-显示弹出
	showaddformvisible(){
		this.form = {}   
		this.dialogFormVisibleadd=true
	},
	//  添加用户-发送请求
	async adduser(){
		// 2 关闭对话框
		this.dialogFormVisibleadd=false
		// 发送请求
		const res = await this.$http.post(`users`,this.form);
		// console.log(res)
		// 将要用的数据结构出来
		const {data,meta:{msg,status}} = res.data
		if(status===201){
			// 1 弹窗提示
			this.$message.success(msg)
			// 3 更新视图
			this.getuserinfo()
			// 4 清空文本框
			this.form={}
		}else{
			this.$message.warning(msg)

		}
	},
	// 删除-弹出提示框
	deletelist(id){
		this.$confirm('是否删除用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
			// 发送删除的请求 :记得将id传过去
		const res = await this.$http.delete(`users/${id}`)
		console.log(res)
		if(res.data.meta.status===200){
			// 回到第一页
			this.pagenum =1
			// 1 更新视图
			this.getuserinfo()
			// 2 提示
		this.$message({
            type: 'success',
            message: res.data.meta.msg
          });
		}        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
	},
	
	// 点击修改用户个人信息
	useredit(user){
		// 提示框弹出
		this.dialogFormVisibleedit=true
		// 将user赋值给之前的form 
		this.form = user
		console.log(this.form)
	},
  
	// 点击修改确认的按钮
	async edituser(){
		// 关闭对话框
		this.dialogFormVisibleedit=false
		// 发送修改请求
		const res = await this.$http.put(`users/${this.form.id}`,this.form)
		console.log(res)
		const {data,meta:{msg,status}} = res.data
		if(status===200){
			// 1 弹出提示
		this.$message.success(msg)
			// 3 更新视图
			this.getuserinfo()
		}else{
		this.$message.warning(msg)			
		}
	},
	// 点击修改状态
	async changeMgState(user){
		// users/:uId/state/:type
		// 发送请求
		console.log(user)
		const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
	},
	// 点击分配按钮-弹出对话框
	async fenpei(user){
		// 给name赋值
		this.name = user.username
		this.curruserId = user.id
		// 获取当前用户的角色id ->rid
		const res = await  this.$http.get(`users/${user.id}`)
	// 获取所有角色
	const res1 = await this.$http.get(`roles`)
	// 保存角色数据
	this.roles = res1.data.data
	
	this.currRoleId =res.data.data.rid
	this.dialogFormVisibleRol=true
	// console.log(res)
	},
	// 点击分配确认的按钮
	async fenpeiuser(){
		// 关闭对话框
		this.dialogFormVisibleRol=false
		// 发送请求 请求体中rid 修改的新值角色id
		const res = await this.$http.put(`users/${this.curruserId}/role`,{rid:this.currRoleId})
		console.log(res)
		const {data,meta:{msg,status}} = res.data
		if(status===200){
			// 1 弹窗提示
			this.$message.success(msg)
			// 3 这里不需要更新更新视图
			// this.getuserinfo()
		}else{
			this.$message.warning(msg)
		}
	}
  },
};
</script>

<style scoped>
.box-card {
  height: 100%;
}
.input {
  width: 300px;
}
.btn {
  margin-left: 15px;
}
.row {
  margin-top: 20px;
}
</style>
