const systemSetting = require('./src/config/system.setting.js')
const {resolve} = require('path')

/**
 * 路径解析函数
 * @param dir
 * @returns {string}
 */
function resolvePath(dir) {
  return resolve(__dirname, dir)
}

const isEnvProduction = process.env.NODE_ENV === 'production'

const name = systemSetting.title || '商城后台管理' // page t

const port = process.env.port || 8080 // dev port
module.exports = {
  publicPath: '/',
  chainWebpack(config) {
    // 没啥用
    // config.resolve.alias
    //   .set('api', resolvePath('src/api'))
    //   .set('components', resolvePath('src/components'))
    //   .set('utils', resolvePath('src/utils'))
    //   .set('config', resolvePath('src/config'))
    //   .set('assets', resolvePath('assets'))
    //   .set('layouts',resolvePath('layouts'))
    // 设置标题
    config.name = name
  },
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: !isEnvProduction, // 非生产环境启动 ..
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // api开头的全部 重定向,并将/api 去掉
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://127.0.0.1:9090/api/',
        changeOrigin: true,
        // 不需要路径重写
        // pathRewrite: {
        //   ['^' + process.env.VUE_APP_BASE_API]: ''
        // }
      }
    }
  },
  // loader 启用js 处理
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
}
