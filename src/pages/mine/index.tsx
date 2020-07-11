import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.scss'

interface Props {

}

const Mine: Taro.FC<Props> = () => {

  return (
    <View>
      <AtButton className='gradientTheme' type='primary' onClick={() => {Taro.navigateTo({url: '/pages/mine/pages/login/index'})}}>登录</AtButton>
    </View>
  )
}

export default Mine
