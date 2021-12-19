import { serviceUrl } from '@/config/base.js'
import request from '@/libs/request'

export function deleteUsers (id) {
  return request({
    url: `${serviceUrl.xtgl}/yhgl/deleteUsers?id=${id}`,
    method: 'post'
  })
}

export function deleteAllUsers (ids) {
  return request({
    url: `${serviceUrl.xtgl}/yhgl/deleteAllUsers?ids=${ids}`,
    method: 'post'
  })
}

export function queryUsers (username) {
  return request({
    url: `${serviceUrl.xtgl}/yhgl/queryUsers?username=${username}`,
    method: 'post'
  })
}

export function insertUsers (data) {
  return request({
    url: `${serviceUrl.xtgl}/yhgl/insertUsers`,
    method: 'post',
    data
  })
}

export function updateUsers (data) {
  return request({
    url: `${serviceUrl.xtgl}/yhgl/updateUsers`,
    method: 'post',
    data
  })
}

export function updateUserRoles (data) {
  return request({
    url: `${serviceUrl.xtgl}/yhgl/updateUserRoles`,
    method: 'post',
    data: data
  })
}
