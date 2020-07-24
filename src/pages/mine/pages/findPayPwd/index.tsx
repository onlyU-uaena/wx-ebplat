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

const FindPayPwd: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const authState = useSelector(selectAuthState)
  const [oldPwd, setOldPwd] = useState<string>('')
  const [pwd, setPwd] = useState<string>('')
  const [confirmPwd, setConfirmPwd] = useState<string>('')

  const modifyPwd = async () => {
    const {code} = await user.updatePayPwd(oldPwd, pwd, confirmPwd)
    if (code === 0) {
      Taro.showToast({
        title: '修改成功'
      })
      delayBack(1, 1000)
    }
  }

  return (
    <View>
      <TabBar title='修改支付密码' />
      <View style={{
        backgroundColor: 'white'
      }}
      >
        <AtInput
          title='旧支付密码'
          type='text'
          value={oldPwd}
          placeholder='输入旧支付密码'
          name='phone'
          onChange={(e) => setOldPwd(String(e))}
        />
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

export default FindPayPwd
