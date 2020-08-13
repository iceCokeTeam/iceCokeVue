<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-input v-model="searchName" placeholder="订单名"></el-input>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="search">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-table border :data="orderInfo">
        <el-table-column
          label="编号"
          type="index"
          width="80"
          :index="indexSet"
        ></el-table-column>
        <el-table-column label="订单号" prop="orderNum"></el-table-column>
        <el-table-column
          label="用户名"
          prop="userVO.userName"
        ></el-table-column>
        <el-table-column label="订单状态" prop="orderStatus"></el-table-column>
        <el-table-column label="支付金额" prop="payMoney"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button size="small" @click="orderDetail(scope.row)"
              >详细</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="deleteOrder(scope.row.id)"
              >删除</el-button
            >
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
  </div>
</template>

<script>
import {
  orderList,
  delOrder,
  updateOrder
} from "@/api/orderManage/order/order";
export default {
  data() {
    return {
      orderInfo: [],
      searchName: "",
      pageIndex: 1,
      pageSize: 5,
      total: 20,
      start: true
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
        orderNum: this.searchName,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      orderList(this.$qs.stringify(params))
        .then(res => {
          this.$message({
            message: "数据获取成功",
            type: "success"
          });
          that.orderInfo = res.data.orderList;
          that.total = res.data.orderAmount;
        })
        .catch(() => {
          this.$message.error("数据获取失败");
        });
    },
    delOrder,
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
    deleteOrder(id) {
      let that = this;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          that
            .delOrder(that.$qs.stringify({ id: id }))
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
      updateOrder(this.$qs.stringify({ id: data.id, status: data.status }))
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
    orderDetail(data) {
      this.$router.push({
        name: "OrderDetail",
        query: {
          detailInfo: data
        }
      });
    }
  }
};
</script>

<style scoped>
.el-table-column {
  display: flex;
  justify-content: center;
}
.el-pagination {
  float: right;
  margin-top: 20px;
}
</style>
