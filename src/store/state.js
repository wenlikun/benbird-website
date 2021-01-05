/**
 * vuex 状态对象
 */

import variables from '@/styles/element-variables.scss'
import Layout from "@/layout/Layout";
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
        component: Layout,
        hidden: true,
        children: [
          {
            path: '/redirect/:path(.*)',
            component: () => import('@/views/Redirect/Redirect')
          }
        ]
      },
      {
        path:'/',
        redirect:'/login'
      },
      {
        path: '/login',
        hidden: true,
        component: () => import('@/views/Login/Login')
      },
      {
        path: '/dashboard',
        component: Layout,
        redirect: '/dashboard/index',
        children: [
          {
            path: 'index',
            component: () => import('@/views/Dashboard/Dashboard'),
            name: 'Dashboard',
            meta: { title: '首页', icon: 'dashboard', affix: true }
          }
        ]
      },
      {
        path: '/table',
        component: Layout,
        redirect: '/table/complex-table',
        name: 'Table',
        meta: {
          title: '表格',
          icon: 'table'
        },
        children: [
          {
            path: 'complex-table',
            component: () => import('@/views/Table/ComplexTable'),
            name: 'ComplexTable',
            meta: { title: '完整表格' }
          },
          {
            path: 'test-table',
            component: () => import('@/views/Table/TestTable'),
            name: 'TestTable',
            meta: { title: '测试表格' }
          }
        ]
      },
      {
        path: '/profile',
        component: Layout,
        redirect: '/profile/index',
        hidden: true,
        children: [
          {
            path: 'index',
            component: () => import('@/views/Profile/Profile'),
            name: 'Profile',
            meta: { title: '个人信息', icon: 'user', noCache: true }
          }
        ]
      },
      {
        path: '/permission',
        component: Layout,
        redirect: '/permission/userList',
        meta: {
          title: '权限管理',
          icon: 'lock',
        },
        children: [
          {
            path: 'userList',
            component: () => import('@/views/UserList/UserList'),
            name: 'UserList',
            meta: { title: '用户管理', icon: 'peoples', noCache: true }
          },
          {
            path: 'urlList',
            component: () => import('@/views/UrlList/UrlList'),
            name: 'UrlList',
            meta: { title: '路径管理', icon: 'tree-table', noCache: true }
          }
        ]
      },
      {
        path: '/fireworks',
        component: Layout,
        redirect: '/fireworks/goddess',
        children:[
          {
            path: 'goddess',
            component: () => import('@/views/Fireworks/Goddess'),
            name: 'Goddess',
            meta: {title: '人间烟火', icon: 'people',}
          }
        ]
      },
      {
        path: '/system',
        component: Layout,
        redirect: '/system/parameter',
        meta: {
          title: '系统管理',
          icon: 'international',
        },
        children:[
          {
            path: 'parameter',
            component: () => import('@/views/System/Parameter'),
            name: 'Parameter',
            meta: {title: '参数配置', icon: 'xitongcanshu',}
          },
          {
            path: 'jobConfig',
            component: () => import('@/views/System/JobConfig'),
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
    name: 'ben-bird',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    introduction: '',
    roles: ['超级管理员']
  },

  errorLog : {
    logs: []
  },

  tagsView:{
    visitedViews: [],
    cachedViews: []
  }


}
