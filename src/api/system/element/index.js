import request from '@/utils/request'

export function getElementList(query) {
  return request({
    url: '/api/admin/element/page',
    method: 'get',
    params: query
  })
}

export function getElementsByMenuId(menuId, name) {
  return request({
    url: '/api/admin/element/list',
    method: 'get',
    params: {
      menuId: menuId,
      name: name // 非必须值，以Name作为搜索条件
    }
  })
}

export function addElement(obj) {
  return request({
    url: '/api/admin/element',
    method: 'post',
    data: obj
  })
}

export function getElement(id) {
  return request({
    url: '/api/admin/element/' + id,
    method: 'get'
  })
}

export function deleteElement(id) {
  return request({
    url: '/api/admin/element/' + id,
    method: 'delete'
  })
}

export function updateElement(id, obj) {
  return request({
    url: '/api/admin/element/' + id,
    method: 'put',
    data: obj
  })
}
