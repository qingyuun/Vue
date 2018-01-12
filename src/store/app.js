import { otherRouter, appRouter } from '@/router/appRouter'
import Util from '@/libs/util'
import Cookies from 'js-cookie'
import Vue from 'vue'

const app = {
  state: {
    cachePage: [],
    lang: '',
    isFullScreen: false,
    openedSubmenuArr: [], // 要展开的菜单数组
    menuTheme: 'dark', // 主题
    themeColor: '',
    pageOpenedList: [
      {
        title: '首页',
        path: '',
        name: 'index'
      }
    ],
    currentPageName: '',
    currentPath: [
      {
        title: '首页',
        path: '',
        name: 'index'
      }
    ], // 面包屑数组
    menuList: [],
    routers: [otherRouter, ...appRouter],
    tagsList: [...otherRouter.children],
    messageCount: 0,
    dontCache: ['text-editor', 'artical-publish'] // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
  },
  mutations: {
    // 设置tag列表
    setTagsList (state, list) {
      state.tagsList.push(...list)
    },
    // 更新菜单列表
    updateMenulist (state) {
      let accessCode = parseInt(Cookies.get('token'))
      let menuList = []
      appRouter.forEach((item, index) => {
        if (item.access !== undefined) {
          if (Util.showThisRoute(item.access, accessCode)) {
            if (item.children.length === 1) {
              menuList.push(item)
            } else {
              let len = menuList.push(item)
              let childrenArr = []
              childrenArr = item.children.filter(child => {
                if (child.access !== undefined) {
                  if (child.access === accessCode) {
                    return child
                  }
                } else {
                  return child
                }
              })
              menuList[len - 1].children = childrenArr
            }
          }
        } else {
          if (item.children.length === 1) {
            menuList.push(item)
          } else {
            let len = menuList.push(item)
            let childrenArr = []
            childrenArr = item.children.filter(child => {
              if (child.access !== undefined) {
                if (Util.showThisRoute(child.access, accessCode)) {
                  return child
                }
              } else {
                return child
              }
            })
            let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]))
            handledItem.children = childrenArr
            menuList.splice(len - 1, 1, handledItem)
          }
        }
      })
      state.menuList = menuList
    },
    // 更改菜单主题
    changeMenuTheme (state, theme) {
      state.menuTheme = theme
    },
    // 更改主题
    changeMainTheme (state, mainTheme) {
      state.themeColor = mainTheme
    },
    // 添加打开子菜单
    addOpenSubmenu (state, name) {
      let hasThisName = false
      let isEmpty = false
      if (name.length === 0) {
        isEmpty = true
      }
      if (state.openedSubmenuArr.indexOf(name) > -1) {
        hasThisName = true
      }
      if (!hasThisName && !isEmpty) {
        state.openedSubmenuArr.push(name)
      }
    },
    // 关闭页面
    closePage (state, name) {
      state.cachePage.forEach((item, index) => {
        if (item === name) {
          state.cachePage.splice(index, 1)
        }
      })
    },
    // 打卡页面
    initCachepage (state) {
      if (localStorage.cachePage) {
        state.cachePage = JSON.parse(localStorage.cachePage)
      }
    },
    // 移除tag标签
    removeTag (state, name) {
      state.pageOpenedList.map((item, index) => {
        if (item.name === name) {
          state.pageOpenedList.splice(index, 1)
        }
      })
    },
    // 打开页面列表
    pageOpenedList (state, get) {
      let openedPage = state.pageOpenedList[get.index]
      if (get.argu) {
        openedPage.argu = get.argu
      }
      if (get.query) {
        openedPage.query = get.query
      }
      state.pageOpenedList.splice(get.index, 1, openedPage)
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },
    // 关闭所有打开tag标签页面
    clearAllTags (state) {
      state.pageOpenedList.splice(1)
      state.cachePage.length = 0
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },
    // 关闭其他的tag标签页面
    clearOtherTags (state, vm) {
      let currentName = vm.$route.name
      let currentIndex = 0
      state.pageOpenedList.forEach((item, index) => {
        if (item.name === currentName) {
          currentIndex = index
        }
      })
      if (currentIndex === 0) {
        state.pageOpenedList.splice(1)
      } else {
        state.pageOpenedList.splice(currentIndex + 1)
        state.pageOpenedList.splice(1, currentIndex - 1)
      }
      let newCachepage = state.cachePage.filter(item => {
        return item === currentName
      })
      state.cachePage = newCachepage
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },
    // 设置打开列表
    setOpenedList (state) {
      state.pageOpenedList = localStorage.pageOpenedList
        ? JSON.parse(localStorage.pageOpenedList)
        : [otherRouter.children[0]]
    },
    // 设置当前打开路径
    setCurrentPath (state, pathArr) {
      state.currentPath = pathArr
    },
    // 设置当前打开页面name
    setCurrentPageName (state, name) {
      state.currentPageName = name
    },
    // 设置头像
    setAvator (state, path) {
      localStorage.avatorImgPath = path
    },
    // 语言开关
    switchLang (state, lang) {
      state.lang = lang
      Vue.config.lang = lang
    },
    // 清除打开菜单
    clearOpenedSubmenu (state) {
      state.openedSubmenuArr.length = 0
    },
    // 设置消息提醒数量
    setMessageCount (state, count) {
      state.messageCount = count
    },
    // 增加标签
    increateTag (state, tagObj) {
      if (!Util.oneOf(tagObj.name, state.dontCache)) {
        state.cachePage.push(tagObj.name)
        localStorage.cachePage = JSON.stringify(state.cachePage)
      }
      state.pageOpenedList.push(tagObj)
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    }
  }
}

export default app
