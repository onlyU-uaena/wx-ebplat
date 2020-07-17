import Taro from '@tarojs/taro'
import { baseUrl } from '@utils/request'

import SuccessCallbackResult = Taro.uploadFile.SuccessCallbackResult

const ChooseImagesListFn = (successFunc: (e: SuccessCallbackResult) => void) => {
  Taro.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      console.log(res)
      // tempFilePath可以作为img标签的src属性显示图片
      const tempFilePaths = res.tempFilePaths
      Taro.uploadFile({
        url: baseUrl + '/img/upload',
        filePath: tempFilePaths[0],
        name: 'file',
        formData: {
          'token': Taro.getStorageSync('token'),
          'relationtype': 0,
          'ch': '3'
        },
        success: successFunc
      })

    }
  })
}

export default ChooseImagesListFn
