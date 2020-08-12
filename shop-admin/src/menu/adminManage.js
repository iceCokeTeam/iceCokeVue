export default {
  name: "权限管理",
  permissionsKey: "",
  icon: "fa fa-key",
  children: {
    adminList: {
      name: "管理员列表",
      permissionsKey: "",
      path: "/adminManage/list"
    },
    adminAuthority: {
      name: "管理员权限",
      permissionsKey: "",
      path: "/adminManage/authority"
    }
  }
}
