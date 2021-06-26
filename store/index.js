const cookieparser = process.server ? require('cookieparser') : undefined
// 在服务端渲染期间运行都是同一个实例
// 为了防止数据冲突，需要把state定义成一个函数，返回数据对象
export const state = () => {
  return {
    // 当前登录用户的登录状态
    user: null
  }
}

export const mutations = {
  setUser(state, data) {
    state.user = data
  }
}

export const actions = {
  // 此action会在服务端渲染期间自动调用
  // 作用： 初始化容器数据，并传递数据给客户端调用
  nuxtServerInit({ commit }, { ssrContext }) {
    const cookie = ssrContext.req.headers.cookie;
    let user = null;
    // 如果请求头中有 Cookie
    if (cookie) {
      const parsed = cookieparser.parse(cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (e) {

      }
      // 提交mutation修改state状态
      commit('setUser', user)
    }
  }
}