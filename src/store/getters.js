const getters = {
  navData: state => state.app.navData,
  token: state => state.user.token,
  name: state => state.user.name,
  username: state => state.user.username,
  userid: state => state.user.id,
  head_pic: state => state.user.headPic,
  status: state => state.user.status,
  roles: state => state.user.roles,
  menus: state => state.user.menus,
  elements: state => state.user.elements,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  defaultRedirect: state => state.permission.defaultRedirect
}
export default getters
