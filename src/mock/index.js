import Mock from 'mockjs'
// import loginAPI from './login'
// import userAPI from './system/user'
// import elementAPI from './system/element'
// import muneApi from './system/menu'
// import roleTypeApi from './system/roleType'
// import roleApi from './system/role'
// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
if (process.env.NODE_ENV !== 'production') {
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false
    }
    this.proxy_send(...arguments)
  }

  Mock.setup({
    timeout: '350-600'
  })

  // 登录相关/api/auth/jwt/token
  // Mock.mock(/\/api\/auth\/jwt\/token/, 'post', loginAPI.loginByUsername)
  // Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
  // Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

  // // 模拟用户操作的接口
  // Mock.mock(/\/api\/admin\/user\/page\?*/, 'get', userAPI.getUserList)
  // Mock.mock(/\/api\/admin\/user$/, 'post', userAPI.addUser)
  // Mock.mock(/\/api\/admin\/user\/[\w\d]+/, 'get', userAPI.getUser)
  // Mock.mock(/\/api\/admin\/user\/[\w\d]+/, 'delete', userAPI.deleteUser)
  // Mock.mock(/\/api\/admin\/user\/[\w\d]+/, 'put', userAPI.updateUser)

  // // 模拟资源操作的接口
  // Mock.mock(/\/api\/admin\/element\/page\?*/, 'get', elementAPI.getElementList)
  // Mock.mock(/\/api\/admin\/element/, 'post', elementAPI.addElement)
  // Mock.mock(/\/api\/admin\/element\/[\w\d]+/, 'get', elementAPI.getElement)
  // Mock.mock(/\/api\/admin\/element\/[\w\d]+/, 'delete', elementAPI.deleteElement)
  // Mock.mock(/\/api\/admin\/element\/[\w\d]+/, 'put', elementAPI.updateElement)
  // // 操作资源菜单接口
  // Mock.mock(/\/api\/admin\/menu\/tree\?*/, 'get', muneApi.getMenuTree)
  // Mock.mock(/\/api\/admin\/menu$/, 'post', muneApi.addMenu)
  // Mock.mock(/\/api\/admin\/menu\/[\w\d]+/, 'get', muneApi.getMenu)
  // Mock.mock(/\/api\/admin\/menu\/[\w\d]+/, 'delete', muneApi.deleteMenu)
  // Mock.mock(/\/api\/admin\/menu\/[\w\d]+/, 'put', muneApi.updateMenu)

  // // 角色类型操作接口
  // Mock.mock(/\/api\/admin\/groupType\/all$/, 'get', roleApi.getAllGroupTypes)
  // Mock.mock(/\/api\/admin\/groupType\/page\?*/, 'get', roleTypeApi.getRoleTypeList)
  // Mock.mock(/\/api\/admin\/groupType$/, 'post', roleTypeApi.addRoleType)
  // Mock.mock(/\/api\/admin\/groupType\/[\w\d]+/, 'get', roleTypeApi.getRoleType)
  // Mock.mock(/\/api\/admin\/groupType\/[\w\d]+/, 'delete', roleTypeApi.deleteRoleType)
  // Mock.mock(/\/api\/admin\/groupType\/[\w\d]+/, 'put', roleTypeApi.updateRoleType)
  // 角色分配接口  还未调通
  // Mock.mock(/\/api\/admin\/group\/[\w\d]+\/authority\/element\/remove\?.*/, 'post', roleApi.removeElementAuthority)
  // Mock.mock(/\/api\/admin\/group\/[\w\d]+\/authority\/element\/add\?.*/, 'post', roleApi.addElementAuthority)
  // Mock.mock(/\/api\/admin\/group\/[\w\d]+\/authority\/element$/, 'get', roleApi.getElementAuthority)
  // Mock.mock(/\/api\/admin\/group\/[\w\d]+\/authority\/menu$/, 'get', roleApi.getMenuAuthority)
  // Mock.mock(/\/api\/admin\/group\/[\w\d]+\/authority\/menu\?.*/, 'post', roleApi.modifyMenuAuthority)
  // Mock.mock(/\/api\/admin\/group\/[\w\d]+\/user$/, 'get', roleApi.getUsers)
  // Mock.mock(/\/api\/admin\/group\/[\w\d]+\/user$/, 'put', roleApi.modifyUsers)
  // 已调通接口
  // Mock.mock(/\/api\/admin\/group\/tree\?.*/, 'get', roleApi.getRoleTree)
  // Mock.mock(/\/api\/admin\/group$/, 'post', roleApi.addRole)
  // Mock.mock(/\/api\/admin\/group\/[\w\d]+$/, 'get', roleApi.getRole)
  // Mock.mock(/\/api\/admin\/group\/[\w\d]+$/, 'delete', roleApi.deleteRole)
  // Mock.mock(/\/api\/admin\/group\/[\w\d]+$/, 'put', roleApi.updateRole)
}

export default Mock
