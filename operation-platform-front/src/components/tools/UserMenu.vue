<template>
  <div class="user-wrapper">
    <a
      :href="options.mlnlco_url || '#'"
      target="_blank"
    >
      <a-tooltip
        placement="bottom"
        title="点击跳转到首页"
      >
        <span class="action">
          <a-icon type="link"/>
        </span>
      </a-tooltip>
    </a>
    <a
      href="javascript:void(0)"
      @click="handleShowLayoutSetting"
    >
      <a-tooltip
        placement="bottom"
        title="后台布局设置"
      >
        <span class="action">
          <a-icon type="setting"/>
        </span>
      </a-tooltip>
    </a>
    <header-comment class="action"/>
    <a-dropdown>
      <span
        class="action ant-dropdown-link user-dropdown-menu"
      >
        <a-avatar
          class="avatar"
          size="small"
          :src="(user && user.avatar) || 'http://cn.gravatar.com/avatar/?s=256&d=mm'"
        />
      </span>
      <a-menu
        slot="overlay"
        class="user-dropdown-menu-wrapper"
      >
        <a-menu-item key="0">
          <router-link :to="{ path: '/admin/manage' }">
            <a-icon type="user"/>
            <span>个人资料</span>
          </router-link>
        </a-menu-item>
        <a-menu-divider/>
        <a-menu-item key="1">
          <a
            href="javascript:;"
            @click="handleLogout"
          >
            <a-icon type="logout"/>
            <span>退出登录</span>
          </a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
import HeaderComment from './commentip/HeaderComment'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'UserMenu',
  components: {
    HeaderComment
  },
  data() {
    return {}
  },
  created() {
    this.$log.debug('user', this.user)
  },
  computed: {
    ...mapGetters(['user', 'options'])
  },
  methods: {
    ...mapActions(['logout', 'ToggleLayoutSetting']),
    handleLogout() {
      const that = this

      this.$confirm({
        title: '提示',
        content: '确定要注销登录吗 ?',
        onOk() {
          return that
            .logout({})
            .then(() => {
              // 然后location hash 刷新
              window.location.reload()
            })
            .catch(err => {
              that.$message.error({
                title: '错误',
                description: err.message
              })
            })
        },
        onCancel() {
        }
      })
    },
    handleShowLayoutSetting() {
      // 触发绑定的工具包
      this.ToggleLayoutSetting(true)
    }
  }
}
</script>
