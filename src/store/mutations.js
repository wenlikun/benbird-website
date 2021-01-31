/**
 * vuex 直接更新state的多个方法的对象
 */

import {
  SESSION_ID,
  TOGGLE_SIDEBAR
} from './mutations-type'
import Cookie from "js-cookie";

export default {


  [TOGGLE_SIDEBAR](state){
      state.app.sidebar.opened = !state.app.sidebar.opened
      state.app.sidebar.withoutAnimation = false

  },

  SET_USER(state,{data}){
    // 设置用户信息
    state.user.name=data.userName
    state.user.token=data.token
    state.user.avatar=data.avatar
    state.user.introduction=data.nickName
    state.user.userEmail=data.userEmail
    state.user.nickName=data.nickName
    // 设置权限信息
    state.permission = {routes:data.sysMenuDOList}
    // 清除缓存
    state.tagsView.visitedViews = []
    state.tagsView.cachedViews = []
  },

  // app
  TOGGLE_SIDEBAR: state => {
    state.app.sidebar.opened = !state.app.sidebar.opened
    state.app.sidebar.withoutAnimation = false
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    state.app.sidebar.opened = false
    state.app.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.app.device = device
  },
  SET_SIZE: (state, size) => {
    state.app.size = size
  },

  // tagsView
  ADD_VISITED_VIEW: (state, view) => {
    if (state.tagsView.visitedViews.some(v => v.path === view.path)) return
    state.tagsView.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || 'no-name'
        })
    )
  },
  ADD_CACHED_VIEW: (state, view) => {
    if (state.tagsView.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.tagsView.cachedViews.push(view.name)
    }
  },

  DEL_VISITED_VIEW: (state, view) => {
    for (const [i, v] of state.tagsView.visitedViews.entries()) {
      if (v.path === view.path) {
        state.tagsView.visitedViews.splice(i, 1)
        break
      }
    }
  },
  DEL_CACHED_VIEW: (state, view) => {
    const index = state.tagsView.cachedViews.indexOf(view.name)
    index > -1 && state.tagsView.cachedViews.splice(index, 1)
  },

  DEL_OTHERS_VISITED_VIEWS: (state, view) => {
    state.tagsView.visitedViews = state.tagsView.visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path
    })
  },
  DEL_OTHERS_CACHED_VIEWS: (state, view) => {
    const index = state.tagsView.cachedViews.indexOf(view.name)
    if (index > -1) {
      state.tagsView.cachedViews = state.tagsView.cachedViews.slice(index, index + 1)
    } else {
      // if index = -1, there is no cached tags
      state.tagsView.cachedViews = []
    }
  },

  DEL_ALL_VISITED_VIEWS: state => {
    // keep affix tags
    const affixTags = state.tagsView.visitedViews.filter(tag => tag.meta.affix)
    state.tagsView.visitedViews = affixTags
  },
  DEL_ALL_CACHED_VIEWS: state => {
    state.tagsView.cachedViews = []
  },

  UPDATE_VISITED_VIEW: (state, view) => {
    for (let v of state.tagsView.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  },

  // settings
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.settings.hasOwnProperty(key)) {
      state.settings[key] = value
      Cookie.set(key, key === 'theme' ? value : value?1:0)
    }
  }

}
