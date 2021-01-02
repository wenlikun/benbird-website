import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import Element from 'element-ui'
// 解决el-dialog隐藏和出现导致页面抖动问题
Element.Dialog.props.lockScroll.default = false;
import './styles/element-variables.scss'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'

import './icons/index'

// 注册全局过滤器
import * as filters from '@/filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

Vue.use(Element)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
