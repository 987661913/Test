import LayoutCross from '@/components/layoutCross'

const systemRouter = {
  path: '/system',
  component: LayoutCross, // 交叉布局
  name: '系统管理',
  meta: { isShowMenu: true, title: '系统管理', authority: 'system' },
  children: [
    {
      path: 'user',
      component: () => import('@/views/system/user'),
      meta: { isShowMenu: true, title: '用户管理', authority: 'user' }
    },
    {
      path: 'menu',
      component: () => import('@/views/system/menu'),
      meta: { isShowMenu: true, title: '菜单管理', authority: 'menu' }
    },
    {
      path: 'notice',
      component: () => import('@/views/system/notice'),
      meta: { isShowMenu: true, title: '公告管理', authority: 'notice' }
    },
    {
      path: 'dataDictionary',
      component: () => import('@/views/system/dataDictionary'),
      meta: { isShowMenu: true, title: '数据字典', authority: 'dataDictionary' }
    },
    {
      path: 'upload',
      component: () => import('@/views/system/upload'),
      meta: { isShowMenu: true, title: '附件管理', authority: 'upload' }
    },
    {
      path: 'role',
      component: () => import('@/views/system/role'),
      meta: { isShowMenu: true, title: '角色&权限管理', authority: 'role' }
    },
    {
      path: 'roleType',
      component: () => import('@/views/system/roleType'),
      meta: { isShowMenu: true, title: '角色类型管理', authority: 'roleType' }
    }
  ]
}
export default systemRouter
