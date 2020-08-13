<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-input v-model="searchName" placeholder="商品名"></el-input>
        </el-col>
        <el-col :span="5" class="search">
          <el-button type="primary" @click="search">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-table border :data="productInfo">
        <el-table-column
          label="编号"
          type="index"
          width="80px"
          :index="indexSet"
        ></el-table-column>
        <el-table-column label="商品名称" prop="productName"> </el-table-column>
        <el-table-column label="商品副标题" prop="subtitle"></el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <img :src="scope.row.productImg" alt="" class="image" />
          </template>
        </el-table-column>
        <el-table-column
          label="商品品牌"
          prop="brand.brandName"
        ></el-table-column>
        <el-table-column
          label="商品分类"
          prop="category.categoryName"
        ></el-table-column>
        <el-table-column label="商品介绍" prop="introduce"></el-table-column>
        <el-table-column label="商品价格" prop="price"></el-table-column>
        <el-table-column label="商品库存" prop="stock"></el-table-column>
        <el-table-column label="商品状态" prop="status"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-row>
              <el-button
                class="btn"
                type="primary"
                size="mini"
                @click="(showEditDialog = true), sendMsg(scope.row)"
                >编辑</el-button
              >
            </el-row>
            <el-row>
              <el-button
                class="btn"
                size="mini"
                type="danger"
                @click="deleteProduct(scope.row.id)"
                >删除</el-button
              >
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <Edit
      :showEditDialog="showEditDialog"
      @close="showEditDialog = false"
      :info="info"
      :levelCas="levelCas"
      :brandCas="brandCas"
      @refresh="updateData"
    ></Edit>
  </div>
</template>

<script>
import Edit from "./Edit";
import {
  productList,
  delProduct,
  updateProduct
} from "@/api/productManage/product/product";
export default {
  data() {
    return {
      productInfo: [],
      searchName: "",
      pageIndex: 1,
      pageSize: 5,
      total: 20,
      start: true,
      showEditDialog: false,
      showAddDialog: false,
      info: "",
      levelCas: { ca: [] },
      brandCas: { ca: [] }
    };
  },
  created() {
    if (this.start) this.getData();
    this.start = !this.start;
  },
  methods: {
    getData() {
      let that = this;
      var params = {
        productName: this.searchName,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      productList(this.$qs.stringify(params))
        .then(res => {
          this.$message({
            message: "数据获取成功",
            type: "success"
          });
          that.productInfo = res.data.productList;
          that.total = res.data.productAmount;
        })
        .catch(() => {
          this.$message.error("数据获取失败");
        });
    },
    delProduct,
    handleSizeChange(val) {
      this.pageSize = val;
      if (!this.start) this.getData();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      if (!this.start) this.getData();
    },
    search() {
      this.getData();
    },
    indexSet(index) {
      return index + 1 + (this.pageIndex - 1) * this.pageSize;
    },
    deleteProduct(id) {
      let that = this;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          that
            .delProduct(that.$qs.stringify({ id: id }))
            .then(res => {
              if (res.code === 200) {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                that.getData();
              } else this.$message.error("删除失败");
            })
            .catch(() => {
              this.$message.error("删除失败");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    changeStatus(data) {
      updateProduct(this.$qs.stringify({ id: data.id, status: data.status }))
        .then(res => {
          if (res.code === 200) {
            this.$message({
              message: "操作成功",
              type: "success"
            });
          } else this.$message.error("操作失败");
        })
        .catch(() => {
          this.$message.error("操作失败");
        });
    },
    sendMsg(data) {
      this.info = {
        id: data.id,
        categoryId: data.category.id,
        brandId: data.brand.id,
        productName: data.productName,
        productImg: "",
        subtitle: data.subtitle,
        introduce: data.introduce,
        price: data.price,
        stock: data.stock,
        measure: data.measure,
        status: data.status
      };
      this.levelCas.ca[0] = data.category.parentId;
      this.levelCas.ca[1] = data.category.id;
      this.brandCas.ca = [data.brand.id];
    },
    updateData() {
      this.showEditDialog = false;
      this.getData();
    }
  },
  components: { Edit }
};
</script>

<style scoped>
.search {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.el-table-column {
  display: flex;
  justify-content: center;
}
.el-pagination {
  float: right;
  margin-top: 20px;
}
.image {
  width: 90px;
  height: 100px;
}
.btn {
  margin-top: 20px;
}
</style>
