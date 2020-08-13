<template>
  <div>
    <el-dialog
      title="编辑管理员"
      :visible.sync="showAddDialog"
      :show-close="false"
      :close-on-click-modal="false"
      width="35%"
    >
      <el-form :model="info">
        <el-form-item label="账号" :label-width="labelWidth">
          <el-input v-model="info.adminName"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="labelWidth">
          <el-input v-model="info.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="labelWidth">
          <el-input v-model="info.nickName" value="123"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="labelWidth">
          <el-input v-model="info.email"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="labelWidth">
          <el-switch
            v-model="info.status"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button @click="$emit('close')" size="small">取 消</el-button>
        <el-button type="primary" @click="submit" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { adminRegister } from "@/api/adminManage/admin";
export default {
  props: ["showAddDialog"],
  data() {
    return {
      info: {
        adminName: "",
        password: "",
        nickName: "",
        email: "",
        status: 1
      },
      labelWidth: "18%"
    };
  },
  methods: {
    submit() {
      let that = this;
      adminRegister(this.$qs.stringify(this.info)).then(res => {
        if (res.code === 200) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          that.$emit("refresh");
        } else this.$message.error("添加失败");
      });
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.btn {
  display: flex;
  justify-content: flex-end;
}
</style>
