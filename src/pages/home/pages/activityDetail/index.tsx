import Taro, { useState, useEffect, useRouter, useScope } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { RichText, View } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import WxParse from '../../../../components/wxParse/wxParse'
import TabBar from '../../../../components/TabBar'
import commodity from '../../utils/commodity'

interface Props {

}

const ActivityDetail: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const scope = useScope()
  const [detail, setDetail] = useState()

  useEffect(() => {
    const id = JSON.parse(router.params.props).id
    getHotActivityDetail(id)
  }, [])

  const getHotActivityDetail = async (id: string) => {
    const {data} = await commodity.getHotActivityDetail(id)
    setDetail(data)
    WxParse.wxParse('article', 'html', data.detailinfo, scope)
  }

  return (
    <View>
      <TabBar title='活动详情' />
      <View className='normalMargin'>
        {detail && (
          <View>
            <import src='../../../../components/wxParse/wxParse.wxml' />
            <template is='wxParse' data='{{wxParseData:article.nodes}}' />
          </View>
        )}
      </View>
    </View>
  )
}

export default ActivityDetail
