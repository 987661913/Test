import request from '@/utils/request'

// 获取部门的Tree
export function getDeptTree() {
  return request({
    url: '/api/admin/group/deptTree',
    method: 'get'
  })
}
// 获取岗位树
export function getPostTree() {
  return request({
    url: '/api/admin/group/postTree',
    method: 'get'
  })
} 
export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/api/auth/jwt/token',
    method: 'post',
    data
  })
}

export function logout(token) {
  return request({
    url: '/api/auth/jwt/invalid',
    method: 'post',
    params: { token }
  })
}

export function getUserInfo(token) {
  return request({
    url: '/api/admin/user/front/info',
    method: 'get',
    params: { token }
  })
}
export function getAllMenus() {
  return request({
    url: '/api/admin/user/front/menu/all',
    method: 'get'
  })
} 
// 用户登录后加载公告(只弹一次)
export function getOnceNotice() {
  return request({
    method: 'get',
    url: '/api/admin/notice/user/notice',
    data: {}
  })
}
// 阅读公告(表示客户已读)
export function alreadyReadNotice(id) {
  return request({
    method: 'put',
    url: '/api/admin/notice/' + id + '/read',
    data: {
      notice: {
        id: id
      }
    }
  })
}
// 获取公告配置信息
export function getConfigGet() {
  return request({
    url: '/api/admin/config/get',
    method: 'get'
  })
}
