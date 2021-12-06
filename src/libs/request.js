/**
 *   @description 接口请求拦截
 *   @author Xiaohui Zeng
 *   @date 2020/5/14
 */
import axios from 'axios'
import {Message} from 'view-design'
import { getToken, getLoginInfo } from '@/libs/util'
// 创建一个axios实例
const service = axios.create({
  timeout: 30000, // 请求超时时间 默认30秒
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
service.interceptors.request.use(config => {
  // 封装token
  const token = getToken()
  if (token) {
    const loginInfo = JSON.parse(getLoginInfo()) // 用户信息 获取方式
    config.headers['token'] = token
    config.headers['password'] = loginInfo.password
  }
  return config
},
error => {
  // debug
  return Promise.reject(error)
}
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      Message.warning(res.msg || 'Error')
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Message.error(error.msg || 'Error')
    return Promise.reject(error)
  }
)

export default service
