import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ws from '@/utils/ws'

import './assets/scss/common.scss'

Vue.prototype.$ws = ws
Vue.use(ElementUI)

Vue.config.productionTip = false
/*
  全局过滤器
*/
Vue.filter('local', function (time) {
  const isNumber = Object.prototype.toString.call(time).slice(8, -1) === 'Number'
  const str = String(time)

  if (!time || !isNumber || str.length !== 13) return ''
  var now = new Date(time)
  var y = now.getFullYear()
  var m = now.getMonth() + 1
  var d = now.getDate()
  return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + now.toTimeString().substr(0, 8)
})

new Vue({
  render: h => h(App)
}).$mount('#app')
