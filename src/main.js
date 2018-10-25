// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import "../static/js/adaptive.js"
//import "../static/js/lrz.js"
//import "../static/js/exif.js"
//import "../static/js/mobileFix.mini.js"

//設置全局請求頭

Vue.config.productionTip = false
import axios from 'axios'
Vue.prototype.$http = axios;
import {
	WechatPlugin,
	AjaxPlugin
} from 'vux'
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)

//引入mintui
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

//Vue.use(WechatPlugin)
//const wx = Vue.wechat
//const http = Vue.http
//http.post(API_URL ).then(res => {
//console.log(res.data)
//wx.config(res.data)
//})

//var payurl = window.location.href; // 获取当前页面的url
//Vue.prototype.$http({
//		method: "post",
//		url: "http://yinhan-media.weiyingjia.org/api/yinhan/jsconfig",
//		data: {
//			url: payurl
//		}
//	})
//	.then(res => {
////		console.log(res)
//		Vue.wechat.config(res.data)
//		//拿到相对应的数据
//		// appId": "wx4b964bf878376e8d",
//		// "nonceStr": "uOQCJ2xHw8",
//		// "timestamp": 1528623205,
//		// "url": "http://yinhan-media.weiyingjia.org/app/index.html",
//		//  "signature": "2f18808139cdb560017899e34d76072cf603c0e7"
//
//	})
//	.catch(res => {
//		//		console.log(res);
//		throw res
//	});

//引入jquery
import $ from 'jquery'
//引入vux

import {
	Datetime,
	Group
} from 'vux'
Vue.component(Datetime.name, Datetime);
Vue.component(Group.name, Group);

//引入vue-directive-image-previewer 点击图片放大
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
Vue.use(VueDirectiveImagePreviewer)

//引入懒加载vue-lazyload
import VueLazyload from 'vue-lazyload' //引入这个懒加载插件
//Vue.use(VueLazyload)
Vue.use(VueLazyload, {
	loading: require('../static/img/1.png')
})

import App from './App'

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})
