export default {
  getUserList: config => {
    return {
      status: 200,
      data: {
        total: 3,
        rows: [
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
            updTime: '2018-11-23 15:14:14',
            updUser: '1',
            updName: 'admin',
            updHost: '127.0.0.1'
          },
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
            updTime: '2018-11-23 15:09:06',
            updUser: '1',
            updName: 'admin',
            updHost: '127.0.0.1'
          },
          {
            id: '4',
            username: 'blog',
            password:
              '$2a$12$S/yLlj9kzi5Dgsz97H4rAekxrPlk/10eXp1lUJcAVAx.2M9tOpWie',
            name: 'aaaaaaa',
            birthday: '',
            mobilePhone: '',
            email: '',
            sex: '女',
            description: '12',
            updTime: '2018-11-23 15:14:23',
            updUser: '1',
            updName: 'admin',
            updHost: '127.0.0.1'
          }
        ]
      }
    }
  },
  addUser: config => {
    return { status: 200, rel: false }
  },

  getUser: config => {
    return {
      status: 200,
      data: {
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
        updTime: '2018-11-23 15:14:14',
        updUser: '1',
        updName: 'admin',
        updHost: '127.0.0.1'
      },
      rel: false
    }
  },

  deleteUser: config => {
    return { status: 200, rel: false }
  },

  updateUser: config => {
    return { status: 200, rel: false }
  }
}
