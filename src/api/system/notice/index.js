import request from '@/utils/request'
// 新增公告
export function addNotice(title, content, publishDept) {
  return request({
    method: 'post',
    url: '/api/admin/notice',
    data: {
      notice: {
        content: content,
        isPublish: true,
        publishDept: publishDept,
        title: title,
        type: 1
      },
      roles: []
    }
  })
}
// 查询公告列表
export function noticeList(page, limit) {
  return request({
    method: 'get',
    url: '/api/admin/notice/list?page=' + page + '&limit=' + limit,
    data: {
      page: page,
      limit: limit
    }
  })
}
// 查询单个公告
export function queryNotice(id) {
  return request({
    method: 'get',
    url: '/api/admin/notice/' + id,
    data: {
      id: id
    }
  })
}
// 重新发布
export function againNotice(id, isAgain) {
  return request({
    method: 'get',
    url: '/api/admin/notice/' + id + '/publish' + '?isAgain=' + isAgain,
    data: {
      id: id,
      isAgain: isAgain
    }
  })
}
// 更新公告
export function updateNotice(id, title, content, publishDept) {
  return request({
    method: 'put',
    url: '/api/admin/notice/' + id,
    data: {
      notice: {
        id: id,
        content: content,
        isPublish: true,
        publishDept: publishDept,
        title: title,
        type: 1
      },
      roles: []
    }
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
