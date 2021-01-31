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

  permission : {},

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
