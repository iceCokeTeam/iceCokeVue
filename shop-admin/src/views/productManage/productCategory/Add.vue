<template>
  <div>
    <el-dialog
      title="添加分类"
      :visible.sync="showAddDialog"
      :show-close="false"
      :close-on-click-modal="false"
      width="35%"
    >
      <el-form :model="info">
        <el-form-item label="分类名" :label-width="labelWidth">
          <el-input v-model="info.categoryName"></el-input>
        </el-form-item>
        <el-form-item label="上一级分类" :label-width="labelWidth">
          <el-select v-model="info.parentId" placeholder="请选择">
            <el-option label="无上级分类" value="0"></el-option>
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
        <el-button @click="$emit('close')" size="small">取 消</el-button>
        <el-button type="primary" @click="submit" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addCategory } from "@/api/productManage/category/category";
export default {
  props: ["showAddDialog", "parentList"],
  data() {
    return {
      info: {
        categoryName: "",
        parentId: ""
      },
      labelWidth: "18%"
    };
  },
  methods: {
    submit() {
      let that = this;
      addCategory(this.$qs.stringify(this.info)).then(res => {
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
