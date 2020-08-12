import request from "@/utils/request.js"

export function addOrderDetail(params) {
  return request({
    url: "/orderDetail/add",
    method: "post",
    data: params
  })
}

export function delOrderDetail(params) {
  return request({
    url: "/orderDetail/del",
    method: "post",
    data: params
  })
}

export function orderDetailList(params) {
  return request({
    url: "/orderDetail/list",
    method: "post",
    data: params
  })
}

export function updateOrderDetail(params) {
  return request({
    url: "/orderDetail/update",
    method: "post",
    data: params
  })
}
