import Vue from 'vue'
import {
  ACCESS_TOKEN,
  USER
} from '@/store/mutation-types'
import adminApi from '@/api/admin'
import userApi from '@/api/user'

const user = {
  // repository (存放的数据,全局共享 且是响应式)
  state: {
    token: null,
    user: {}
  },
  // 同步方法
  mutations: {
    // 顶级store 两个参数
    SET_TOKEN: (state, token) => {
      Vue.ls.set(ACCESS_TOKEN, token)
      state.token = token
    },
    CLEAR_TOKEN: state => {
      Vue.ls.remove(ACCESS_TOKEN)
      state.token = null
    },
    SET_USER: (state, user) => {
      Vue.ls.set(USER, user)
      state.user = user
    }
  },
  // 计算属性
  getters: {

  },
  // 异步方法
  actions: {
    /**
     * 异步加载一个用户信息, 然后通过commit方法提交给mutations中的对应方法
     * @param commit
     * @returns {Promise<unknown>}
     */
    loadUser ({ commit }) {
      return new Promise((resolve, reject) => {
        userApi
          .getProfile()
          .then(response => {
            /* eslint-disable-next-line */
            console.log('profiles', response.data)
            commit('SET_USER', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    /**
     * 登录验证
     * @param commit
     * @param username
     * @param password
     * @param authcode
     * @returns {Promise<unknown>}
     */
    login ({ commit }, { username, password, authcode }) {
      Vue.$log.debug(`{username},{password},${authcode}`)
      return new Promise((resolve, reject) => {
        adminApi
          .login(username, password, authcode)
          .then(response => {
            const userInfo = response.data.data
            Vue.$log.debug('Got token', userInfo.authToken)
            commit('SET_TOKEN', userInfo.authToken)
            resolve(response)
          })
          .catch(error => {
            // 响应非200 以异常形式返回
            reject(error)
          })
      })
    },
    logout ({ commit }) {
      return new Promise(resolve => {
        commit('CLEAR_TOKEN')
        adminApi
          .logout()
          .then(response => {
            resolve()
          })
          .catch(() => {
            // 异常 放行 (异常不做任何处理)
            resolve()
          })
      })
    },
    refreshToken ({ commit }, refreshToken) {
      return new Promise((resolve, reject) => {
        adminApi
          .refreshToken(refreshToken)
          .then(response => {
            const token = response.data.data
            Vue.$log.debug('Got Token', token)
            commit('SET_TOKEN', token)
            resolve(response)
          })
          .catch(error => {
            // 存在网络错误,让代码写的更加健壮
            const data = error.response ? error.response.data : { data: 'network occur error', status: 400 }
            Vue.$log.debug('Refresh error data', data)
            if (data && data.status === 400 && data.data === refreshToken) {
              commit('CLEAR_TOKEN')
            }
            // 拒绝 无法刷新
            reject(error)
          })
      })
    }
  }
}

export default user
