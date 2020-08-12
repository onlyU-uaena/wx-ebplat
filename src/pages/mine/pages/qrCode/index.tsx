import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { useDispatch  } from '@tarojs/redux'
import { Image, Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import CustomIcon from '../../../../components/CustomIcon'
import HeightView from '../../../../components/HeightView'

interface Props {

}

const QrCode: Taro.FC<Props> = () => {
  const router = useRouter()
  const [order, setOrder] = useState()

  useEffect(() => {
    const detail = JSON.parse(router.params.props)
    setOrder(detail)
  }, [])

  return (
    <View>
      <TabBar title='自提码' />
      <View className='commonColumnFlex flexCenter'
            style={{
              marginTop: '64px'
            }}
      >
        <View className='commonRowFlex flexCenter'>
          <CustomIcon name='shop1' size={25} color='black' />
          <Text className='slightlySmallText normalMarginLeft'>{order.shopname}</Text>
        </View>
        <HeightView />
        <View className='commonRowFlex'>
          <Text className='slightlySmallText'>订单号</Text>
          <Text className='slightlySmallText normalMarginLeft'>{order.code}</Text>
        </View>
        <HeightView />
        <AtButton type='primary' onClick={() => Taro.navigateBack()} size='small'>查看订单详情</AtButton>
        <HeightView />
        <View className='normalPadding radius commonColumnFlex flexCenter'>
          <Text className='slightlySmallText'>向店家出具二维码即可消费</Text>
          <HeightView />
          <Image src={order.qrcode}
                 style={{
                   width: '500rpx',
                   height: '500rpx'
                 }}
          />
          <HeightView />
          <Text className='orangeText slightlySmallText'>自取码 {order.qrcodenumber}</Text>
        </View>
      </View>
    </View>
  )
}

export default QrCode
