<template>
  <div>
    <el-card>
      <el-table :data="userInfo" border style="width: 100%">
        <el-table-column
          prop="userName"
          label="用户名"
          width="180"
        ></el-table-column>
        <el-table-column prop="nickName" label="昵称" width="180">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="180"> </el-table-column>
        <el-table-column label="头像" width="180">
          <template slot-scope="scope">
            <img :src="scope.row.userImg" alt="" class="image" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card>
      <el-table :data="detailInfo" border style="width: 100%">
        <el-table-column
          type="index"
          label="编号"
          width="180"
        ></el-table-column>
        <el-table-column label="商品图片" width="180">
          <template slot-scope="scope">
            <img :src="scope.row.productImg" alt="" class="image" />
          </template>
        </el-table-column>
        <el-table-column prop="productName" label="商品名" width="180">
        </el-table-column>
        <el-table-column prop="num" label="数量" width="180"> </el-table-column>
        <el-table-column prop="price" label="单价" width="180">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderInfo: this.$route.query.detailInfo.userVO,
      detailInfo: [],
      userInfo: []
    };
  },
  created() {
    this.userInfo[0] = this.$route.query.detailInfo.userVO;
    this.detailInfo = this.$route.query.detailInfo.orderDetail;
    console.log(this.detailInfo);
  }
};
</script>

<style scoped>
.el-card:first-child {
  display: flex;
  justify-content: center;
}
.image {
  width: 100px;
  height: 100px;
}
</style>
