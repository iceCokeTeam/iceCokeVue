import Vue from "vue"
import App from "./App.vue"
import elementUi from "element-ui"
import Config from "@/config/app"
import "@/assets/css/style.scss"
import router from "./router"
import store from "./store"
import "@/utils/v-auth.js"
import { getToken } from "@/utils/common"
import "./components"
import Qs from "qs"

Vue.config.productionTip = false
Vue.prototype.GlobalCfg = Config
Vue.prototype.$qs = Qs
Vue.prototype.$store = store
Vue.use(elementUi)

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
    ? to.meta.title + "-" + Config.siteName
    : Config.siteName
  if (!getToken() && to.path !== "/login") {
    next({ path: "/login" })
  } else {
    next()
  }
})

Date.prototype.Format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    )
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      )
  return fmt
}

Vue.filter("timeFilter", function(d) {
  var date = new Date(d)
  return date.Format("yyyy-MM-dd HH:mm:ss")
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
