// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iView from 'iview'
import { router } from './router/router'
import { appRouter } from './router/appRouter'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import store from './store/store'
import '@/http.js'

Vue.config.productionTip = false

Vue.use(iView)
Vue.use(VueAxios, axios)
Vue.use(VueCookies)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App),
  data: {
    currentPageName: ''
  },
  mounted() {
    this.currentPageName = this.$route.name
    // 显示打开的页面的列表
    this.$store.commit('setOpenedList')
    this.$store.commit('initCachepage')
    // 权限菜单过滤相关
    this.$store.commit('updateMenulist')
    // iview-admin检查更新
    // util.checkUpdate(this);
  },
  created() {
    let tagsList = []
    appRouter.map(item => {
      if (item.children.length <= 1) {
        tagsList.push(item.children[0])
      } else {
        tagsList.push(...item.children)
      }
    })
    this.$store.commit('setTagsList', tagsList)
  }
})
