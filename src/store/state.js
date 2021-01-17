/**
 * vuex 状态对象
 */

import variables from '@/styles/element-variables.scss'
import Cookie from 'js-cookie'

export default {

  userInfo: [],
  sessionId: '',
  app: {
    sidebar: {
      opened:  true,
      withoutAnimation: false
    },
    device: 'desktop',
    size:  'medium'
  },
  settings : {
    theme: Cookie.get('theme') || variables.theme,
    showSettings: Cookie.get('showSettings') > 0 || true,
    tagsView: Cookie.get('tagsView') > 0 || true,
    fixedHeader: Cookie.get('fixedHeader') > 0 || false,
    sidebarLogo: Cookie.get('sidebarLogo') > 0 || false
  },

  permission : {
    routes: [
      {
        path: '/redirect',
        hidden: true,
        children: [
          {
            path: '/redirect/:path(.*)',
          }
        ]
      },
      {
        path:'/',
      },
      {
        path: '/login',
        hidden: true,
      },
      {
        path: '/dashboard',
        children: [
          {
            path: '/dashboard/index',
            name: 'Dashboard',
            meta: { title: '首页', icon: 'dashboard', affix: true }
          }
        ]
      },
      {
        path: '/table',
        name: 'Table',
        meta: {title: '表格', icon: 'table'},
        children: [
          {
            path: '/table/complex-table',
            name: 'ComplexTable',
            meta: { title: '完整表格' }
          },
          {
            path: '/table/test-table',
            name: 'TestTable',
            meta: { title: '测试表格' }
          }
        ]
      },
      {
        path: '/profile',
        hidden: true,
        children: [
          {
            path: '/profile/index',
            name: 'Profile',
            meta: { title: '个人信息', icon: 'user', noCache: true }
          }
        ]
      },
      {
        path: '/permission',
        meta: {title: '权限管理', icon: 'lock',},
        children: [
          {
            path: '/permission/userList',
            name: 'UserList',
            meta: { title: '用户管理', icon: 'peoples', noCache: true }
          },
          {
            path: '/permission/urlList',
            name: 'UrlList',
            meta: { title: '路径管理', icon: 'tree-table', noCache: true }
          }
        ]
      },
      {
        path: '/fireworks',
        children:[
          {
            path: '/fireworks/goddess',
            name: 'Goddess',
            meta: {title: '人间烟火', icon: 'people',}
          }
        ]
      },
      {
        path: '/system',
        meta: {title: '系统管理', icon: 'international',},
        children:[
          {
            path: '/system/parameter',
            name: 'Parameter',
            meta: {title: '参数配置', icon: 'xitongcanshu',}
          },
          {
            path: '/system/jobConfig',
            name: 'JobConfig',
            meta: {title: '任务配置', icon: 'clock',}
          }
        ]
      }
    ],
    addRoutes: []
  },

  user:{
    token: '',
    name: '',
    avatar: '',
    introduction: '',
    userEmail:'',
    nickName:'',
    roles: ['笨鸟用户']
  },

  errorLog : {
    logs: []
  },

  tagsView:{
    visitedViews: [],
    cachedViews: []
  }


}
