import Taro from '@tarojs/taro'

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

const baseUrl = 'http://mjsh.yl-mall.cn'

let requestNum = 0

const httpRequest = async (url: string, data = {}, method: keyof Method = 'GET', showLoading = true) => {
  requestNum++
  await Taro.showLoading({
    title: '',
    mask: false
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
    }
  })
  if (requestNum === 0) {
    Taro.hideLoading()
  }
  if (result.data.code !== 0) {
    await Taro.showToast({
      title: result.data.desc || '服务器开小差了～请稍后重试',
      icon: 'none'
    })
  }
  console.log(result)
  return result.data
}

export default httpRequest
