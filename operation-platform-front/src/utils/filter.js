import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/zh-cn'
import {
  timeAgo
} from '@/utils/util'
moment.locale('zh-cn')

Vue.filter('NumberFormat', function (value) {
  if (!value) {
    return '0'
  }
  const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  return intPartFormat
})
// 精确到时分
Vue.filter('dayjs', function (dataStr, pattern = 'YYYY-MM-DD HH:mm') {
  return moment(dataStr).format(pattern)
})

// 精确到时分
Vue.filter('moment', function (dataStr, pattern = 'YYYY-MM-DD HH:mm') {
  return moment(dataStr).format(pattern)
})
// 文章时间精确到年月
Vue.filter('moment_post_date', function (dataStr, pattern = '/YYYY/MM/') {
  return moment(dataStr).format(pattern)
})
// 文章时间精确到年月日
Vue.filter('moment_post_day', function (dataStr, pattern = '/YYYY/MM/DD/') {
  return moment(dataStr).format(pattern)
})

// 时间辅助函数  精确到多少天之前
Vue.filter('timeAgo', timeAgo)

// 文件大小规范化
Vue.filter('fileSizeFormat', function (value) {
  if (!value) {
    return '0 Bytes'
  }
  // 存在单位
  let unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let index = 0
  let srcSize = parseFloat(value) // 转为10进制浮点数
  // 向上取整 表示它能够用什么单位表示
  index = Math.floor(Math.log(srcSize) / Math.log(1024))
  let size = srcSize / Math.pow(1024, index) // 取整 (最合适的单位)
  size = size.toFixed(2) // 保留两位
  return size + ' ' + unitArr[index] // 然后根据 index 拿到最合适的单位 append
})

// 计算时间
Vue.filter('dayTime', function (value) {
  // 24*3600 一天   算有多少天
  let days = Math.floor(value / 86400)
  // 算时间  将天数拿掉  剩下的便是时间
  let hours = Math.floor((value % 86400) / 3600)
  let minutes = Math.floor(((value % 86400) % 3600) / 60)
  let seconds = Math.floor(((value % 86400) % 3600) % 60)
  let duration = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's'
  return duration
})
