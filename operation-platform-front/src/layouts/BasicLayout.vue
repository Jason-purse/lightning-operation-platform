<template>
  <a-layout :class="['layout', device]">
    <!-- SideMenu  抽屉 -->
    <!--  placement    抽屉方向-->
    <a-drawer
      v-if="isMobile()"
      placement="left"
      :wrapClassName="`drawer-sider ${navTheme}`"
      :closable="false"
      :visible="collapsed"
      @close="drawerClose"
    >
      <side-menu
        mode="inline"
        :menus="menus"
        :theme="navTheme"
        :collapsed="false"
        :collapsible="true"
        @menuSelect="menuSelect"
      ></side-menu>
    </a-drawer>
<!--    //默认不展开-->
    <side-menu
      v-else-if="isSideMenu()"
      mode="inline"
      :menus="menus"
      :theme="navTheme"
      :collapsed="collapsed"
      :collapsible="true"
    ></side-menu>

    <a-layout
      :class="[layoutMode, `content-width-${contentWidth}`]"
      :style="{ paddingLeft: contentPaddingLeft, minHeight: '100vh' }"
    >
      <!-- layout header -->
      <global-header
        :mode="layoutMode"
        :menus="menus"
        :theme="navTheme"
        :collapsed="collapsed"
        :device="device"
        @toggle="toggle"
      />

      <!-- layout content -->
      <a-layout :style="{ height: '100%', marginTop:'24px', paddingTop: fixedHeader ? '64px' : '0' }">
        <transition name="page-transition">
          <route-view />
        </transition>
      </a-layout>

      <!-- layout footer -->
      <a-layout-footer>
        <global-footer />
      </a-layout-footer>
    </a-layout>

    <setting-drawer ref="drawer"></setting-drawer>
  </a-layout>
</template>

<script>
import { triggerWindowResizeEvent } from '@/utils/util'
import { mapState, mapActions } from 'vuex'
import { mixin, mixinDevice } from '@/utils/mixin'
import config from '@/config/defaultSettings'
import { asyncRouterMap } from '@/config/router.config.js'

import RouteView from './RouteView'
import SideMenu from '@/components/menu/SideMenu'
import GlobalHeader from '@/components/globalheader'
import GlobalFooter from '@/components/globalfooter'
import SettingDrawer from '@/components/settingdrawer/SettingDrawer'

// 基本骨架
export default {
  name: 'BasicLayout',
  // 全局混入当前这个类型的所有实例
  mixins: [mixin, mixinDevice],
  components: {
    RouteView,
    SideMenu,
    GlobalHeader,
    GlobalFooter,
    SettingDrawer
  },
  data () {
    return {
      production: config.production,
      collapsed: false,
      menus: []
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters
    }),
    // 内容距离左边边距
    contentPaddingLeft () {
      // 如果没有绑定sidebar 或者 是移动端
      if (!this.fixSidebar || this.isMobile()) {
        return '0'
      }
      // 如果sidebar展开状态
      if (this.sidebarOpened) {
        return '256px'
      }
      // 否则关闭状态 80px
      return '80px'
    }
  },
  // 监听sidebarOpened 的属性改变
  watch: {
    sidebarOpened (val) {
      // 如果打开,不折叠
      this.collapsed = !val
    }
  },
  // 对象构造成功
  created () {
    this.menus = asyncRouterMap.find(item => item.path === '/').children || []
    console.log(this.menus)
    if (this.menus) {
      this.menus = this.menus.filter(ele => ele.meta.sideBarNavItem !== false)
    }
    // this.menus = this.mainMenu.find((item) => item.path === '/').children
    this.collapsed = !this.sidebarOpened
  },
  // 挂载
  mounted () {
    // 拿到 用户信息
    const userAgent = navigator.userAgent
    // 如果是ie
    if (userAgent.indexOf('Edge') > -1) {
      // 当前组件渲染完毕下一次渲染时
      this.$nextTick(() => {
        // 折叠效果取反
        this.collapsed = !this.collapsed
        // 稍微延时 折叠效果取反
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }
  },
  methods: {
    // 将该属性映射出来
    ...mapActions(['setSidebar']),
    // 做切换
    toggle () {
      this.collapsed = !this.collapsed
      this.setSidebar(!this.collapsed)
      triggerWindowResizeEvent()
    },
    // 边距计算
    paddingCalc () {
      let left = ''
      // 如果是展开   是桌面设备 256px 否则80px
      if (this.sidebarOpened) {
        left = this.isDesktop() ? '256px' : '80px'
      } else {
        // 否则不展开
        // 如果是移动端  如果固定sidebar 那么就是 80 否则不固定 就是 0
        left = (this.isMobile() && '0') || ((this.fixSidebar && '80px') || '0')
      }
      return left
    },
    // 菜单选择
    menuSelect () {
      // 不是 pc 展开
      if (!this.isDesktop()) {
        this.collapsed = false
      }
    },
    // 抽屉关闭
    drawerClose () {
      // 折叠
      this.collapsed = false
    }
  }
}
</script>

<style lang="less">
@import url('../style/global.less');

/*
 * The following styles are auto-applied to elements with
 * transition="page-transition" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the page transition by editing
 * these styles.
 */

.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
