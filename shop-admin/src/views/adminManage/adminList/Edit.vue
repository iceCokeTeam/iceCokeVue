<template>
  <div>
    <el-dialog
      title="编辑管理员"
      :visible.sync="showEditDialog"
      :show-close="false"
      :close-on-click-modal="false"
      width="35%"
    >
      <el-form :model="info">
        <el-form-item label="管理员账号" :label-width="labelWidth">
          <el-input v-model="info.brandName"></el-input>
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
      </el-form>
      <div class="btn">
        <el-button size="small" @click="$emit('close')">取 消</el-button>
        <el-button size="small" type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { updateBrand } from "@/api/productManage/brand/brand";
export default {
  props: ["showEditDialog", "info"],
  data() {
    return {
      show: this.showEditDialog,
      labelWidth: "18%"
    };
  },
  created() {},
  methods: {
    submit() {
      var params = {
        id: this.info.id,
        brandName: this.info.brandName,
        logo: this.info.logo,
        introduce: this.info.introduce
      };
      updateBrand(this.$qs.stringify(params))
        .then(res => {
          if (res.code === 200) {
            this.$message({
              message: "更新成功",
              type: "success"
            });
          } else {
            this.$message.error("更新失败");
          }
        })
        .catch(() => {
          this.$message.error("更新失败");
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
