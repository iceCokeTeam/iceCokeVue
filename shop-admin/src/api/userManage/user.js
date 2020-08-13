import request from "@/utils/request.js"

export function delUser(params) {
  return request({
    url: "/user/del",
    method: "post",
    data: params
  })
}

export function userById(params) {
  return request({
    url: "/user/id",
    method: "post",
    data: params
  })
}

export function userList(params) {
  return request({
    url: "/user/list",
    method: "post",
    data: params
  })
}

export function updateUser(params) {
  return request({
    url: "/user/update",
    method: "post",
    data: params
  })
}

export function userRegister(params) {
  return request({
    url: "/user/register",
    method: "post",
    data: params
  })
}
