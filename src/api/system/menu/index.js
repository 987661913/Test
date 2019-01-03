import request from '@/utils/request'

export function getMenuTree(query) {
  return request({
    url: '/api/admin/menu/tree',
    method: 'get',
    params: query
  })
}

export function addMenu(obj) {
  return request({
    url: '/api/admin/menu',
    method: 'post',
    data: obj
  })
}

export function getMenu(id) {
  return request({
    url: '/api/admin/menu/' + id,
    method: 'get'
  })
}

export function deleteMenu(id) {
  return request({
    url: '/api/admin/menu/' + id,
    method: 'delete'
  })
}

export function updateMenu(id, obj) {
  return request({
    url: '/api/admin/menu/' + id,
    method: 'put',
    data: obj
  })
}
