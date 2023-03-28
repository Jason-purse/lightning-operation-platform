import {BasicLayout, PageView} from '@/layouts'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {title: '首页'},
    redirect: '/dashboard',
    children: [
      // dashboard
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/admin/dashboard/Dashboard'),
        // 自定义信息
        meta: {title: '仪表盘', icon: 'dashboard', hiddenHeaderContent: false, keepAlive: false}
      },
      {
        path: 'authority',
        name: 'Authority',
        component: () => import('@/views/admin/authority/Authority'),
        meta: {title: '权限管理', icon: 'menu', hiddenHeaderContent: false, keepAlive: false},
      },
      // 资源管理
      {
        path: 'resource',
        name: 'Resource',
        component: PageView,
        meta: {title: '资源管理', icon: 'menu'},
        children: [
          {
            path: '*',
            name: 'musics',
            component: () => import('@/views/admin/dashboard/Dashboard'),
            meta: {title: '音乐资源', hiddenHeaderContent: false, keepAlive: false}
          },
          {
            path: 'videos',
            name: 'VIDEOS',
            component: () => import('@/views/admin/dashboard/Dashboard'),
            meta: {title: '视频资源', hiddenHeaderContent: false, keepAlive: false}
          },
          {
            path: 'pictures',
            name: 'PICTURES',
            component: () => import('@/views/admin/dashboard/Dashboard'),
            meta: {title: '视频资源', hiddenHeaderContent: false, keepAlive: false}
          }
        ]
      },
      {
        path: 'user',
        name: 'USER',
        component: PageView,
        redirect: '/user/umanage',
        meta: {title: '用户管理', icon: 'team'},
        children: [
          {
            path: 'umanage',
            name: 'urMange',
            component: () => import('@/views/admin/dashboard/Dashboard'),
            meta: {title: '所有用户', hiddenHeaderContent: false, keepAlive: false}
          }
        ]
      },
      {
        path: 'notice',
        name: 'Notice',
        component: PageView,
        redirect: '/notice/mange',
        meta: {title: '公告管理', icon: 'notification'},
        children: [
          {
            path: 'mange',
            name: 'ntManage',
            component: () => import('@/views/admin/dashboard/Dashboard'),
            meta: {title: '所有公告', hiddenHeaderContent: false, keepAlive: false}
          }
        ]
      },
      {
        path: 'log',
        name: 'Log',
        component: PageView,
        redirect: '/log/manage',
        meta: {title: '日志管理', icon: 'message'},
        children: [
          {
            path: 'manage',
            name: 'lgManage',
            component: () => import('@/views/admin/dashboard/Dashboard'),
            meta: {title: '所有附件', hiddenHeaderContent: false, keepAlive: false}
          }, {
            path: '/attachment/uploadfile',
            name: 'UploadFile',
            component: () => import('@/views/admin/dashboard/Dashboard'),
            meta: {title: '上传文件', hiddenHeaderContent: false, keepAlive: false}
          },
          {
            path: 'journal',
            name: "journals",
            meta: {title: '所有日志', hiddenHeaderContent: false, keepAlive: false}
          }
        ]
      },
      {
        path: 'system',
        name: 'System',
        component: PageView,
        redirect: '/system/options',
        meta: {title: '系统', icon: 'setting'},
        children: [
          {
            path: 'about',
            name: 'About',
            component: () => import('@/views/admin/profile/Profile'),
            meta: {title: '关于', hiddenHeaderContent: false, keepAlive: false}
          },
          {
            path: 'options',
            name: 'Options',
            meta: {title: '属性', icon: 'setting', hiddenHeaderContent: false, keepAlive: false},
            component: () => import('@/views/admin/dashboard/Dashboard')
          }
        ]
      },
      // admin
      {
        path: 'admin',
        name: 'Admin',
        redirect: '/admin/manage',
        meta: {title: '管理员', icon: 'user', sideBarNavItem: false},
        component: PageView,
        children: [
          {
            path: 'manage',
            name: 'adManage',
            meta: {title: '个人资料', hiddenHeaderContent: false, keepAlive: false},
            component: () => import('@/views/admin/profile/Profile')
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export const constantRouterMap = [
  {
    path: '/login',
    name: 'Login',
    meta: {title: '登录'},
    component: () => import('@/views/admin/dashboard/Dashboard')
  },
  {
    path: '/install',
    name: 'Install',
    component: () => import('@/views/admin/dashboard/Dashboard')
  },
  {
    path: '/password/reset',
    name: 'ResetPassword',
    meta: {title: '重置密码'},
    component: () => import('@/views/admin/dashboard/Dashboard')
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/admin/dashboard/Dashboard')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About')
  }
]
