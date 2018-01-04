import Main from '../components/main.vue'

export const login = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: resolve => {
    require(['@/components/login.vue'], resolve)
  }
}

export const findpassword = {
  path: '/findpassword',
  name: 'findpassword',
  meta: {
    title: 'findpassword - 找回密码'
  },
  component: resolve => {
    require(['@/components/findpassword.vue'], resolve)
  }
}

export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/index',
  component: Main,
  children: [
    {
      path: 'index',
      title: '首页',
      name: 'index',
      component: resolve => {
        require(['@/views/home/index.vue'], resolve)
      }
    }
  ]
}

export const appRouter = [
  {
    path: '/case',
    icon: 'lock-combination',
    name: 'case',
    title: '案件管理',
    component: Main,
    children: [
      {
        path: 'manage',
        icon: 'lock-combination',
        name: 'casemanage',
        title: '案件管理',
        component: resolve => {
          require(['@/views/case/manage.vue'], resolve)
        }
      },
      {
        path: 'add',
        name: 'caseadd',
        icon: 'lock-combination',
        title: '案件添加',
        component: resolve => {
          require(['@/views/case/add.vue'], resolve)
        }
      },
      {
        path: 'update',
        icon: 'lock-combination',
        name: 'caseupdate',
        title: '案件编辑',
        component: resolve => {
          require(['@/views/case/update.vue'], resolve)
        }
      }
    ]
  },
  {
    path: '/client',
    icon: 'lock-combination',
    name: 'client',
    title: '客户管理',
    component: Main,
    children: [
      {
        path: 'manage',
        icon: 'lock-combination',
        name: 'clientmanage',
        title: '客户管理',
        component: resolve => {
          require(['@/views/client/manage.vue'], resolve)
        }
      },
      {
        path: 'add',
        icon: 'lock-combination',
        name: 'clientadd',
        title: '客户添加',
        component: resolve => {
          require(['@/views/client/add.vue'], resolve)
        }
      },
      {
        path: 'update',
        icon: 'lock-combination',
        name: 'clientupdate',
        title: '客户编辑',
        component: resolve => {
          require(['@/views/client/update.vue'], resolve)
        }
      }
    ]
  }
]

export const routers = [login, findpassword, ...appRouter, otherRouter]
