import Cookies from 'js-cookie'

const user = {
  state: {},
  mutations: {
    logout (state, vm) {
      // 清楚token
      Cookies.remove('token')
      // Cookies.remove('password')
      // Cookies.remove('access')
    }
  }
}

export default user
