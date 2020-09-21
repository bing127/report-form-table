import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';


import basicContainer from './components/basic-container/main';
//注册全局容器
Vue.component('basicContainer', basicContainer)

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});