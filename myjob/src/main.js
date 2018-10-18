// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './stroe/index'
import fastclick from 'fastclick'
import axios from "axios";
import qs from "qs";
import '../static/css/main.css'
import '../static/js/fontSize.js'
import wxShowMenu from "../static/js/share.js";
fastclick.attach(document.body);
//提交用户信息
axios
  .post(
    "/goodscall/api/member/addMember",
    qs.stringify({
      openId: window.openId || 123,
      customerId: window.customerId,
      headImageUrl: window.user.headimgurl || 'http://www.swisse-china.com.cn/swisse-wmall/activityDemo/shoppingGuide/index.html?_campaign=20181015095645_11590',
      nickName: window.user.nickname || 'test'
    })
  )
  .then(function (data) {
    
  })
  .catch(function (error) {
    console.log(error);
  });
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
