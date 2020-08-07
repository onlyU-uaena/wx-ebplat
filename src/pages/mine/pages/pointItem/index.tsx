import Taro, { useState, useEffect, useRouter, useScope } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Button, Image, Text, View } from '@tarojs/components'
import './index.scss'
import { AtAvatar, AtButton, AtFloatLayout, AtInputNumber, AtRate, AtTag } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import SwiperImg from '../../../../components/SwiperImg'
import CustomIcon from '../../../../components/CustomIcon'
import colors from '../../../../common/styles/color'
import WxParse from '../../../../components/wxParse/wxParse'
import HeightView from '../../../../components/HeightView'

interface Props {

}

const PointItem: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [proDetail, setProDetail] = useState()
  const [imgList, setImgList]= useState()
  const scope = useScope()

  useEffect(() => {
    const pro = JSON.parse(router.params.props).pro
    setProDetail(pro)
    setImgList(pro.goodimg.split(','))
    WxParse.wxParse('article', 'html', pro.goodinfo, scope, 5)
  }, [])

  return (
    <View>
      <TabBar title='兑换详情' />
      {proDetail.id && (
        <View id='detail0'>
          {/*轮播图*/}
          {proDetail && <SwiperImg swiperHeight='300px' list={imgList} />}
          {/*标题*/}
          <View className='normalPadding commonColumnFlex' style={{
            backgroundColor: 'white'
          }}
          >
            <View className='commonRowFlex flexCenter' style={{
              justifyContent: 'space-between'
            }}
            >
              <Text className='mediumText'>{proDetail.goodname}</Text>
            </View>
            <Text className='mediumText redText'>{proDetail.points}积分</Text>
          </View>
          {/*商品图*/}
          <Text id='detail2' className='mediumText normalPadding borderBottom' style={{
            backgroundColor: 'white',
            display: 'block'
          }}
          >商品详情</Text>
          {/*售后*/}
          <View className='commonColumnFlex flexCenter normalMarginTop normalMarginBottom normalPadding' style={{
            justifyContent: 'center',
            backgroundColor: 'white'
          }}
          >
            <import src='../../../../components/wxParse/wxParse.wxml' />
            <template is='wxParse' data='{{wxParseData:article.nodes}}' />
          </View>
          <HeightView high='large' />
          <HeightView high='large' />
          {/*底部按钮*/}
          <View className='bottomGroup'>
            <AtButton full type='primary'>兑换</AtButton>
          </View>
        </View>
      )}
    </View>
  )
}

export default PointItem
