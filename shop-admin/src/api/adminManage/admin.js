import request from "@/utils/request.js"

export function adminList(params) {
  return request({
    url: "/admin/list",
    method: "post",
    data: params
  })
}

export function adminLogin(params) {
  return request({
    url: "/admin/login",
    method: "post",
    data: params
  })
}

export function adminRegister(params) {
  return request({
    url: "/admin/register",
    method: "post",
    data: params
  })
}

export function updateAdmin(params) {
  return request({
    url: "/admin/update",
    method: "post",
    data: params
  })
}

export function delAdmin(params) {
  return request({
    url: "/admin/del",
    method: "post",
    data: params
  })
}
