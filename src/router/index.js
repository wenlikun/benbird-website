/**
 *路由器对象模块
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/layout/Layout";

// 声明使用插件
Vue.use(VueRouter)

export const routers = [
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
    children:[
      {
        path: 'goddess',
        component: () => import('@/views/Fireworks/Goddess'),
        name: 'Goddess',
        meta: {title: '人间烟火', icon: 'people',}
      }
    ]
  }
]

export default new VueRouter({
  // 配置所有路由
  routes: routers


})
