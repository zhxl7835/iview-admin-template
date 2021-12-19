import { serviceUrl } from '@/config/base.js'
import request from '@/libs/request'

export function queryMenus () {
  return request({
    url: `${serviceUrl.xtgl}/cdgl/queryMenus`,
    method: 'post'
  })
}

export function insertMenus (data) {
  return request({
    url: `${serviceUrl.xtgl}/cdgl/insertMenus`,
    method: 'post',
    data: data
  })
}

export function updateMenus (data) {
  return request({
    url: `${serviceUrl.xtgl}/cdgl/updateMenus`,
    method: 'post',
    data: data
  })
}

export function deleteMenus (id) {
  return request({
    url: `${serviceUrl.xtgl}/cdgl/deleteMenus?id=${id}`,
    method: 'post'
  })
}
