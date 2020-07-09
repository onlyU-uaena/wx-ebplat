import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'

interface Props {

}

const Mine: Taro.FC<Props> = () => {

  return (
    <View>
      <AtButton onClick={() => {Taro.navigateTo({url: '/pages/mine/pages/login/index'})}}>登录</AtButton>
    </View>
  )
}

export default Mine
