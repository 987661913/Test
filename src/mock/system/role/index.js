export default {
  getAllGroupTypes() {
    return {
      status: 200,
      data: [
        {
          id: '1',
          code: 'role',
          name: '角色',
          description: 'role',
          updTime: '2017-08-25 17:52:37',
          updUser: '1',
          updName: 'Mr.AG',
          updHost: '127.0.0.1'
        },
        {
          id: '2',
          code: 'depart',
          name: '部门',
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
          name: '岗位',
          description: '岗位',
          crtTime: '2018-11-23 15:12:41',
          crtUser: '1',
          crtName: 'admin',
          crtHost: '127.0.0.1',
          updTime: '2018-11-23 15:12:41',
          updUser: '1',
          updName: 'admin',
          updHost: '127.0.0.1'
        }
      ],
      count: 4
    }
  },
  getRoleTree(query) {
    return {
      data: [
        {
          id: '1',
          parentId: '-1',
          children: [],
          label: '管理员',
          name: '管理员'
        },
        {
          id: '3',
          parentId: '-1',
          children: [
            {
              id: '4',
              parentId: '3',
              children: [],
              label: '游客',
              name: '游客'
            }
          ],
          label: '体验组',
          name: '体验组'
        },
        {
          id: '9',
          parentId: '-1',
          children: [],
          label: '博客管理员',
          name: '博客管理员'
        }
      ],
      status: 200
    }
  },
  addRole(obj) {
    return { status: 200, rel: false }
  },

  getRole(id) {
    return {
      status: 200,
      data: {
        id: '1',
        code: 'adminRole',
        name: '管理员',
        parentId: '-1',
        path: '/adminRole',
        groupType: '1',
        description: ''
      },
      rel: false
    }
  },

  deleteRole(id) {
    return { status: 200, rel: false }
  },

  updateRole(id, obj) {
    return { status: 200, rel: false }
  },

  getUsers(id) {
    return {
      status: 200,
      data: {
        members: [
          {
            id: '2',
            username: 'test',
            password:
              '$2a$12$zWe6knO6rGp15UVfdWTTxu.Ykt.k3QnD5FPoj6a1cnL63csHY2A1S',
            name: '测试账户',
            birthday: '',
            mobilePhone: '',
            email: '',
            sex: '男',
            description: '',
            updTime: '2018-11-23 00:00:00',
            updUser: '1',
            updName: 'admin',
            updHost: '127.0.0.1'
          }
        ],
        leaders: [
          {
            id: '1',
            username: 'admin',
            password:
              '$2a$12$S/yLlj9kzi5Dgsz97H4rAekxrPlk/10eXp1lUJcAVAx.2M9tOpWie',
            name: '杨XX',
            birthday: '',
            mobilePhone: '',
            email: '',
            sex: '男',
            description: '',
            updTime: '2018-11-23 00:00:00',
            updUser: '1',
            updName: 'admin',
            updHost: '127.0.0.1'
          }
        ]
      },
      rel: true
    }
  },

  modifyUsers(id, data) {
    return { status: 200, rel: true }
  },

  removeElementAuthority(id, data) {
    return { status: 200, rel: true }
  },

  addElementAuthority(id, data) {
    return { status: 200, rel: true }
  },

  getElementAuthority(id) {
    return {
      status: 200,
      data: [9, 23, 9, 27, 24, 28, 31, 30, 32, 41, 30, 31, 40, 42, 36],
      rel: true
    }
  },

  modifyMenuAuthority(id, data) {
    return { status: 200, rel: true }
  },

  getMenuAuthority(id) {
    return {
      status: 200,
      data: [
        {
          id: '1',
          parentId: '5',
          children: [],
          text: '用户管理',
          nodes: [],
          icon: 'fa-user'
        },
        {
          id: '13',
          parentId: '-1',
          children: [],
          text: '权限管理系统',
          nodes: [],
          icon: 'setting'
        },
        {
          id: '5',
          parentId: '13',
          children: [],
          text: '基础配置管理',
          nodes: [],
          icon: 'setting'
        }
      ],
      rel: true
    }
  }
}
