import Taro, { useState } from "@tarojs/taro"
import { View } from "@tarojs/components"
import { AtButton } from 'taro-ui'
import TabBar from '../../components/TabBar'

interface Props {
}

const Home: Taro.FC<Props> = () => {

  return (
    <View>
      <TabBar backButton honeButton title='首页' />
    </View>
  )
}

export default Home
