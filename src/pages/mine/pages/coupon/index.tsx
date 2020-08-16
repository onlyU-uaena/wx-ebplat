import Taro, { useState, useEffect, useReachBottom } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton, AtSearchBar } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import user from '../../utils/user'
import { navTo } from '@utils/route'
import EmptyPage from '../../../../components/EmptyPage'
import HeightView from '../../../../components/HeightView'
import useDidShow = Taro.useDidShow

interface Props {

}

const couponStatus = {
  0: '特定商品使用',
  1: '指定分类商品使用',
  2: '指定店铺可用',
  3: '全场通用'
}

const Coupon: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const [swapCode, setSwapCode] = useState<string>('')
  const [couponList, setCouponList] = useState([])
  const [page, setPage] = useState(1)

  useDidShow(() => {
    getCouponList()
  })

  useReachBottom(async () => {
    const {data} = await user.getCoupon(1, page + 1, 14)
    if (data.length) {
      setPage(page + 1)
      setCouponList(couponList.concat(data))
    }
  })

  const getCouponList = async () => {
    const {data} = await user.getCoupon(1, 1, 14)
    setPage(1)
    setCouponList(data)
  }

  const swapCoupon = async () => {
    const {code} = await user.swapCoupon(swapCode)
    if (code === 0) {
      const {data} = await user.getCoupon(1, 1, 14)
      setPage(1)
      setCouponList(data)
      Taro.showToast({
        title: '兑换成功'
      })
    }
  }

  return (
    <View>
      <TabBar title='优惠券' />
      <View style={{
              backgroundColor: 'white',
              padding: '8px'
            }}
      >
        <AtSearchBar
          placeholder='请输入优惠券号码'
          showActionButton
          value={swapCode}
          onChange={setSwapCode}
          actionName='兑换'
          onActionClick={() => swapCoupon()}
        />
      </View>
      {couponList.length ? couponList.map(item => (
        <View key={item.couponid} className='normalMargin'>
          <View className='commonRowFlex'>
            <View className='commonColumnFlex normalPadding flexCenter gradientTheme'
                  style={{
                    flex: 1,
                    justifyContent: 'center'
                  }}
            >
              <View>
                <Text className='whiteText mediumText'>¥</Text>
                <Text className='whiteText' style={{fontSize: '34px'}}>{item.facevalue}</Text>
              </View>
              <Text className='whiteText slightlySmallText'>{item.coupontype === 1 ? `满${item.fullreductionvalue}可使用` : '无门槛'}</Text>
            </View>
            <View className='commonColumnFlex normalPadding'
                  style={{
                    backgroundColor: 'white',
                    flex: 2,
                    justifyContent: 'space-around'
                  }}
            >
              <Text className='slightlySmallText'>{couponStatus[item.couponusetype]}</Text>
              <Text className='grayText slightlySmallText'>{item.providetimetr}-{item.outtimetr}</Text>
            </View>
          </View>
        </View>
      )) : (
        <EmptyPage title='暂无优惠券' />
      )}
      <View className='normalMargin commonRowFlex flexCenter'
            style={{
              justifyContent: 'center'
            }}
      >
        <Text className='grayText slightlySmallText borderRight normalPaddingRight'>没有更多可用券</Text>
        <Text className='redText slightlySmallText normalPaddingLeft'
              onClick={() => navTo('mine', 'expiredCoupon')}
        >{`查看过期的券 >`}</Text>
      </View>
      <HeightView high='large' />
      <View className='commonRowFlex gradientTheme flexCenter normalPadding'
            onClick={() => navTo('mine', 'getCoupon')}
            style={{
              justifyContent: 'center',
              position: 'fixed',
              width: '100%',
              bottom: 0,
              zIndex: 999
            }}
      >
        <Text className='whiteText mediumText'>领取优惠券</Text>
      </View>
    </View>
  )
}

export default Coupon
