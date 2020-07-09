import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton, AtInput } from 'taro-ui'
import account from '../../utils/login'

interface Props {

}

const Login: Taro.FC<Props> = () => {
  const [username, setUsername] = useState<string | number>()
  const [password, setPassword] = useState<string | number>()

  const login = () => {
    account.loginWithPassword(String(username), String(password))
  }

  return (
    <View>
      <AtInput name='username' onChange={(e) => setUsername(e)} />
      <AtInput name='password' onChange={(e) => setPassword(e)} />
      <AtButton onClick={login}>登录</AtButton>
    </View>
  )
}

export default Login
