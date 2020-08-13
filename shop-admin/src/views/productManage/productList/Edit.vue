<template>
  <div>
    <el-dialog
      title="编辑商品"
      :visible.sync="showEditDialog"
      :show-close="false"
      :close-on-click-modal="false"
      width="60%"
    >
      <el-card>
        <el-row :gutter="20">
          <el-col :span="lableWidth">商品分类</el-col>
          <el-col :span="inputWidth">
            <el-cascader
              v-model="levelCas.ca"
              :props="categoryProp"
              :options="levelList"
              @change="addCategory"
            ></el-cascader>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="lableWidth">商品品牌</el-col>
          <el-col :span="inputWidth"
            ><el-cascader
              v-model="brandCas.ca"
              :props="brandProp"
              :options="brandList"
              @change="addBrand"
            ></el-cascader
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="lableWidth">商品名称</el-col>
          <el-col :span="14">
            <el-input
              v-model="info.productName"
              placeholder="请输入商品名"
            ></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="3">商品副标题</el-col>
          <el-col :span="14">
            <el-input
              v-model="info.subtitle"
              placeholder="请输入副标题"
            ></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="3">商品介绍</el-col>
          <el-col :span="14">
            <el-input
              v-model="info.introduce"
              placeholder="请输入商品介绍"
            ></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="3">商品价格</el-col>
          <el-col :span="14">
            <el-input
              v-model="info.price"
              placeholder="请输入商品价格"
            ></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="3">商品库存</el-col>
          <el-col :span="14">
            <el-input
              v-model="info.stock"
              type="number"
              placeholder="请输入商品库存"
            ></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="3">商品计量</el-col>
          <el-col :span="14">
            <el-input
              v-model="info.measure"
              placeholder="请输入计量单位"
            ></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="3">商品状态</el-col>
          <el-col :span="14">
            <el-switch
              @change="addStatus"
              v-model="info.status"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">商品图片</el-col>
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
          <img :src="info.productImg" alt="" class="image" />
        </el-row>
        <div class="btn">
          <el-button @click="$emit('close')">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import { allLevel } from "@/api/productManage/category/category";
import { brandList } from "@/api/productManage/brand/brand";
import { getBase64 } from "@/utils/image";
import { updateProduct } from "@/api/productManage/product/product";
export default {
  props: ["showEditDialog", "info", "levelCas", "brandCas"],
  data() {
    return {
      lableWidth: 3,
      inputWidth: 5,
      levelList: [],
      brandList: [],
      showAddImg: true,
      categoryProp: {
        value: "id",
        label: "categoryName",
        children: "category"
      },
      brandProp: {
        value: "id",
        label: "brandName"
      },
      dialogImageUrl: "",
      dialogVisible: true
    };
  },
  created() {
    let that = this;
    allLevel()
      .then(res => {
        that.levelList = res.data.allLevel;
      })
      .catch(() => {});
    brandList()
      .then(res => {
        that.brandList = res.data.brandList;
      })
      .catch(() => {});
  },
  methods: {
    addCategory(categoryId) {
      this.info.categoryId = categoryId[1];
    },
    addBrand(brandId) {
      this.info.brandId = brandId[0];
    },
    addStatus(status) {
      this.info.status = status;
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
        that.info.productImg = res;
      });
    },
    submit() {
      let that = this;
      updateProduct(this.$qs.stringify(this.info))
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            that.$message({
              message: "提交成功",
              type: "success"
            });
            this.$emit("refresh");
          } else this.$message.error("提交失败");
        })
        .catch(() => {
          this.$message.error("提交失败");
        });
    }
  }
};
</script>

<style scoped>
.el-card {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 60px;
  width: 800px;
}
.el-row {
  display: flex;
  align-items: center;
  margin-bottom: 50px;
}
.el-cascader {
  width: 400px;
}
.image {
  width: 300px;
  height: 300px;
}
.el-row:last-child {
  display: flex;
  justify-content: flex-start;
}
.btn {
  display: flex;
  justify-content: space-around;
  margin-right: 100px;
}
</style>
