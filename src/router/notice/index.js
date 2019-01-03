import LayoutCross from '@/components/layoutCross'

const noticeRouter = {
  path: '/notice',
  component: LayoutCross, // 交叉布局
  name: '公告管理',
  meta: { isShowMenu: true, title: '公告管理', authority: 'notice' },
  children: [
    {
      path: 'publish',
      component: () => import('@/views/system/notice'),
      meta: { isShowMenu: true, title: '发布公告', authority: 'publish' }
    },
    {
      path: 'history',
      component: () => import('@/views/system/notice/history'),
      meta: { isShowMenu: true, title: '历史公告', authority: 'history' }
    }
  ]
}
export default noticeRouter
