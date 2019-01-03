export default {
  getElementList(query) {
    return {
      status: 200,
      data: {
        total: 4,
        rows: [
          {
            id: 3,
            code: 'userManager:btn_add',
            type: 'button',
            name: '新增',
            uri: '/admin/user',
            menuId: '1',
            method: 'POST',
            description: ''
          },
          {
            id: 4,
            code: 'userManager:btn_edit',
            type: 'button',
            name: '编辑',
            uri: '/admin/user/{*}',
            menuId: '1',
            method: 'PUT',
            description: ''
          },
          {
            id: 5,
            code: 'userManager:btn_del',
            type: 'button',
            name: '删除',
            uri: '/admin/user/{*}',
            menuId: '1',
            method: 'DELETE',
            description: ''
          },
          {
            id: 23,
            code: 'userManager:view',
            type: 'uri',
            name: '查看',
            uri: '/admin/user/{*}',
            menuId: '1',
            parentId: '',
            path: '',
            method: 'GET',
            description: '',
            crtTime: '2017-06-26 00:00:00',
            crtUser: '',
            crtName: '',
            crtHost: '',
            attr1: '',
            attr2: '',
            attr3: '',
            attr4: '',
            attr5: '',
            attr6: '',
            attr7: '',
            attr8: ''
          }
        ]
      }
    }
  },
  addElement(obj) {
    return { status: 200, rel: false }
  },
  getElement(id) {
    return {
      status: 200,
      data: {
        id: 47,
        code: '啊啊啊',
        type: 'uri',
        name: '啊啊啊',
        uri: '啊啊啊啊',
        menuId: '1',
        method: 'POST',
        crtTime: '2018-11-30 13:19:16',
        crtUser: '1',
        crtName: 'admin',
        crtHost: '192.168.31.132'
      },
      rel: false
    }
  },
  deleteElement(id) {
    return { status: 200, rel: false }
  },

  updateElement(id, obj) {
    return { status: 200, rel: false }
  }
}
