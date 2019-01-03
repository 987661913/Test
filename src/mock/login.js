const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    name: 'Super Admin',
    headPic: '/static/img/head.jpg'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    name: 'Normal Editor',
    headPic: '/static/img/head.jpg'
  }
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    return userMap['admin']
  },
  logout: () => 'success'
}
