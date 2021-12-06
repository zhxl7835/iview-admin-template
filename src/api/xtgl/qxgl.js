import { serviceUrl } from '@/config/base.js'
import request from '@/libs/request'

export function queryUsers () {
  return request({
    url: `${serviceUrl.xtgl}/qxgl/queryUsers`,
    method: 'post'
  })
}
export function getAccess (username) {
  return request({
    url: `${serviceUrl.xtgl}/qxgl/getAccess`,
    method: 'post',
    data: {
      username: username
    }
  })
}
