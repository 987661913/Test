import request from '@/utils/request'
// 新增文件夹
export function addDirectory(icon, name, type, parentId, typeId) {
  return request({
    method: 'post',
    url: '/api/admin/directory',
    data: {
      icon: icon,
      name: name,
      type: type,
      parentId: parentId,
      typeId: typeId
    }
  })
}
// 获取文件夹列表
export function getDirectoryAll() {
  return request({
    method: 'get',
    url: '/api/admin/directory/tree',
    data: {}
  })
}
// 删除当前节点
export function deleteDirectoryOne(id) {
  return request({
    method: 'delete',
    url: '/api/admin/directory/' + id,
    data: {}
  })
}
// 查询当前节点
export function getDirectoryOne(id) {
  return request({
    method: 'get',
    url: '/api/admin/directory/' + id,
    data: {}
  })
}
// 更新文件夹
export function updateDirectory(icon, name, type, parentId, typeId, id) {
  return request({
    method: 'put',
    url: '/api/admin/directory/' + id,
    data: {
      icon: icon,
      name: name,
      type: type,
      // parentId: parentId,
      typeId: typeId,
      id: id
    }
  })
}
// 图片上传
export function uploadImg(data, fileId) {
  return request({
    method: 'post',
    url: '/api/admin/file/upload?fileId=' + fileId,
    data: data
  })
}
// 获取分类下的文件列表
export function getUploadFile(fileId, name) {
  return request({
    method: 'get',
    url: '/api/admin/file/' + fileId + '/list?name=' + name,
    data: {}
  })
}
export function deleteDirectoryFile(id) {
  return request({
    method: 'delete',
    url: '/api/admin/file/' + id,
    data: {}
  })
}
