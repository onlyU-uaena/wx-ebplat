import Taro from '@tarojs/taro'

export const getLocation = async () => {
  try {
    const location = await Taro.getLocation({})
    const locationString = location.latitude + "," + location.longitude
    const result = await Taro.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/?l&get_poi=1',
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

export const getLatitude = async (address: string) => {
  const res = await Taro.request({
    url: `http://restapi.amap.com/v3/geocode/geo?key=bb8109e1ffec2a1803bd9983b4b3a5a2&s=rsv3&city=&address=${address}`,
    method: 'GET'
  })
  return res.data
}
