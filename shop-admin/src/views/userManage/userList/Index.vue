<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-input v-model="searchName" placeholder="用户名"></el-input>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="search">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-table border :data="userInfo">
        <el-table-column
          label="编号"
          type="index"
          width="80"
          :index="indexSet"
        ></el-table-column>
        <el-table-column label="用户名" prop="userName"></el-table-column>
        <el-table-column label="昵称" prop="nickName"></el-table-column>
        <el-table-column label="性别" prop="sex"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="头像" prop="userImg"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              @change="changeStatus(scope.row)"
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="small"
              @click="deleteUser(scope.row.id)"
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
import { userList, delUser, updateUser } from "@/api/userManage/user";
export default {
  data() {
    return {
      userInfo: [],
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
        userName: this.searchName,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      userList(this.$qs.stringify(params))
        .then(res => {
          this.$message({
            message: "数据获取成功",
            type: "success"
          });
          that.userInfo = res.data.userList;
          that.total = res.data.userAmount;
        })
        .catch(() => {
          this.$message.error("数据获取失败");
        });
    },
    delUser,
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
    deleteUser(id) {
      let that = this;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          that
            .delUser(that.$qs.stringify({ id: id }))
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
      updateUser(this.$qs.stringify({ id: data.id, status: data.status }))
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
