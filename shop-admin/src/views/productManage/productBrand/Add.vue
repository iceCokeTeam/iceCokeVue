<template>
  <div>
    <el-dialog
      title="添加品牌"
      :visible.sync="showAddDialog"
      :show-close="false"
      :close-on-click-modal="false"
      width="35%"
    >
      <el-form :model="info">
        <el-form-item label="品牌名" :label-width="labelWidth">
          <el-input v-model="info.brandName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="5">商品图片</el-col>
            <el-upload
              action="#"
              ref="upload"
              list-type="picture-card"
              :auto-upload="false"
              :on-preview="handlePictureCardPreview"
              :multiple="false"
              drag
              :on-change="uploadImg"
              :style="dialogVisible === true ? '' : 'display:none'"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <img :src="info.logo" alt="" class="image" />
          </el-row>
        </el-form-item>
        <el-form-item label="介绍" :label-width="labelWidth">
          <el-input v-model="info.introduce"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button @click="$emit('close'), reset()" size="small"
          >取 消</el-button
        >
        <el-button type="primary" @click="submit" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addBrand } from "@/api/productManage/brand/brand";
import { getBase64 } from "@/utils/image";
export default {
  props: ["showAddDialog"],
  data() {
    return {
      info: {
        brandName: "",
        logo: "",
        introduce: ""
      },
      labelWidth: "18%",
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  created() {
    this.info.logo = "";
    this.dialogVisible = true;
  },
  methods: {
    submit() {
      addBrand(this.$qs.stringify(this.info)).then(res => {
        if (res.code === 200) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
        } else this.$message.error("添加失败");
      });
      this.reset();
      this.$emit("close");
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadImg(file) {
      this.dialogVisible = !this.dialogVisible;
      let that = this;
      getBase64(file.raw).then(res => {
        that.info.logo = res;
      });
    },
    reset() {
      this.info = {
        brandName: "",
        logo: "",
        introduce: ""
      };
      this.$refs.upload.clearFiles();
      this.dialogImageUrl = "";
      this.dialogVisible = true;
    }
  }
};
</script>

<style scoped>
.btn {
  display: flex;
  justify-content: flex-end;
}
.image {
  width: 200px;
  height: 200px;
}
</style>
