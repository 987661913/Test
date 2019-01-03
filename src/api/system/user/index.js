import request from '@/utils/request'
export function getUserList(query) {
  return request({
    url: '/api/admin/user/page',
    method: 'get',
    params: query
  })
}

export function addUser(obj) {
  return request({
    url: '/api/admin/user',
    method: 'post',
    data: obj
  })
}

export function getUser(id) {
  return request({
    url: '/api/admin/user/' + id,
    method: 'get'
  })
}

export function deleteUser(id) {
  return request({
    url: '/api/admin/user/' + id,
    method: 'delete'
  })
}

export function updateUser(id, obj) {
  return request({
    url: '/api/admin/user/' + id,
    method: 'put',
    data: obj
  })
}
