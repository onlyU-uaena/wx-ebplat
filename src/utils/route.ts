import Taro from '@tarojs/taro'
import store from '@redux/store'

export const navTo = (index: string, name: string, param = {}, needLogin?: boolean) => {
  if (needLogin && !store.getState().authState.loginStatus) {
    Taro.navigateTo({
      url: `/pages/mine/pages/login/index`
    })
    return
  }
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
