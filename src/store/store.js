import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'
import user from './user'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    dontCache: ['text-editor', 'artical-publish'] // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
  },
  mutations: {
  },
  modules: {
    app,
    user
  }
})

export default store
