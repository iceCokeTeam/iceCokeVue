<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-input v-model="searchName" placeholder="品牌名"></el-input>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="search">搜索</el-button>
        </el-col>
        <el-col :span="14">
          <el-button plain @click="reset, (showAddDialog = true)"
            >添加</el-button
          >
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-table border :data="brandInfo">
        <el-table-column
          label="编号"
          type="index"
          width="80px"
          :index="indexSet"
        ></el-table-column>
        <el-table-column label="品牌名" prop="brandName"></el-table-column>
        <el-table-column label="logo">
          <template slot-scope="scope">
            <img :src="scope.row.logo" alt="" class="image" />
          </template>
        </el-table-column>
        <el-table-column label="介绍" prop="introduce"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="editInfo(scope.row), (showEditDialog = true)"
              >编辑</el-button
            >
            <el-button type="danger" @click="deleteBrand(scope.row.id)"
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
      @reset="reset"
      @refresh="getData"
    ></Edit>
    <Add
      @refresh="getData"
      :showAddDialog="showAddDialog"
      @close="showAddDialog = false"
      @reset="reset"
    ></Add>
  </div>
</template>

<script>
import {
  brandList,
  delBrand,
  updateBrand
} from "@/api/productManage/brand/brand";
import Edit from "./Edit";
import Add from "./Add";
export default {
  data() {
    return {
      brandInfo: [],
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
        brandName: this.searchName,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      brandList(this.$qs.stringify(params))
        .then(res => {
          this.$message({
            message: "数据获取成功",
            type: "success"
          });
          that.brandInfo = res.data.brandList;
          that.total = res.data.brandAmount;
        })
        .catch(() => {
          this.$message.error("数据获取失败");
        });
    },
    delBrand,
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
    deleteBrand(id) {
      let that = this;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          that
            .delBrand(that.$qs.stringify({ id: id }))
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
      updateBrand(this.$qs.stringify({ id: data.id, status: data.status }))
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
    editInfo(data) {
      this.info = {
        id: data.id,
        brandName: data.brandName,
        logo: "",
        introduce: data.introduce
      };
    },
    reset() {
      this.info = {
        id: "",
        brandName: "",
        logo: "",
        introduce: ""
      };
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
.image {
  width: 100px;
  height: 100px;
}
</style>
