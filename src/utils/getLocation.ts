import Taro from '@tarojs/taro'

export const getLocation = async () => {
  try {
    const location = await Taro.getLocation({})
    const locationString = location.latitude + "," + location.longitude
    const result = await Taro.request({
      url: 'http://apis.map.qq.com/ws/geocoder/v1/?l&get_poi=1',
      data: {
        "key": "TNWBZ-NKPWX-FRC43-7LS4U-CGSL5-LKFXI",
        "location": locationString
      },
      method: 'GET'
    })
    return result.data.result.ad_info.city as string
  } catch (e) {
    return '获取位置失败'
  }
}

