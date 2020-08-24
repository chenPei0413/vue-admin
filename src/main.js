import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api';
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import './icons/index.js'
Vue.use(ElementUI).use(VueCompositionApi);

Vue.config.productionTip = false
import '@/style/common.less'
import '@/style/elementUi.less'
import 'element-ui/lib/theme-chalk/index.css';
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
