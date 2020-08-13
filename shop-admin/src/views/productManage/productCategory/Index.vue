<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-input v-model="searchName" placeholder="分类名"></el-input>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="search">搜索</el-button>
        </el-col>
        <el-col :span="14">
          <el-button plain @click="(showAddDialog = true), getParentList()"
            >添加</el-button
          >
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-table border :data="categoryInfo">
        <el-table-column
          label="编号"
          type="index"
          width="80"
          :index="indexSet"
        ></el-table-column>
        <el-table-column label="分类名" prop="categoryName"></el-table-column>
        <el-table-column label="级别">
          <template slot-scope="scope">
            {{ scope.row.parentId === 0 ? "一级" : "二级" }}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column
          label="查看下一级"
          width="110px"
          v-if="parentId === 0 ? true : false"
        >
          <template slot-scope="scope">
            <el-button size="small" @click="nextLevel(scope.row.id)"
              >下一级</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="
                (showEditDialog = true), (info = scope.row), getParentList()
              "
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="deleteCategory(scope.row.id)"
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
      :parentList="parentList"
      @refresh="getData"
    ></Edit>
    <Add
      @refresh="getData"
      :showAddDialog="showAddDialog"
      @close="showAddDialog = false"
      :parentList="parentList"
    ></Add>
  </div>
</template>

<script>
import {
  categoryList,
  delCategory,
  updateCategory
} from "@/api/productManage/category/category";
import Edit from "./Edit";
import Add from "./Add";
export default {
  data() {
    return {
      categoryInfo: [],
      searchName: "",
      pageIndex: 1,
      pageSize: 5,
      total: 20,
      start: true,
      showEditDialog: false,
      showAddDialog: false,
      info: "",
      parentList: [],
      parentId: 0
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
        categoryName: this.searchName,
        parentId: this.parentId,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      categoryList(this.$qs.stringify(params))
        .then(res => {
          this.$message({
            message: "数据获取成功",
            type: "success"
          });
          that.categoryInfo = res.data.categoryList;
          that.total = res.data.categoryAmount;
        })
        .catch(() => {
          this.$message.error("数据获取失败");
        });
    },
    delCategory,
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
    deleteCategory(id) {
      let that = this;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          that
            .delCategory(that.$qs.stringify({ id: id }))
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
      updateCategory(this.$qs.stringify({ id: data.id, status: data.status }))
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
    getParentList() {
      let that = this;
      categoryList(this.$qs.stringify({ parentId: 0 }))
        .then(res => {
          that.parentList = res.data.categoryList;
        })
        .catch(() => {});
    },
    nextLevel(id) {
      this.parentId = id;
      this.getData();
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
