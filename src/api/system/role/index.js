import request from '@/utils/request'
// 获取所有的角色类型
export function getAllGroupTypes() {
  return request({
    url: '/api/admin/groupType/all',
    method: 'get'
  })
}
// 获取角色树
export function getRoleTree(query) {
  return request({
    url: '/api/admin/group/tree',
    method: 'get',
    params: query
  })
}
// 添加一个角色
export function addRole(obj) {
  return request({
    url: '/api/admin/group',
    method: 'post',
    data: obj
  })
}

export function getRole(id) {
  return request({
    url: '/api/admin/group/' + id,
    method: 'get'
  })
}

export function deleteRole(id) {
  return request({
    url: '/api/admin/group/' + id,
    method: 'delete'
  })
}
export function isLeader(groupId, userId, isLeader) {
  return request({
    url: '/api/admin/user/isLeader',
    method: 'post',
    data: {
      groupId: groupId,
      userId: userId,
      isLeader: isLeader ? '1' : '0'
    }
  })
}

export function updateRole(id, obj) {
  return request({
    url: '/api/admin/group/' + id,
    method: 'put',
    data: obj
  })
}

export function getRoleUsersByType(type) {
  return request({
    url: '/api/admin/group/type/' + type + '/users',
    method: 'get'
  })
}

export function getUsers(id) {
  return request({
    url: '/api/admin/group/' + id + '/user',
    method: 'get'
  })
}

export function addUserInRole(roleId, userid, isLeader) {
  return request({
    url: '/api/admin/group/' + roleId + '/user',
    method: 'post',
    params: {
      userId: userid,
      isLeader: isLeader ? '1' : '0'
    }
  })
}
export function deleteUser(id, userid) {
  return request({
    url: '/api/admin/group/' + id + '/user',
    method: 'delete',
    params: userid
  })
}

export function removeElementAuthority(id, data) {
  return request({
    url: '/api/admin/group/' + id + '/authority/element/remove',
    method: 'post',
    params: data
  })
}

export function addElementAuthority(id, data) {
  return request({
    url: '/api/admin/group/' + id + '/authority/element/add',
    method: 'post',
    params: data
  })
}

export function getElementAuthority(id) {
  return request({
    url: '/api/admin/group/' + id + '/authority/element',
    method: 'get'
  })
}

export function modifyMenuAuthority(id, data) {
  return request({
    url: '/api/admin/group/' + id + '/authority/menu',
    method: 'post',
    params: data
  })
}

export function getMenuAuthority(id) {
  return request({
    url: '/api/admin/group/' + id + '/authority/menu',
    method: 'get'
  })
}
