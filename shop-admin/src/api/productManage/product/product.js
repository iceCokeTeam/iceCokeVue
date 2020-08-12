import request from "@/utils/request.js"

export function addProduct(params) {
  return request({
    url: "/product/add",
    method: "post",
    data: params
  })
}

export function delProduct(params) {
  return request({
    url: "/product/del",
    method: "post",
    data: params
  })
}

export function productList(params) {
  return request({
    url: "/product/list",
    method: "post",
    data: params
  })
}

export function updateProduct(params) {
  return request({
    url: "/product/update",
    method: "post",
    data: params
  })
}
