<template>
  <div class="login_container">
    <!--<el-button type="primary" @click="login">登陆设置Token</el-button>-->
    <el-card>
      <div class="login_box">
        <!-- 登录表单区域 -->
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          class="login_form"
          :rules="loginFormRules"
        >
          <h1 class="adminTitle">管理员登录</h1>
          <el-form-item prop="adminName">
            <span class="loginTitle">账号</span>
            <el-input
              v-model="loginForm.adminName"
              prefix-icon="iconfont icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item prop="adminPassword">
            <span class="loginTitle">密码</span
            ><el-input
              v-model="loginForm.adminPassword"
              type="password"
              prefix-icon="iconfont icon-3702mima"
            ></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import { setToken } from "@/utils/common";
import { adminLogin } from "@/api/adminManage/admin";
export default {
  data() {
    return {
      loginForm: {
        adminName: "",
        adminPassword: ""
      },
      loginFormRules: {
        adminName: [
          {
            required: true,
            message: "请输入登录名称",
            trigger: "blur"
          },
          {
            min: 3,
            max: 5,
            message: "长度在 3 到 5 个字符",
            trigger: "blur"
          }
        ],
        adminPassword: [
          {
            required: true,
            message: "请输入登录密码",
            trigger: "blur"
          },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    adminLogin,
    setToken,
    toLogin() {
      let that = this;
      this.adminLogin(
        that.$qs.stringify({
          adminName: this.loginForm.adminName,
          password: this.loginForm.adminPassword
        })
      )
        .then(res => {
          if (res.code === 200) {
            this.$message({
              message: "登录成功",
              type: "success"
            });
            that.setToken(res.data.authToken);
            that.$router.push("/");
          } else this.$message.error("登录失败");
        })
        .catch(() => {
          this.$message.error("登录失败");
        });
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        this.toLogin();
      });
    }
  },
  mounted: function() {}
};
</script>

<style scoped>
.login_container {
  background-color: #2b4b6b;
}

.el-card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 750px;
  background-color: rgb(188, 204, 200);
}

.adminTitle {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  color: cornflowerblue;
}

.loginTitle {
  margin-right: 25px;
  font-size: 16px;
  color: #fff;
}

.login_box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 450px;
  height: 300px;
  background-color: #465a6e;
  border-radius: 3px;
}

.avatar_box {
  width: 130px;
  height: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  background-color: #fff;
}
.avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.login_form {
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.el-input {
  width: 300px;
}
.el-button {
  margin-right: 80px;
}
</style>
