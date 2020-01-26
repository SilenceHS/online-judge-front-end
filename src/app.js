// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
import '@babel/polyfill';
import Vue from 'vue';

import App from 'components/App';
import Login from 'components/login/index';
import Register from 'components/register/index';
import animated from 'animate.css'
import Main from 'components/app/app-frame'

// import routerConfig from 'js/config/router-config';
import VueRouter from 'vue-router';
import vueResource from "vue-resource"
import store from 'js/vuex/store';
require('./css/app.less');

// 开发环境判断
// process.env.NODE_ENV == 'development'

// 使用mock文件， 自己开发的时候请删除

// HeyUI已经设定为全局变量，无需引用
// 设定全局变量请参考根目录下的hey.conf.js文件

Vue.use(HeyUI);
Vue.use(VueRouter);
Vue.use(animated);
Vue.use(vueResource);
// const router = routerConfig();
var router = new VueRouter({
	routes: [{
			path: '/',
			component: (resolve) => require(['components/app/app-frame'], resolve),
			children:[
				
			]
		},
		{
			path: '/login',
			component: (resolve) => require(['components/login/index'], resolve),
		},
		{
			path: '/register',
			component: (resolve) => require(['components/register/index'], resolve),
		},
		{
			path: '/active',
			component: (resolve) => require(['components/active/index'], resolve),
		},



	]
})
export default new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
