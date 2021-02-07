import Vue from 'vue'
import App from './App.vue'
import element from 'element-ui'

import '@/assets/scss/common.scss'

Vue.use(element)

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
}).$mount('#app')
