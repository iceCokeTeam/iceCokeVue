import Layout from "@/views/layout/App.vue"
export default {
  path: "/adminManage",
  component: Layout,
  name: "AdminManage",
  redirect: "/adminManage/list",
  meta: {
    title: "权限管理"
  },
  children: [
    {
      path: "list",
      name: "AdminList",
      meta: {
        title: "管理员列表"
      },
      component: resolve =>
        require(["@/views/adminManage/adminList/Index.vue"], resolve)
    },
    {
      path: "authority",
      name: "AddAdmin",
      meta: {
        title: "管理员权限"
      },
      component: resolve =>
        require(["@/views/adminManage/adminAuthority/Index.vue"], resolve)
    }
  ]
}
