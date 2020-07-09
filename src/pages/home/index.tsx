import Taro, { useState } from "@tarojs/taro"
import { View } from "@tarojs/components"
import { AtButton } from 'taro-ui'

interface Props {
}

const Home: Taro.FC<Props> = () => {

  return (
    <View>
      <AtButton>test</AtButton>
    </View>
  )
}

export default Home
