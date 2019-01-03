import { asyncRouter, constantRouter, filterAsyncRouter } from '@/router'
import { getAllMenus } from '@/api/common'

// 构建树
function buildTree(list) {
  // 创建一个对象命名为map
  var map = {} // 通过遍历把list中的元素放到map对象中
  list.forEach(function(item) {
    if (!map[item.id]) {
      // 核心步骤1：map中的'item.id'属性指向list数组中的对象元素
      map[item.id] = item
    }
  }) // 再次遍历为了对map属性所指的对象进行处理
  list.forEach(function(item) {
    // 过滤父级id不是null的元素
    let existParent =
      list.filter(el => {
        return el.id === item.parentId
      }).length > 0
    if (existParent) {
      // map[item.pid]为该元素的父级元素
      map[item.parentId].children
        ? map[item.parentId].children.push(item)
        : (map[item.parentId].children = [item])
    }
  }) // 过滤后仅剩下根节点
  return list.filter(function(item) {
    let existParent =
      list.filter(el => {
        return el.id === item.parentId
      }).length > 0
    if (existParent) {
      return false
    } else {
      return true
    }
  })
}
function setDefaultRedirect(accRouter) {
  if (accRouter && Array.isArray(accRouter) && accRouter.length > 0) {
    return {
      path: '',
      redirect: { name: accRouter[0].name }
    }
  }
}

const permission = {
  state: {
    routers: constantRouter,
    defaultRedirect: null,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, data) => {
      state.addRouters = data.routers
      state.routers = constantRouter.concat(data.routers)
      state.defaultRedirect = data.defaultRedirect
    }
  },
  actions: {
    GenerateRoutes({ commit }, auth) {
      return new Promise(resolve => {
        getAllMenus().then(data => {
          const menuTree = buildTree(data)
          const accessedRouters = filterAsyncRouter(
            asyncRouter,
            menuTree,
            auth,
            0
          )
          const defaultRedirect = setDefaultRedirect(accessedRouters)
          commit('SET_ROUTERS', {
            routers: accessedRouters,
            defaultRedirect: defaultRedirect
          })
          resolve()
        })
      })
    }
  }
}

export default permission
