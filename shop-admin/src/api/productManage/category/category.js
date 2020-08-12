import request from "@/utils/request.js"

export function addCategory(params) {
  return request({
    url: "/category/add",
    method: "post",
    data: params
  })
}

export function delCategory(params) {
  return request({
    url: "/category/del",
    method: "post",
    data: params
  })
}

export function categoryList(params) {
  return request({
    url: "/category/list",
    method: "post",
    data: params
  })
}

export function updateCategory(params) {
  return request({
    url: "/category/update",
    method: "post",
    data: params
  })
}
