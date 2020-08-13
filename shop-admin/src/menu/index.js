import adminManage from "./adminManage"
import orderManage from "./orderManage"
import productManage from "./productManage"
import userManage from "./userManage"

/**
 * 首页
 * @type {{name: string, path: string, icon: string}}
 */
let home = {
  name: "首页",
  path: "/",
  permissionsKey: "",
  icon: "fa fa-tachometer"
}

export default {
  home,
  adminManage,
  userManage,
  productManage,
  orderManage
  //helpCenter
}
