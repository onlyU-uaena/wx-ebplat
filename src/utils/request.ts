import Taro from '@tarojs/taro'
import { delayBack, navTo } from '@utils/route'

interface Method {
  /** HTTP 请求 OPTIONS */
  OPTIONS
  /** HTTP 请求 GET */
  GET
  /** HTTP 请求 HEAD */
  HEAD
  /** HTTP 请求 POST */
  POST
  /** HTTP 请求 PUT */
  PUT
  /** HTTP 请求 DELETE */
  DELETE
  /** HTTP 请求 TRACE */
  TRACE
  /** HTTP 请求 CONNECT */
  CONNECT
}

export const baseUrl = 'http://mjsh.yl-mall.cn/'

let requestNum = 0
let timer

const httpRequest = async (url: string, data = {}, showToast = true, showLoading = true, jumpToLogin = true, method: keyof Method = 'GET', backFn?, delta = 1) => {
  requestNum++
  if (showLoading)
    await Taro.showLoading({
      title: '',
      mask: true
    })
  const result = await Taro.request({
    url: baseUrl + url,
    method: method,
    data: {
      ch: '3',
      token: Taro.getStorageSync('token'),
      ...data
    },
    complete: () => {
      requestNum--
      if (requestNum === 0) {
        try {
          Taro.hideLoading()
        } catch (e) {
          console.log(e)
        }
      }
    }
  })

  if (result.data.code !== 0 && !Taro.getStorageSync('token') && jumpToLogin) {
    navTo('mine', 'login', {delta: delta})
  } else if (result.data.code !== 0 && showToast) {
    await Taro.showToast({
      title: result.data.desc || '服务器开小差了～请稍后重试',
      icon: 'none'
    })
  }

  console.log(result)
  if (typeof backFn === 'function')
    backFn()
  return result.data
}

export default httpRequest
