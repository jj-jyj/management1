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
       		  v-model="scope.row.mg_state"
       		  active-color="#13ce66"
       		  inactive-color="#ff4949"
       		>
       		</el-switch>
		</template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="130">
  		<el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
  		<el-button size="mini" plain type="success" icon="el-icon-delete" circle></el-button>
  		<el-button size="mini" plain type="danger" icon="el-icon-s-tools" circle></el-button>
	  </el-table-column>
    </el-table>
    <!-- 分页 -->
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
      pagesize: 4,

      userlist: [],
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
      console.log(res);
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
