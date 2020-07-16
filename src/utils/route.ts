import Taro from '@tarojs/taro'

export const navTo = (index: string, name: string, param = {}) => {
  Taro.navigateTo({
    url: `/pages/${index}/pages/${name}/index?props=${JSON.stringify(param)}`
  })
}

export const delayBack = (delta = 1, delay = 1500) => {
  setTimeout(() => {
    Taro.navigateBack({
      delta: delta
    })
  }, delay)
}
