<template> <div></div></template>

<script>
import { topics } from "@/api/articleManage/list";
// import { exportCvsTable } from "@/utils/cvs";
// import { resetObject } from "@/utils/common";
// import Edit from "./Edit.vue";
import { adminList } from "@/api/adminManage/admin";
export default {
  data() {
    return {
      searchParams: {
        title: "",
        type: ""
      },
      showEditDialog: false,
      tableData: []
    };
  },
  created() {
    topics()
      .then(r => {
        this.tableData = r;
      })
      .catch(() => {});
    adminList()
      .then(r => {
        console.log(r);
      })
      .catch(c => {
        console.log(c);
      });
  }
};
</script>
