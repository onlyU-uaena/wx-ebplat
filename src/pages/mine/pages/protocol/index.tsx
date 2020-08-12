import Taro, { useState, useEffect, useRouter, useScope } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { View } from '@tarojs/components'
import './index.scss'
import WxParse from '../../../../components/wxParse/wxParse'
import TabBar from '../../../../components/TabBar'
import account from '../../utils/login'

interface Props {

}

const Protocol: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const scope = useScope()
  const [protoTitle, setProtoTitle] = useState<string>()

  useEffect(() => {
    console.log(router.params.props)
    const title = JSON.parse(router.params.props).title
    const content = JSON.parse(router.params.props).content
    setProtoTitle(title)
    getProtocol(content)

  }, [])

  const getProtocol = async (type: number) => {
    const {data} = await account.getSinge(type)
    WxParse.wxParse('article', 'html', data, scope, 5)
  }

  return (
    <View>
      <TabBar title={protoTitle || ''} />
      <View className='normalMargin'>
        <import src='../../../../components/wxParse/wxParse.wxml' />
        <template is='wxParse' data='{{wxParseData:article.nodes}}' />
      </View>
    </View>
  )
}

export default Protocol
