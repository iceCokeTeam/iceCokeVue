export default {
  name: "商品管理",
  permissionsKey: "",
  icon: "fa fa-shopping-bag",
  children: {
    productList: {
      name: "商品列表",
      permissionsKey: "",
      path: "/productManage/list"
    },
    addProduct: {
      name: "添加商品",
      permissionsKey: "",
      path: "/productManage/add"
    },
    categoryList: {
      name: "商品分类",
      permissionsKey: "",
      path: "/productManage/category"
    },
    brandList: {
      name: "品牌管理",
      permissionsKey: "",
      path: "/productManage/brand"
    }
  }
}
