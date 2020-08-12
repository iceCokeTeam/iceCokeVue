import Layout from "@/views/layout/App.vue"
export default {
  path: "/productManage",
  component: Layout,
  name: "ProductManage",
  redirect: "/productManage/list",
  meta: {
    title: "商品管理"
  },
  children: [
    {
      path: "list",
      name: "ProductList",
      meta: {
        title: "商品列表"
      },
      component: resolve =>
        require(["@/views/productManage/productList/Index.vue"], resolve)
    },
    {
      path: "add",
      name: "AddProduct",
      meta: {
        title: "添加商品"
      },
      component: resolve =>
        require(["@/views/productManage/addProduct/Index.vue"], resolve)
    },
    {
      path: "category",
      name: "ProductCategory",
      meta: {
        title: "分类管理"
      },
      component: resolve =>
        require(["@/views/productManage/productCategory/Index.vue"], resolve)
    },
    {
      path: "brand",
      name: "ProductBrand",
      meta: {
        title: "品牌管理"
      },
      component: resolve =>
        require(["@/views/productManage/productBrand/Index.vue"], resolve)
    }
  ]
}
