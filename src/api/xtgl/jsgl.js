import { serviceUrl } from '@/config/base.js'
import request from '@/libs/request'

export function queryRoles (name) {
  return request({
    url: `${serviceUrl.xtgl}/jsgl/queryRoles?name=${name}`,
    method: 'post'
  })
}

export function insertRoles (data) {
  return request({
    url: `${serviceUrl.xtgl}/jsgl/insertRoles`,
    method: 'post',
    data: data
  })
}

export function updateRoles (data) {
  return request({
    url: `${serviceUrl.xtgl}/jsgl/updateRoles`,
    method: 'post',
    data: data
  })
}

export function deleteRoles (id) {
  return request({
    url: `${serviceUrl.xtgl}/jsgl/deleteRoles?id=${id}`,
    method: 'post'
  })
}

export function deleteAllRoles (ids) {
  return request({
    url: `${serviceUrl.xtgl}/jsgl/deleteAllRoles?ids=${ids}`,
    method: 'post'
  })
}

export function queryMenus (roleId) {
  return request({
    url: `${serviceUrl.xtgl}/jsgl/queryMenus?roleId=${roleId}`,
    method: 'post'
  })
}

export function updateRoleMenus (data) {
  return request({
    url: `${serviceUrl.xtgl}/jsgl/updateRoleMenus`,
    method: 'post',
    data: data
  })
}
