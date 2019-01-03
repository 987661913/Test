import LayoutUpDown from '@/components/layoutUpDown'

const homeRouter = {
  path: '/home',
  component: LayoutUpDown, // 上下布局
  name: '首页',
  meta: { isShowMenu: true, title: '首页', authority: 'home' },
  children: [
    {
      path: 'unacceptedProject', // 子路由前面不能加 斜杠
      component: () => import('@/views/home1'),
      meta: {
        isShowMenu: true,
        title: '未受理项目',
        authority: 'unacceptedProject',
        count: 50
      }
    },
    {
      path: 'acceptedProject', // 子路由前面不能加 斜杠
      component: () => import('@/views/home'),
      meta: { isShowMenu: true, title: '已受理项目', authority: 'acceptedProject' }
    },
    {
      path: 'messageProject', // 子路由前面不能加 斜杠
      component: () => import('@/views/home1'),
      meta: { isShowMenu: true, title: '消息中心', authority: 'messageProject' }
    }
  ]
}

export default homeRouter
