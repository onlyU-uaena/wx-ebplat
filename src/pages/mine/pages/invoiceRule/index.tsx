import Taro, { useState, useEffect, useScope } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { View } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import account from '../../utils/login'
import WxParse from '../../../../components/wxParse/wxParse'

interface Props {

}

const InvoiceRule: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const scope = useScope()
  const [detail, setDetail] = useState()

  const getContent = async () => {
    const {data} = await account.getSinge(16)
    setDetail(data)
    WxParse.wxParse('article', 'html', data, scope, 5)
  }

  useEffect(() => {
    getContent()
  }, [])

  return (
    <View>
      <TabBar title='开票规则' />
      {detail && (
        <View className='normalMargin'>
          <import src='../../../../components/wxParse/wxParse.wxml' />
          <template is='wxParse' data='{{wxParseData:article.nodes}}' />
        </View>
      )}
    </View>
  )
}

export default InvoiceRule
