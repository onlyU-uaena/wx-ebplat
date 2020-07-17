import Taro, { useState } from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import { AtButton, AtInput } from 'taro-ui'
import account from '../../utils/login'
import TabBar from '../../../../components/TabBar'
import './index.scss'
import CountDownButton from '../../../../components/CountDownButton'
import { delayBack } from '@utils/route'
import { loginIn } from '@redux/actions'
import { useDispatch } from '@tarojs/redux'

interface Props {

}

const Register: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [sms, setSms] = useState<string>('')

  const register = async () => {
    const res = await account.registerWithPhoneNumber(username, sms, password)
    if (!res.code) {
      Taro.setStorageSync('token', res.token)
      const { data } = await account.getUserData()
      dispatch(loginIn(data))
      Taro.showToast({
        title: '注册成功'
      })
      delayBack(2)
    }
  }

  return (
    <View>
      <TabBar title='注册' />
      <View className='normalPadding whiteBack'>
        <View style={{height: '80px'}} />
        <AtInput name='username' placeholder='用户名/手机号' onChange={(e) => setUsername(String(e))} />
        <AtInput name='password' placeholder='密码' onChange={(e) => setPassword(String(e))} />
        <View className='commonRowFlex flexCenter'>
          <AtInput name='sms' placeholder='验证码' maxLength={6} onChange={(e) => setSms(String(e))} />
          <View className='commonColumnFlex flexCenter' style={{
            flex: 1
          }}
          >
            <CountDownButton onClick={() => account.getSmsCode(username, '0')}
                             title='获取验证码'
            />
          </View>
        </View>
        <AtButton type='primary' className='normalMarginTop' onClick={register}>注册</AtButton>
      </View>
    </View>
  )
}

export default Register
