import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton, AtInput, AtTextarea } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import user from '../../utils/user'
import HeightView from '../../../../components/HeightView'
import { delayBack } from '@utils/route'

interface Props {

}

const Feedback: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const [content, setContent] = useState<string>('')
  const [phone, setPhone] = useState<number>(0)

  const confirmFeedback = async () => {
    const {code} = await user.addFeedback(content, 0)
    if (code === 0) {
      Taro.showToast({
        title: '提交成功'
      })
      delayBack(1, 1000)
    }
  }

  return (
    <View>
      <TabBar title='服务反馈' />
      <View className='normalPadding' style={{
        backgroundColor: 'white',
      }}
      >
        <View>
          <Text className='mediumText'>下方输入反馈内容</Text>
          <HeightView high='normal' />
          <View>
            <AtTextarea
              value={content}
              onChange={setContent}
              maxLength={200}
              placeholder='请输入客户端意见,我们将不断优化服务'
            />
            {/*<AtInput name='phone'*/}
            {/*         onChange={e => setPhone(String(e))}*/}
            {/*         value={phone}*/}
            {/*         placeholder='请输入您的手机号/邮箱'*/}
            {/*/>*/}
          </View>
          <HeightView high='large' />
          <AtButton type='primary'
                    full
                    disabled={!content}
                    onClick={() => confirmFeedback()}
          >
            提交
          </AtButton>
        </View>
      </View>
    </View>
  )
}

export default Feedback
