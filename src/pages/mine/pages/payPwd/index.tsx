import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton, AtInput } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import user from '../../utils/user'
import { delayBack, navTo } from '@utils/route'

interface Props {

}

const PayPwd: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const [pwd, setPwd] = useState<string>('')
  const [confirmPwd, setConfirmPwd] = useState<string>('')

  const addPwd = async () => {
    const {code} = await user.setPayPwd(pwd, confirmPwd)
    if (code === 0) {
      Taro.showToast({
        title: '设置成功'
      })
      delayBack(1, 1000)
    }
  }

  return (
    <View>
      <TabBar title='设置支付密码' />
      <View style={{
        backgroundColor: 'white'
      }}
      >
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
        <View className='commonRowFlex normalMargin'
              style={{
                justifyContent: 'flex-end'
              }}
        >
          <Text className='orangeText mediumText'
                onClick={() => navTo('mine', 'findPayPwd')}
          >
            找回密码
          </Text>
        </View>
        <View className='normalMarginLeft normalMarginRight'>
          <AtButton type='primary'
                    onClick={() => addPwd()}
                    full
          >
            确认
          </AtButton>
        </View>
      </View>
    </View>
  )
}

export default PayPwd
