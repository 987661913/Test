export default {
  getRoleTypeList(query) {
    return {
      status: 200,
      data: {
        total: 5,
        rows: [
          {
            id: '1',
            code: 'role',
            name: '角色类型',
            description: 'role',
            updTime: '2017-08-25 17:52:37',
            updUser: '1',
            updName: 'Mr.AG',
            updHost: '127.0.0.1'
          },
          {
            id: '2',
            code: 'depart',
            name: '部门类型',
            updTime: '2017-08-25 17:52:43',
            updUser: '1',
            updName: 'Mr.AG',
            updHost: '127.0.0.1'
          },
          {
            id: '3',
            code: 'free',
            name: '自定义类型',
            description: 'sadf',
            updTime: '2017-08-26 08:22:25',
            updUser: '1',
            updName: 'Mr.AG',
            updHost: '127.0.0.1'
          },
          {
            id: '4',
            code: 'post',
            name: '岗位类型',
            description: '岗位类型',
            crtTime: '2018-11-23 15:12:41',
            crtUser: '1',
            crtName: 'admin',
            crtHost: '127.0.0.1',
            updTime: '2018-11-23 15:12:41',
            updUser: '1',
            updName: 'admin',
            updHost: '127.0.0.1'
          },
          {
            id: '5',
            code: 'flower',
            name: '流程权限',
            description: '啊啊啊',
            crtTime: '2018-12-03 17:17:22',
            crtUser: '1',
            crtName: 'admin',
            crtHost: '192.168.31.132',
            updTime: '2018-12-03 17:17:22',
            updUser: '1',
            updName: 'admin',
            updHost: '192.168.31.132'
          }
        ]
      }
    }
  },
  addRoleType(obj) {
    return { status: 200, rel: false }
  },
  getRoleType(id) {
    return {
      status: 200,
      data: {
        id: '4',
        code: 'post',
        name: '岗位类型',
        description: '岗位类型',
        crtTime: '2018-11-23 15:12:41',
        crtUser: '1',
        crtName: 'admin',
        crtHost: '127.0.0.1',
        updTime: '2018-11-23 15:12:41',
        updUser: '1',
        updName: 'admin',
        updHost: '127.0.0.1'
      },
      rel: false
    }
  },
  deleteRoleType(id) {
    return { status: 200, rel: false }
  },
  updateRoleType(id) {
    return { status: 200, rel: false }
  }
}
