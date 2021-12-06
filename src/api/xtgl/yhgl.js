import { serviceUrl } from '@/config/base.js'
import request from '@/libs/request'

export function deleteUsers (id) {
  return request({
    url: `${serviceUrl.xtgl}/yhgl/deleteUsers`,
    method: 'post',
    data: {
      id: id
    }
  })
}

export function deleteAllUsers (ids) {
  return request({
    url: `${serviceUrl.xtgl}/yhgl/deleteAllUsers?ids=` + ids,
    method: 'post'
  })
}

export function queryUsers (data) {
  return request({
    url: `${serviceUrl.xtgl}/yhgl/queryUsers`,
    method: 'post',
    data
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
