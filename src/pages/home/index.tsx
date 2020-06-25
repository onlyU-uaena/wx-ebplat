import Taro, { useState } from "@tarojs/taro"
import { View } from "@tarojs/components"
import { AtButton } from 'taro-ui'
import AccountVerification from '../../utils/accountVerification'

interface Props {

}

const Home: Taro.FC<Props> = () => {

  const login = () => {
    AccountVerification.loginWithPassword()
  }

  return (
    <View>
      <AtButton>test</AtButton>
    </View>
  )
}

export default Home
