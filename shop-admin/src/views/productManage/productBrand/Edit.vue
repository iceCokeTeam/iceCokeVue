<template>
  <div>
    <el-dialog
      title="编辑品牌"
      :visible.sync="showEditDialog"
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
            <el-col :span="5" class="shopImg">商品图片</el-col>
            <el-upload
              action="#"
              ref="upload"
              list-type="picture-card"
              :auto-upload="false"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
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
          <el-input v-model="info.introduce" value="123"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button size="small" @click="$emit('close'), reset()"
          >取 消</el-button
        >
        <el-button size="small" type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { updateBrand } from "@/api/productManage/brand/brand";
import { getBase64 } from "@/utils/image";
export default {
  props: ["showEditDialog", "info"],
  data() {
    return {
      labelWidth: "18%",
      dialogImageUrl: "",
      dialogVisible: true
    };
  },
  created() {},
  methods: {
    submit() {
      let that = this;
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
            that.$emit("refresh");
          } else {
            this.$message.error("更新失败");
          }
        })
        .catch(() => {
          this.$message.error("更新失败");
        });
      this.reset();
      this.$emit("close");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
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
      this.$emit("reset");
      this.$refs.upload.clearFiles();
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
.shopImg {
  display: flex;
  justify-content: center;
}
</style>
