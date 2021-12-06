import request from '@/libs/request'
import { serviceUrl } from '@/config/base.js'
export const login = ({ username, password }) => {
  const data = {
    username,
    password
  }
  return request({
    url: `${serviceUrl.login}/login`,
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return request({
    url: `${serviceUrl.login}/get_info`,
    params: {
      token
    },
    method: 'get'
  })
}
