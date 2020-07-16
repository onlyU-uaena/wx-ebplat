import Taro, { useState } from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import { AtButton, AtInput } from 'taro-ui'
import account from '../../utils/login'
import TabBar from '../../../../components/TabBar'
import './index.scss'
import colors from '../../../../common/styles/color'
import CustomIcon from '../../../../components/CustomIcon'
import CountDownButton from '../../../../components/CountDownButton'
import { delayBack, navTo } from '@utils/route'
import { useDispatch } from '@tarojs/redux'
import { loginIn } from '@redux/actions'

interface Props {

}

const Login: Taro.FC<Props> = () => {
  const [useSmsLogin, setUseSmsLogin] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [sms, setSms] = useState<string>('')
  const dispatch = useDispatch()

  const login = async () => {
    if (useSmsLogin) {
      const { code, token } = await account.loginWithPhoneNumber(username, sms)
      if (!code) {
        const { data } = await account.getUserData()
        dispatch(loginIn(data))
        Taro.setStorageSync('token', token)
      }
      delayBack(1, 0)
    } else {
      const { code, token } = await account.loginWithPassword(username, password)
      if (!code) {
        const { data } = await account.getUserData()
        dispatch(loginIn(data))
        Taro.setStorageSync('token', token)
      }
      delayBack(1, 0)
    }
  }

  const sendCode = async () => {
    const res = await account.getSmsCode(username, '5')
    return !res.code;
  }

  return (
    <View>
      <TabBar title='登录' />
      <View className='normalPadding whiteBack'>
        <View style={{height: '80px'}} />
        <AtInput name='username' placeholder='用户名/手机号' onChange={(e) => setUsername(String(e))} />
        {!useSmsLogin ? (
          <AtInput name='password' placeholder='密码' type='password' onChange={(e) => setPassword(String(e))} />
        ) : (
          <View className='commonRowFlex flexCenter'>
            <AtInput name='sms' placeholder='验证码' type='number' maxLength={6} onChange={(e) => setSms(String(e))} />
            <View className='commonColumnFlex flexCenter' style={{
              flex: 1
            }}
            >
              <CountDownButton onClick={sendCode}
                               title='获取验证码'
              />
            </View>
          </View>
        )}
        <View className='commonRowFlex normalMarginTop normalMarginBottom' style={{
          justifyContent: 'space-between'
        }}
        >
          <Text className='slightlySmallText'
                onClick={() => navTo('mine', 'register')}
                style={{
                  color: colors.blue
                }}
          >注册</Text>
          <Text className='slightlySmallText'
                onClick={() => setUseSmsLogin(!useSmsLogin)}
                style={{
                  color: colors.blue
                }}
          >{!useSmsLogin ? '验证码登录' : '密码登录'}</Text>
        </View>
        <AtButton type='primary' onClick={login}>登录</AtButton>
        <View className='commonColumnFlex flexCenter normalMarginTop'>
          <CustomIcon name='weChat' color='rgb(90, 195, 58)' size={25} />
          <Text className='slightlySmallText smallMarginTop'>微信登录</Text>
        </View>
      </View>
    </View>
  )
}

export default Login
