import request from "@/utils/request.js"

export function addBrand(params) {
  return request({
    url: "/brand/add",
    method: "post",
    data: params
  })
}

export function brandList(params) {
  return request({
    url: "/brand/list",
    method: "post",
    data: params
  })
}

export function delBrand(params) {
  return request({
    url: "/brand/del",
    method: "post",
    data: params
  })
}

export function brandByName(params) {
  return request({
    url: "/brand/brandName",
    method: "post",
    data: params
  })
}

export function updateBrand(params) {
  return request({
    url: "/brand/update",
    method: "post",
    data: params
  })
}
