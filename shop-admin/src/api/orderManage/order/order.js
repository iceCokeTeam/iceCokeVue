import request from "@/utils/request.js"

export function addOrder(params) {
  return request({
    url: "/order/list",
    method: "post",
    data: params
  })
}

export function delOrder(params) {
  return request({
    url: "/order/del",
    method: "post",
    data: params
  })
}

export function orderList(params) {
  return request({
    url: "/order/list",
    method: "post",
    data: params
  })
}

export function updateOrder(params) {
  return request({
    url: "/order/update",
    method: "post",
    data: params
  })
}
