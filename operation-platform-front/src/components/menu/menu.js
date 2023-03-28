import Menu from 'ant-design-vue/es/menu'
import Icon from 'ant-design-vue/es/icon'

export default {
  name: 'SMenu',
  props: {
    // 菜单
    menu: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    // 模式  存在inline vertical horizontal
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      openKeys: [],
      selectedKeys: [],
      cachedOpenKeys: []
    }
  },
  computed: {
    // 根子菜单的keys  (从vm对象中获取根节点的子菜单路径集合)
    rootSubmenuKeys: vm => {
      const keys = []
      vm.menu.forEach(item => keys.push(item.path))
      return keys
    }
  },
  created () {
    this.updateMenu()
  },
  watch: {
    // 是否展开
    collapsed (val) {
      // 如果是
      if (val) {
        // 缓存已经打开的菜单path(等待渲染的菜单路径)
        this.cachedOpenKeys = this.openKeys.concat()
        // 然后 将打开的keys 置空
        this.openKeys = []
      } else {
        // 关闭(将openKeys缓存起来)
        // 否则打开的keys path 等于缓存的open keys
        this.openKeys = this.cachedOpenKeys
      }
    },
    // 监听$route属性  一旦发生变化更新菜单
    $route: function () {
      this.updateMenu()
    }
  },
  methods: {
    // select menu item
    onOpenChange (openKeys) {
      // 在水平模式下时执行，并且不再执行后续(水平模式下不存在递归渲染)
      if (this.mode === 'horizontal') {
        this.openKeys = openKeys
        return
      }
      // 非水平模式时
      // 查看最近是否打开过(并且不能是自己)
      const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key))
      // 如果当前根节点的子菜单不包含(就需要保存openKeys)
      if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
        // 打开(并且需要将整个数组记录)
        this.openKeys = openKeys
      } else {
        // 否则 是根节点子菜单(需要保存,只需要记录一个)(有可能用户切换为inline模式) 展示
        // 如果本来就是当前节点,可以直接置空
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    // 选择的时候
    onSelect ({ item, key, selectedKeys }) {
      // 获取 选择的路径
      this.selectedKeys = selectedKeys
      // 提交给父组件(其实就是menu)
      this.$emit('select', { item, key, selectedKeys })
    },
    // 更新菜单
    updateMenu () {
      // 获取匹配path的副本
      const routes = this.$route.matched.concat()
      // 如果路由匹配的数量>= 4个 且 当前路由需要隐藏
      if (routes.length >= 4 && this.$route.meta.hidden) {
        // 弹出它
        routes.pop()
        // 拿到当前选择的key (默认最后一个)
        this.selectedKeys = [routes[2].path]
      } else {
        // 否则就是栈顶元素
        this.selectedKeys = [routes.pop().path]
      }
      // 将打开的路径 保存
      const openKeys = []
      if (this.mode === 'inline') {
        routes.forEach(item => {
          openKeys.push(item.path)
        })
      }
      // 如果展开 那么将缓存打开的keys 否则更新当前打开的openKeys.
      this.collapsed ? (this.cachedOpenKeys = openKeys) : (this.openKeys = openKeys)
    },

    // render
    renderItem (menu) {
      // 如果菜单不隐藏
      if (!menu.hidden) {
        // 那么返回它的子节点  并且不隐藏子节点条件成立,渲染子菜单  否则子渲染当前菜单本身
        return menu.children && !menu.hideChildrenInMenu ? this.renderSubMenu(menu) : this.renderMenuItem(menu)
      }
      // 否则渲染
      return null
    },
    // 渲染菜单本身
    renderMenuItem (menu) {
      // 如果当前目标存在 否则 null
      const target = menu.meta.target || null
      // 自定义html 标签 存在target 否则 router-link
      const CustomTag = (target && 'a') || 'router-link'
      // 获取这个菜单的属性
      const props = { to: { name: menu.name } }
      // 获取 href,获取target
      const attrs = { href: menu.path, target: menu.meta.target }
      return (
        // jsx 语法  渲染
        <Menu.Item {...{ key: menu.path }}>
          <CustomTag {...{ props, attrs }}>
            {this.renderIcon(menu.meta.icon)}
            <span>{menu.meta.title}</span>
          </CustomTag>
        </Menu.Item>
      )
    },
    // 渲染子节点
    renderSubMenu (menu) {
      // 获取子节点
      const itemArr = []
      // 如果不隐藏
      if (!menu.hideChildrenInMenu) {
        menu.children.forEach(item => itemArr.push(this.renderItem(item)))
      }
      // jsx 语法
      return (
        <Menu.SubMenu {...{ key: menu.path }}>
          <span slot="title">
            {this.renderIcon(menu.meta.icon)}
            <span>{menu.meta.title}</span>
          </span>
          <Menu.ItemGroup>
            {itemArr}
          </Menu.ItemGroup>
        </Menu.SubMenu>
      )
    },
    // 渲染icon
    renderIcon (icon) {
      if (icon === 'none' || icon === undefined) {
        return null
      }
      const props = {}
      // 是不是一个对象  如果是设置component 否则设置type
      typeof (icon) === 'object' ? props.component = icon : props.type = icon
      return (
        <Icon {... { props } }/>
      )
    }
  },

  // 渲染函数
  render () {
    // 动态属性
    const dynamicProps = {
      props: {
        mode: this.mode,
        theme: this.theme,
        openKeys: this.openKeys,
        selectedKeys: this.selectedKeys
      },
      on: {
        openChange: this.onOpenChange,
        select: this.onSelect
      }
    }
    // 菜单树
    const menuTree = this.menu.map(item => {
      // 如果菜单隐藏 null
      if (item.hidden) {
        return null
      }
      // 如果存在渲染
      return this.renderItem(item)
    })
    // 返回整颗菜单树(解析并渲染)
    return (<Menu {...dynamicProps}>{menuTree}</Menu>)
  }
}
