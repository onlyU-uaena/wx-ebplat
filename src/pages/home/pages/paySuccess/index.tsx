import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import HeightView from '../../../../components/HeightView'
import FreshList, { FreshListInterface } from '../../../../components/FreshList'
import commodity from '../../utils/commodity'
import { selectShopState } from '@redux/reducers/selector'

interface Props {

}

const PaySuccess: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [freshList, setFreshList] = useState<FreshListInterface>()
  const shopState = useSelector(selectShopState)
  const [detail, setDetail] = useState()

  useEffect(() => {
    const order = JSON.parse(router.params.props).detail
    setDetail(order)
  }, [])

  return (
    <View>
      <TabBar title='支付成功' />
      {detail && (
        <View className='gradientTheme commonColumnFlex flexCenter'
              style={{
                padding: '32px'
              }}
        >
          <Text className='whiteText' style={{fontSize: '30px'}}>¥ {detail.actualPay.toFixed(2)}</Text>
          <HeightView />
          <Text className='whiteText slightlySmallText'>获得{detail.actualPay.toFixed(0)}积分</Text>
          <HeightView high='large' />
          <View className='commonRowFlex flexCenter'
                style={{
                  justifyContent: 'space-around',
                  width: '100%'
                }}
          >
            <AtButton circle size='normal' onClick={() => Taro.navigateBack()} customStyle={{color: 'white'}}>查看订单</AtButton>
            <AtButton circle size='normal' onClick={() => Taro.switchTab({url: '/pages/home/index'})} customStyle={{color: 'white'}}>返回首页</AtButton>
          </View>
        </View>
      )}
      <Text className='normalMarginTop normalMarginBottom' style={{
        display: 'block',
        fontSize: '20px',
        textAlign: 'center'
      }}
      >
        为您推荐
      </Text>
      <View className='normalMarginLeft normalMarginRight'>
        <FreshList onRef={setFreshList} dispatchListFunc={async (page: number, size: number) => {
          return await commodity.getTopicSku('', Number(shopState.shopData.shopid), page, size)
        }}
        />
      </View>
    </View>
  )
}

export default PaySuccess
