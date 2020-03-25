// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
import '@babel/polyfill';
import Vue from 'vue';

import App from 'components/App';
import Login from 'components/login/index';
import Register from 'components/register/index';
import animated from 'animate.css'
import Main from 'components/app/app-frame'
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'


// import routerConfig from 'js/config/router-config';
import VueRouter from 'vue-router';
import vueResource from "vue-resource"
import Parms from "js/common/Parms"
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
Vue.use(VueCodeMirror)
Vue.prototype.Parms = Parms
// const router = routerConfig();
var router = new VueRouter({
	routes: [{
		path: '/',
		component: (resolve) => require(['components/app/app-frame'], resolve),
		children: [
			{
				path: '',
				name: 'Home',
				component: (resolve) => require(['components/main/mainpage'], resolve),
				meta: {
					title: '首页',
					type: 'login'
				},
			},
			{
				path: 'list',
				component: (resolve) => require(['components/list/list'], resolve),
				meta: {
					title: '官方题库',
					type: 'login'
				},
			},
			{
				path: 'quiz',
				component: (resolve) => require(['components/list/quiz'], resolve),
				meta: {
					title: '题目详情',
					type: 'login'
				},
			},
			{
				path: 'officialModify',
				component: (resolve) => require(['components/list/adminList'], resolve),
				meta: {
					title: '管理官方题库',
					type: 'admin'
				},
			},
			{
				path: 'addQuiz',
				name:"addQuiz",
				component: (resolve) => require(['components/list/addQuiz'], resolve),
				meta: {
					title: '添加题目',
					
					type: 'login'
				},
			},

		]
	},
	{
		path: '/login',
		component: (resolve) => require(['components/login/index'], resolve),
		meta: {
			title: '登录',
			type: ''
		},
	},
	{
		path: '/register',
		component: (resolve) => require(['components/register/index'], resolve),
		meta: {
			title: '注册',
			type: ''
		},
	},
	{
		path: '/active',
		component: (resolve) => require(['components/active/index'], resolve),
		meta: {
			title: '激活',
			type: ''
		},
	},



	]
})
router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title
	}
	const type = to.meta.type
	console.log(to)
	console.log(from)
	// 判断该路由是否需要登录权限
	var User = JSON.parse(localStorage.getItem('User'));
	console.log(User)
	if (type == 'login') {
		if (User == null) {
			alert("登录失败")
			next('/login')

		}
		else {
			next()
		}
	}
	else if (type == 'admin') {
		if (User == null || User.type!=2) {
			alert("登录失败")
			next('/login')
		}
		else {
			next()
		}
	}
	else {
		next()
	}
})
export default new Vue({
	router,
	render: h => h(App)
}).$mount('#app');
