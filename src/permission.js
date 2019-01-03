import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) {
    // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.menus === undefined) {
        // 判断当前用户是否已拉取完user_info信息
        store
          .dispatch('GetUserInfo')
          .then(res => {
            const menus = {}
            for (let i = 0; i < res.menus.length; i++) {
              menus[res.menus[i].code] = true
            }
            store.dispatch('GenerateRoutes', menus).then(() => {
              // 生成可访问的路由表
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              if (store.getters.defaultRedirect) { // 添加默认路由
                router.addRoutes([store.getters.defaultRedirect]) 
              }
              next({ ...to })
            })
            // next()
          })
          .catch(err => {
            store.dispatch('FedLogOut').then(() => {
              Message.error(err || '验证失败！请重新登录！')
              next({ path: '/login' })
            })
          })
      } else {
        // debugger
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (to.matched.length > 0) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
        // 可删 ↑
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
