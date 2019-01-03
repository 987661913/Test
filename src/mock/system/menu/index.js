export default {
  getMenuTree(query) {
    return [
      {
        id: '13',
        parentId: '-1',
        children: [
          {
            id: '5',
            parentId: '13',
            children: [
              {
                id: '1',
                parentId: '5',
                children: [],
                icon: 'fa-user',
                title: '用户管理',
                href: '/admin/user',
                spread: false,
                path: '/adminSys/baseManager/userManager',
                code: 'userManager',
                label: '用户管理'
              },
              {
                id: '6',
                parentId: '5',
                children: [],
                icon: 'category',
                title: '菜单管理',
                href: '/admin/menu',
                spread: false,
                path: '/adminSys/baseManager/menuManager',
                code: 'menuManager',
                label: '菜单管理'
              },
              {
                id: '7',
                parentId: '5',
                children: [],
                icon: 'group_fill',
                title: '角色权限管理',
                href: '/admin/group',
                spread: false,
                path: '/adminSys/baseManager/groupManager',
                code: 'groupManager',
                label: '角色权限管理'
              },
              {
                id: '8',
                parentId: '5',
                children: [],
                icon: 'fa-users',
                title: '角色类型管理',
                href: '/admin/groupType',
                spread: false,
                path: '/adminSys/baseManager/groupTypeManager',
                code: 'groupTypeManager',
                label: '角色类型管理'
              },
              {
                id: '21',
                parentId: '5',
                children: [],
                icon: 'fa fa-book',
                title: '数据字典',
                spread: false,
                path: '/adminSys/baseManager/dictManager',
                code: 'dictManager',
                label: '数据字典'
              },
              {
                id: '27',
                parentId: '5',
                children: [],
                icon: 'viewlist',
                title: '操作日志',
                href: '/admin/gateLog',
                spread: false,
                path: '/adminSys/baseManager/gateLogManager',
                code: 'gateLogManager',
                label: '操作日志'
              },
              {
                id: '35',
                parentId: '5',
                children: [],
                icon: '23123123',
                title: '321321',
                href: '231321',
                spread: false,
                path: '/adminSys/baseManager/321',
                code: '321',
                label: '321321'
              }
            ],
            icon: 'setting',
            title: '基础配置管理',
            href: '/admin',
            spread: false,
            path: '/adminSys/baseManager',
            code: 'baseManager',
            label: '基础配置管理'
          },
          {
            id: '29',
            parentId: '13',
            children: [
              {
                id: '30',
                parentId: '29',
                children: [],
                icon: 'client',
                title: '服务管理',
                href: '/auth/service',
                spread: false,
                path: '/adminSys/authManager/serviceManager',
                code: 'serviceManager',
                label: '服务管理'
              }
            ],
            icon: 'service',
            title: '服务权限管理',
            href: '/auth',
            spread: false,
            path: '/adminSys/authManager',
            code: 'authManager',
            label: '服务权限管理'
          },
          {
            id: '31',
            parentId: '13',
            children: [
              {
                id: '32',
                parentId: '31',
                children: [],
                icon: 'client',
                title: '服务注册中心',
                spread: false,
                path: '/adminSys/monitorManager/serviceEurekaManager',
                code: 'serviceEurekaManager',
                label: '服务注册中心'
              },
              {
                id: '33',
                parentId: '31',
                children: [],
                icon: 'client',
                title: '服务状态监控',
                spread: false,
                path: '/adminSys/monitorManager/serviceEurekaManager',
                code: 'serviceMonitorManager',
                label: '服务状态监控'
              },
              {
                id: '34',
                parentId: '31',
                children: [],
                icon: 'client',
                title: '服务链路监控',
                spread: false,
                path: '/adminSys/monitorManager/serviceZipkinManager',
                code: 'serviceZipkinManager',
                label: '服务链路监控'
              }
            ],
            icon: 'service',
            title: '监控模块管理',
            spread: false,
            path: '/adminSys/monitorManager',
            code: 'monitorManager',
            label: '监控模块管理'
          }
        ],
        icon: 'setting',
        title: '权限管理系统',
        href: '/base',
        spread: false,
        path: '/adminSys',
        code: 'adminSys',
        label: '权限管理系统'
      }
    ]
  },
  addMenu(obj) {
    return { status: 200, rel: false }
  },
  getMenu(id) {
    return {
      status: 200,
      data: {
        id: '5',
        code: 'baseManager',
        title: '基础配置管理',
        parentId: '13',
        href: '/admin',
        icon: 'setting',
        type: 'dirt',
        description: '',
        updTime: '2017-09-05 21:46:11',
        updUser: '1',
        updName: 'Mr.AG',
        updHost: '127.0.0.1',
        attr1: 'Layout',
        path: '/adminSys/baseManager'
      },
      rel: false
    }
  },
  deleteMenu(id) {
    return {
      status: 200,
      data: {
        total: 0,
        rows: []
      }
    }
  },
  updateMenu(id, obj) {
    return { status: 200, rel: false }
  }
}
