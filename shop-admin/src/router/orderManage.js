import Layout from "@/views/layout/App.vue"
export default {
  path: "/orderManage",
  component: Layout,
  name: "OrderManage",
  redirect: "/orderManage/list",
  meta: {
    title: "订单管理"
  },
  children: [
    {
      path: "list",
      name: "OrderList",
      meta: {
        title: "订单列表"
      },
      component: resolve =>
        require(["@/views/orderManage/orderList/Index.vue"], resolve)
    },
    {
      path: "detail",
      name: "OrderDetail",
      meta: {
        title: "订单详情"
      },
      component: resolve =>
        require(["@/views/orderManage/orderDetail/Index.vue"], resolve)
    }
  ]
}
