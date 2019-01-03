// import Cookies from 'js-cookie'

const app = {
  state: {
    navData: null // 全局监听路由Path 用于导航菜单状态显示
  },
  mutations: {
    SET_NAVDATA: (state, data) => {
      if (state.navData !== data) {
        state.navData = data
      }
    }
  },
  actions: {
    setNavData({ commit }, data) {
      commit('SET_NAVDATA', data)
    }
  }
}

export default app
