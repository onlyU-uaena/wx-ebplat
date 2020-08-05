import Taro, { useState } from '@tarojs/taro'
import { Button, Text, View } from '@tarojs/components'
import { AtButton, AtInput } from 'taro-ui'
import account from '../../utils/login'
import TabBar from '../../../../components/TabBar'
import './index.scss'
import colors from '../../../../common/styles/color'
import CountDownButton from '../../../../components/CountDownButton'
import { delayBack, navTo } from '@utils/route'
import { useDispatch } from '@tarojs/redux'
import { loginIn } from '@redux/actions'
import CustomIcon from '../../../../components/CustomIcon'
import user from '../../utils/user'

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
        Taro.setStorageSync('token', token)
        const { data } = await account.getUserData()
        dispatch(loginIn(data))
        delayBack(1, 0)
      }
    } else {
      const { code, token } = await account.loginWithPassword(username, password)
      if (!code) {
        Taro.setStorageSync('token', token)
        const { data } = await account.getUserData()
        dispatch(loginIn(data))
        delayBack(1, 0)
      }
    }
  }

  const wxLogin = async () => {
    Taro.login({
      success: (e) => {
        Taro.getUserInfo({
          withCredentials: true,
          success: async (info) => {
            console.log(info)
            console.log(e)
            const {data, code} = await user.wxAuth(e.code)
            Taro.setStorageSync('openid', data)
            if (code === 0) {
              const loginRes = await user.wxLogin(data)
              if (loginRes.code === 0) {
                Taro.setStorageSync('token', loginRes.token)
                const userData = await account.getUserData()
                dispatch(loginIn(userData.data))
                delayBack(1, 0)
              }
            } else {
              const regRes = await user.wxRegister(data, info.userInfo.nickName, info.userInfo.avatarUrl)
              if (regRes.code === 0) {
                const userData = await account.getUserData()
                dispatch(loginIn(userData.data))
                delayBack(1, 0)
              }
            }
          }
        })
      }
    })
  }

  const sendCode = async () => {
    return await account.getSmsCode(username, '5');
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
              <CountDownButton onClick={() => sendCode()}
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
          <Button plain
                  openType='getUserInfo'
                  onClick={() => wxLogin()}
                  className='commonColumnFlex flexCenter'
                  style={{
                    flex: 1,
                    paddingLeft: 0,
                    paddingRight: 0,
                    lineHeight: 'initial',
                    border: 'none'
                  }}
                  key={44}
          >
            <CustomIcon onClick={() => wxLogin()} name='weChat' color='rgb(90, 195, 58)' size={25} />
            <Text className='slightlySmallText smallMarginTop'>微信登录</Text>
          </Button>
        </View>
      </View>
    </View>
  )
}

export default Login
