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
        <el-col :span="14">
          <el-button plain @click="showAddDialog = true">添加</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-table border :data="adminInfo">
        <el-table-column
          label="编号"
          type="index"
          width="80"
          :index="indexSet"
        ></el-table-column>
        <el-table-column label="管理员账号" prop="adminName"></el-table-column>
        <el-table-column label="管理员姓名" prop="nickName"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column
          label="最后登录时间"
          prop="loginTime"
        ></el-table-column>
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="(showEditDialog = true), editInfo(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" @click="deleteAdmin(scope.row.id)"
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
    <Edit
      :showEditDialog="showEditDialog"
      @close="showEditDialog = false"
      :info="info"
    ></Edit>
    <Add
      @refresh="getData"
      :showAddDialog="showAddDialog"
      @close="showAddDialog = false"
    ></Add>
  </div>
</template>

<script>
import { adminList, delAdmin, updateAdmin } from "@/api/adminManage/admin";
import Edit from "./Edit";
import Add from "./Add";
export default {
  data() {
    return {
      adminInfo: [],
      searchName: "",
      pageIndex: 1,
      pageSize: 5,
      total: 20,
      start: true,
      showEditDialog: false,
      showAddDialog: false,
      info: ""
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
        adminName: this.searchName,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      adminList(this.$qs.stringify(params))
        .then(res => {
          this.$message({
            message: "数据获取成功",
            type: "success"
          });
          that.adminInfo = res.data.adminList;
          that.total = res.data.adminAmount;
        })
        .catch(() => {
          this.$message.error("数据获取失败");
        });
    },
    delAdmin,
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
    deleteAdmin(id) {
      let that = this;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          that
            .delAdmin(that.$qs.stringify({ id: id }))
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
    editInfo(data) {
      this.info = data;
      this.info.password = "******";
    },
    changeStatus(data) {
      updateAdmin(this.$qs.stringify({ id: data.id, status: data.status }))
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
  },
  components: { Edit, Add }
};
</script>

<style scoped>
.el-col:last-child {
  display: flex;
  justify-content: flex-end;
}
.el-table-column {
  display: flex;
  justify-content: center;
}
.el-pagination {
  float: right;
  margin-top: 20px;
}
</style>
