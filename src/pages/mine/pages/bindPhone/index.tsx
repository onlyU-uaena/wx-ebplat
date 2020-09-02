import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { View } from '@tarojs/components'
import './index.scss'
import { AtButton, AtInput } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import CountDownButton from '../../../../components/CountDownButton'
import account from '../../utils/login'
import { loginIn } from '@redux/actions'
import { delayBack } from '@utils/route'
import user from '../../utils/user'

interface Props {

}

const BindPhone: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [phone, setPhone] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [sms, setSms] = useState<string>('')
  const [wxInfo, setWxInfo] = useState<any>()

  useEffect(() => {
    const props = JSON.parse(router.params.props)
    setWxInfo(props)
  }, [])

  const toBind = async () => {
    const {openid, nickName, imgUrl} = wxInfo
    const regRes = await user.wxRegister(openid, nickName, imgUrl, phone, sms)
    if (regRes.code === 0) {
      Taro.setStorageSync('token', regRes.token)
      const userData = await account.getUserData()
      dispatch(loginIn(userData.data))
      delayBack(2, 0)
    }
  }

  return (
    <View>
      <TabBar title='绑定手机' />
      <View className='normalPadding whiteBack'>
        <View style={{height: '80px'}} />
        <AtInput name='username' type='phone' placeholder='手机号' onChange={(e) => setPhone(String(e))} />
        <View className='commonRowFlex flexCenter'>
          <AtInput name='sms' placeholder='验证码' maxLength={6} onChange={(e) => setSms(String(e))} />
          <View className='commonColumnFlex flexCenter' style={{
            flex: 1
          }}
          >
            <CountDownButton onClick={() => account.getSmsCode(phone, '3')}
                             title='获取验证码'
            />
          </View>
        </View>
        <AtButton type='primary' className='normalMarginTop' onClick={toBind}>完成</AtButton>
      </View>
    </View>
  )
}

export default BindPhone
