import moment from 'moment'
import 'moment/locale/zh-cn'
/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  // 创建一个事件
  const event = document.createEvent('HTMLEvents')
  // 设置状态  是否可以冒泡   是否可以取消
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  // 浏览器发布事件
  window.dispatchEvent(event)
}

// 时间辅助函数
export function timeAgo (time) {
  var currentTime = new Date().getTime()
  var between = currentTime - time
  var days = Math.floor(between / (24 * 3600 * 1000))
  if (days === 0) {
    var leave1 = between % (24 * 3600 * 1000)
    var hours = Math.floor(leave1 / (3600 * 1000))
    if (hours === 0) {
      var leave2 = leave1 % (3600 * 1000)
      var minutes = Math.floor(leave2 / (60 * 1000))
      if (minutes === 0) {
        var leave3 = leave2 % (60 * 1000)
        var seconds = Math.round(leave3 / 1000)
        return seconds + ' 秒前'
      }
      return minutes + ' 分钟前'
    }
    return hours + ' 小时前'
  }
  if (days < 0) return '刚刚'
  if (days < 5) {
    return days + ' 天前'
  } else {
    return moment(time).format('YYYY-MM-DD HH:mm')
  }
}
// 判断一个 元素是否是一个对象
export function isObject (value) {
  return value && typeof value === 'object' && value.constructor === Object
}

/**
 * 同步调用
 * @param callback
 * @returns {Promise<void>}
 */
export async function sycCall (callback) {
  await callback()
}
