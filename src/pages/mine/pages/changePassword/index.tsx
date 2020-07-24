import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { View } from '@tarojs/components'
import './index.scss'
import { AtButton, AtInput } from 'taro-ui'
import { selectAuthState } from '@redux/reducers/selector'
import account from '../../utils/login'
import CountDownButton from '../../../../components/CountDownButton'
import TabBar from '../../../../components/TabBar'
import user from '../../utils/user'
import { delayBack } from '@utils/route'

interface Props {

}

const ChangePassword: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const authState = useSelector(selectAuthState)
  const [sms, setSms] = useState<string>('')
  const [pwd, setPwd] = useState<string>('')
  const [confirmPwd, setConfirmPwd] = useState<string>('')

  const sendCode = async () => {
    return await account.getSmsCode(authState.userData.mobile, '3');
  }

  const modifyPwd = async () => {
    const {code} = await user.changePassword(authState.userData.mobile, sms, pwd, confirmPwd)
    if (code === 0) {
      Taro.showToast({
        title: '修改密码成功'
      })
      delayBack(1, 1000)
    }
  }

  return (
    <View>
      <TabBar title='修改密码' />
      <View style={{
        backgroundColor: 'white'
      }}
      >
        <AtInput
          editable={false}
          title='手机号'
          type='text'
          value={authState.userData.mobile}
          name='phone'
          onChange={() => {}}
        />
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
        <AtInput
          name='pwd'
          title='密码'
          type='text'
          placeholder='输入要修改的密码'
          value={pwd}
          onChange={(e) => setPwd(String(e))}
        />
        <AtInput
          name='confirmPwd'
          title='确认密码'
          type='text'
          placeholder='请再输一次'
          value={confirmPwd}
          onChange={(e) => setConfirmPwd(String(e))}
        />
      </View>
      <View className='normalMargin'>
        <AtButton onClick={() => modifyPwd()}
                  type='primary'
                  full
        >
          确认
        </AtButton>
      </View>
    </View>
  )
}

export default ChangePassword
