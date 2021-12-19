import request from '@/libs/request'
import { serviceUrl } from '@/config/base.js'
export const login = ({ username, password, code, key }) => {
  const data = {
    username,
    password,
    code,
    key
  }
  return request({
    url: `${serviceUrl.login}/login?username=${username}&password=${password}&code=${code}&key=${key}`,
    method: 'post'
  })
}

export const logout = (username) => {
  return request({
    url: `${serviceUrl.login}/logout?username=${username}`,
    method: 'post'
  })
}
export const getCaptchaImg = () => {
  return request({
    url: `${serviceUrl.login}/captcha`,
    method: 'get'
  })
}
