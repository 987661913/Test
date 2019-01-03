import request from '@/utils/request'

export function getRoleTypeList(query) {
  return request({
    url: '/api/admin/groupType/page',
    method: 'get',
    params: query
  })
}

export function addRoleType(obj) {
  return request({
    url: '/api/admin/groupType',
    method: 'post',
    data: obj
  })
}

export function getRoleType(id) {
  return request({
    url: '/api/admin/groupType/' + id,
    method: 'get'
  })
}

export function deleteRoleType(id) {
  return request({
    url: '/api/admin/groupType/' + id,
    method: 'delete'
  })
}

export function updateRoleType(id, obj) {
  return request({
    url: '/api/admin/groupType/' + id,
    method: 'put',
    data: obj
  })
}
