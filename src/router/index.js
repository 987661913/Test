import Vue from 'vue'
import Router from 'vue-router'
import systemRouter from './system'
import homeRouter from './home'
import noticeRouter from './notice'
import { Message } from 'element-ui'
import LayoutUpDown from '@/components/layoutUpDown'
import LayoutCross from '@/components/layoutCross'

Vue.use(Router)

// 固定通用路由表  比如说登录界面  个人中心界面等
export const constantRouter = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login') // 该界面常有 不需要懒加载
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/errorPage/401') // 没有权限
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/errorPage/404') // 未找到界面
  }
]
// 业务菜单业务表
export const asyncRouter = [systemRouter, homeRouter, noticeRouter]

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表,并组装后端的数据
 * @param routes asyncRouterMap
 * @param roles
 */
export function filterAsyncRouter(asyncRouterMap, menuTree, auth, routeLevel) {
  // 从已绘制的界面中筛选有权限的界面
  const routers = []
  menuTree.sort((a, b) => {
    return a.orderNum - b.orderNum
  })
  menuTree.forEach(sRoute => {
    const tagRoutes = asyncRouterMap.filter(
      el => el.meta.authority === sRoute.code
    )
    let tempRouter = null
    // 若是前端已有路由界面
    if (tagRoutes && tagRoutes.length > 0) {
      if (tagRoutes.length > 1) {
        Message.error(
          '发现多个相同的菜单Code【' + sRoute.code + '】，请管理员查路由配置'
        )
      }
      tempRouter = tagRoutes[0]
      if (sRoute.icon) {
        // 使用后端给定的资源图标（必须是前端预制的图标资源）
        tempRouter.meta.icon = sRoute.icon
      }
      // 使用后端给定的菜单名称
      tempRouter.meta.title = sRoute.title
      tempRouter.name = sRoute.code
      // 使用后端给定的路由路径
      tempRouter.path = routeLevel ? sRoute.path : '/' + sRoute.path
      if (sRoute.type === 'menu') {
        tempRouter.meta.type = 'normal'
        if (sRoute.children && sRoute.children.length) {
          tempRouter.children = filterAsyncRouter(
            tempRouter.children,
            sRoute.children,
            auth,
            routeLevel + 1
          )
        }
      } else {
        tagRoutes[0].meta.type = 'href'
        tagRoutes[0].meta.href = sRoute.href
        sRoute.component = undefined
      }
    } else {
      if (sRoute.type === 'dirt') {
        // 若是超链接
        tempRouter = {
          path: routeLevel ? sRoute.path : '/' + sRoute.path, // 若是根路径 需要加 '/'
          component: getLayoutComponents(routeLevel, sRoute.code),
          name: sRoute.code,
          meta: {
            isShowMenu: true,
            title: sRoute.title,
            type: 'href',
            icon: sRoute.icon,
            href: sRoute.href
          }
        }
      } else {
        // 绘制额外的外链的界面
        // 若是菜单
        tempRouter = {
          path: routeLevel ? sRoute.path : '/' + sRoute.path, // 若是根路径 需要加 '/'
          children: [],
          component: getLayoutComponents(routeLevel, sRoute.code),
          name: sRoute.code,
          meta: {
            isShowMenu: true,
            title: sRoute.title,
            type: 'normal',
            icon: sRoute.icon
          }
        }
        if (sRoute.children && sRoute.children.length) {
          tempRouter.children = filterAsyncRouter(
            [],
            sRoute.children,
            routeLevel + 1
          )
        }
      }
    }
    // 若当前路径下存在子路由，且子路由是自己的界面，则重庆向到第一个子路由中
    if (tempRouter.children) {
      const itemDirect = tempRouter.children.filter(
        el => el.meta.type === 'normal'
      )
      if (itemDirect.length > 0) {
        tempRouter.redirect = { name: itemDirect[0].name }
      }
    }
    // 如果用户具有当前菜单的权限或者具有子菜单的权限
    if (auth[sRoute.code] || (tempRouter.children && tempRouter.children > 0)) {
      routers.push(tempRouter)
    }
  })
  return routers
}

function getLayoutComponents(index, code) {
  if (index === 0) {
    if (code === 'system') {
      return LayoutCross
    } else {
      return LayoutUpDown
    }
  } else {
    return null
  }
}
export default new Router({
  mode: 'history',
  routes: constantRouter
  // routes: constantRouter.concat(asyncRouter)
})
