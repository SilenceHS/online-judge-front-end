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
require('./css/app.less');

// 开发环境判断
// process.env.NODE_ENV == 'development'

// 使用mock文件， 自己开发的时候请删除

// HeyUI已经设定为全局变量，无需引用
// 设定全局变量请参考根目录下的hey.conf.js文件

Vue.use(HeyUI);
Vue.use(VueRouter);
Vue.use(animated);
// const router = routerConfig();
var router=new VueRouter({
  routes:[
	{path:'/',component:Main},
    {path:'/login',component:Login},
    {path:'/register',component:Register},

  ]
})
export default new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
