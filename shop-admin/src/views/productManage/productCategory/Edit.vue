<template>
  <div>
    <el-dialog
      title="编辑分类"
      :visible.sync="showEditDialog"
      :show-close="false"
      :close-on-click-modal="false"
      width="35%"
    >
      <el-form :model="info">
        <el-form-item label="分类名" :label-width="labelWidth">
          <el-input v-model="info.categoryName"></el-input>
        </el-form-item>
        <el-form-item label="上级分类" :label-width="labelWidth">
          <el-select v-model="info.parentId" placeholder="请选择">
            <el-option label="无上级分类" value="无上级分类"></el-option>
            <el-option
              v-for="(item, index) in parentList"
              :key="index"
              :value="item.id"
              :label="item.categoryName"
            ></el-option>
          </el-select>
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
import { updateCategory } from "@/api/productManage/category/category";
export default {
  props: ["showEditDialog", "info", "parentList"],
  data() {
    return {
      labelWidth: "18%",
      select: "无上级分类"
    };
  },
  methods: {
    submit() {
      var params = {
        id: this.info.id,
        categoryName: this.info.categoryName,
        parentId: this.info.parentId
      };
      updateCategory(this.$qs.stringify(params))
        .then(res => {
          if (res.code === 200) {
            this.$message({
              message: "更新成功",
              type: "success"
            });
            this.$emit("refresh");
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
