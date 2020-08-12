import Layout from "@/views/layout/App.vue"
export default {
  path: "/userManage",
  component: Layout,
  name: "UserManage",
  redirect: "/userManage/list",
  meta: {
    title: "用户管理"
  },
  children: [
    {
      path: "list",
      name: "UserList",
      meta: {
        title: "用户列表"
      },
      component: resolve =>
        require(["@/views/userManage/userList/Index.vue"], resolve)
    }
  ]
}
