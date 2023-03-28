import Vue from 'vue'
import {
  OPTIONS
} from '@/store/mutation-types'
import optionApi from '@/api/option'

const keys = [
  // 开发者模式
  'developer_mode',
  // 图片附件上传预览
  'attachment_upload_image_preview_enable',
  // 最大并发上传限制
  'attachment_upload_max_parallel_uploads',
  // 附件上传最大文件数
  'attachment_upload_max_files'
]

const option = {
  state: {
    options: {}
  },
  mutations: {
    SET_OPTIONS: (state, options) => {
      Vue.ls.set(OPTIONS, options)
      state.options = options
    }
  },
  actions: {
    // 加载属性配置
    loadOptions ({
      commit
    }) {
      return new Promise((resolve, reject) => {
        optionApi
          .listAllByKeys(keys)
          .then(response => {
            commit('SET_OPTIONS', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default option
