import Vue from 'vue'
import {
  SIDEBAR_TYPE,
  DEFAULT_THEME,
  DEFAULT_LAYOUT_MODE,
  DEFAULT_COLOR,
  DEFAULT_FIXED_HEADER,
  DEFAULT_FIXED_SIDEMENU,
  DEFAULT_FIXED_HEADER_HIDDEN,
  DEFAULT_CONTENT_WIDTH_TYPE,
  API_URL,
  LAYOUT_SETTING
} from '@/store/mutation-types'

const app = {
  state: {
    // 边框工具栏
    sidebar: true,
    // 设备
    device: 'desktop',
    // 主体
    theme: '',
    // 布局
    layout: '',
    // 内容宽度
    contentWidth: '',
    // 是否固定头部
    fixedHeader: false,
    // 是否固定sidebar
    fixSidebar: false,
    // 自动隐藏 header
    autoHideHeader: false,
    // 颜色
    color: null,
    // api url
    apiUrl: null,
    // 布局设置
    layoutSetting: false
  },
  mutations: {
    // 设置aip url
    SET_API_URL: (state, apiUrl) => {
      state.apiUrl = apiUrl
      Vue.ls.set(API_URL, apiUrl)
    },
    // 重置 api url
    RESTORE_API_URL: state => {
      state.apiUrl = null
      Vue.ls.set(API_URL, null)
    },
    // 设置sidebar type
    SET_SIDEBAR_TYPE: (state, type) => {
      state.sidebar = type
      Vue.ls.set(SIDEBAR_TYPE, type)
    },
    // 关闭 sidebar
    CLOSE_SIDEBAR: state => {
      Vue.ls.set(SIDEBAR_TYPE, true)
      state.sidebar = false
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    TOGGLE_THEME: (state, theme) => {
      Vue.ls.set(DEFAULT_THEME, theme)
      state.theme = theme
    },
    TOGGLE_LAYOUT_MODE: (state, layout) => {
      Vue.ls.set(DEFAULT_LAYOUT_MODE, layout)
      state.layout = layout
    },
    TOGGLE_FIXED_HEADER: (state, fixed) => {
      Vue.ls.set(DEFAULT_FIXED_HEADER, fixed)
      state.fixedHeader = fixed
    },
    TOGGLE_FIXED_SIDEBAR: (state, fixed) => {
      Vue.ls.set(DEFAULT_FIXED_SIDEMENU, fixed)
      state.fixedSidebar = fixed
    },
    TOGGLE_FIXED_HEADER_HIDDEN: (state, show) => {
      Vue.ls.set(DEFAULT_FIXED_HEADER_HIDDEN, show)
      state.autoHideHeader = show
    },
    TOGGLE_CONTENT_WIDTH: (state, type) => {
      Vue.ls.set(DEFAULT_CONTENT_WIDTH_TYPE, type)
      state.contentWidth = type
    },
    TOGGLE_COLOR: (state, color) => {
      Vue.ls.set(DEFAULT_COLOR, color)
      state.color = color
    },
    TOGGLE_LAYOUT_SETTING: (state, show) => {
      Vue.ls.set(LAYOUT_SETTING, show)
      state.layoutSetting = show
    }
  },
  actions: {
    setSidebar ({ commit }, type) {
      commit('SET_SIDEBAR_TYPE', type)
    },
    CloseSidebar ({ commit }) {
      commit('CLOSE_SIDEBAR')
    },
    ToggleDevice ({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    ToggleTheme ({ commit }, theme) {
      commit('TOGGLE_THEME', theme)
    },
    ToggleLayoutMode ({ commit }, mode) {
      commit('TOGGLE_LAYOUT_MODE', mode)
    },
    ToggleFixedHeader ({ commit }, fixedHeader) {
      if (!fixedHeader) {
        commit('TOGGLE_FIXED_HEADER_HIDDEN', false)
      }
      commit('TOGGLE_FIXED_HEADER', fixedHeader)
    },
    ToggleFixSidebar ({ commit }, fixSidebar) {
      commit('TOGGLE_FIXED_SIDEBAR', fixSidebar)
    },
    ToggleFixedHeaderHidden ({ commit }, show) {
      commit('TOGGLE_FIXED_HEADER_HIDDEN', show)
    },
    ToggleContentWidth ({ commit }, type) {
      commit('TOGGLE_CONTENT_WIDTH', type)
    },
    ToggleColor ({ commit }, color) {
      commit('TOGGLE_COLOR', color)
    },
    ToggleLayoutSetting ({ commit }, show) {
      commit('TOGGLE_LAYOUT_SETTING', show)
    }
  }
}
export default app
