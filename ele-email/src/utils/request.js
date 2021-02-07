import axios from 'axios'

import { message } from '@/utils/message'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

export const baseURL =
  process.env.NODE_ENV === 'production' ? process.env.VUE_APP_ROOT_API : ''
// 创建Axios实例
const service = axios.create({
  baseURL, // 如果是开发环境 则不配置基础路径，使用proxyTable进行代理，否则则使用 nginx解决跨域问题
  timeout: 10000 // 超时时间
})

// 请求数据拦截器
service.interceptors.request.use(
  config => {
    NProgress.start()
    return config
  },
  error => {
    // eslint-disable-next-line no-console
    console.error(error)
    Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    NProgress.done()
    const res = response.data
    if (res instanceof Blob) {
      return res
    }
    if (res.code !== 200 || response.status !== 200) {
      message.error(res.msg)
    } else {
      return res
    }
  }, (error) => {
    message.error(error.msg || error.toString())
    NProgress.done()
  }
)

export default service
