import Vue from 'vue'
import VueRouter from 'vue-router'
import { asyncRouterMap, constantRouterMap } from '../config/router.config'

Vue.use(VueRouter)

const router = new VueRouter({
  // 滚动行为
  scrollBehavior: () => ({
    y: 0,
    base: process.env.BABEL_ENV
  }),
  routes: constantRouterMap.concat(asyncRouterMap)
})

export default router
