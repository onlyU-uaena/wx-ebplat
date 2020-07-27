import Taro, { useState, useEffect, useScope, useRouter } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { RichText, View } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import user from '../../utils/user'
import WxParse from '../../../../components/wxParse/wxParse'

interface Props {

}

const MessageDetail: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const scope = useScope()
  const [detail, setDetail] = useState()

  const getDetail = async (id: number) => {
    const data = await user.getMessageDetail(id)
    const reg = new RegExp('<body>[\\s\\S]*?</body>', 'g')
    const result = reg.exec(String(data)) || []
    console.log(reg.exec(String(data)), data)
    setDetail(data)
    WxParse.wxParse('article', 'html', result[0], scope, 5)
  }

  useEffect(() => {
    const props = JSON.parse(router.params.props)
    getDetail(props.id)
  }, [])

  return (
    <View>
      <TabBar title='消息详情' />
      <import src='../../../../components/wxParse/wxParse.wxml' />
      <View className='normalMargin'>
        <template is='wxParse' data='{{wxParseData:article.nodes}}' />
      </View>
    </View>
  )
}

export default MessageDetail
