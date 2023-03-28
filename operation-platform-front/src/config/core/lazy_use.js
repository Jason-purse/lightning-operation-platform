import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '@/config/defaultSettings'

// base library
import '@/config/core/lazy_lib/components_use'
// 官方样式  自定义主题覆盖样式
import 'ant-design-vue/dist/antd.less'
import bootstrap from './bootstrap'

import VueClipboard from 'vue-clipboard2'

Vue.use(VueStorage, config.storageOptions)
Vue.use(VueClipboard)
bootstrap()
