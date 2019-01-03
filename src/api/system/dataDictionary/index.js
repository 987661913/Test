import request from '@/utils/request'
// 获取字典树
export function getdicTreee(query) {
  return request({
    url: '/api/admin/dic/tree',
    method: 'get',
    params: query
  })
}
// 新增节点
// this.form.code, this.form.description, this.form.name, this.form.orderNum, this.form.parentCode, this.form.type
export function adddicDetails(
  code,
  description,
  name,
  orderNum,
  parentCode,
  type
) {
  return request({
    url: '/api/admin/dic/',
    method: 'post',
    data: {
      code: code, // 编码(不能重复)
      description: description, // 描述
      // id: id,// 实体编号（唯一标识）
      name: name, // 名称
      orderNum: orderNum, // 排序
      type: type, // 字典类型
      parentCode: parentCode // 父级编码（根节点为（-1））
    }
  })
}
// 获取节点
export function getdicDetails(id) {
  return request({
    url: '/api/admin/dic/' + id,
    method: 'get'
  })
}
// 更新节点
export function updateDetails(id, code, description, name, orderNum, type) {
  return request({
    url: '/api/admin/dic/' + id,
    method: 'put',
    data: {
      id: id,
      code: code, // 编码(不能重复)
      description: description, // 描述
      // id: id,// 实体编号（唯一标识）
      name: name, // 名称
      orderNum: orderNum, // 排序
      type: type // 字典类型
    }
  })
}
// 删除节点
export function deleteDetails(id) {
  return request({
    url: '/api/admin/dic/' + id,
    method: 'delete'
  })
}
