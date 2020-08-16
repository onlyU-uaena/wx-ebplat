import Taro, { useState, useEffect, useReachBottom } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import user from '../../utils/user'
import { selectShopState } from '@redux/reducers/selector'
import EmptyPage from '../../../../components/EmptyPage'
import { delayBack } from '@utils/route'

interface Props {

}

const couponStatus = {
  0: '特定商品使用',
  1: '指定分类商品使用',
  2: '指定店铺可用',
  3: '全场通用'
}

const GetCoupon: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const shopState = useSelector(selectShopState)
  const [page, setPage] = useState<number>(1)
  const [list, setList] = useState([])

  const getList = async () => {
    const {data} = await user.getWaitedCoupon(shopState.shopData.shopid, page, 14)
    if (data.length) {
      setPage(page + 1)
      setList(list.concat(data))
    }
  }

  const toGet = async (id: number) => {
    const {code} = await user.swapCoupon(id)
    if (code === 0) {
      Taro.showToast({
        title: '领取成功'
      })
      delayBack(1, 1000)
    }
  }

  useReachBottom(() => getList())

  useEffect(() => {
    getList()
  }, [])

  return (
    <View>
      <TabBar title='领取优惠券' />
      <View>
        {list.length ? list.map(item => (
          <View key={item.couponid} className='normalMargin'>
            <View className='commonRowFlex'>
              <View className='commonColumnFlex normalPadding flexCenter gradientTheme'
                    style={{
                      flex: 3,
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
                      flex: 6,
                      justifyContent: 'space-around'
                    }}
              >
                <Text className='slightlySmallText'>{couponStatus[item.couponusetype]}</Text>
                <Text className='grayText slightlySmallText'>{item.providetimetr}-{item.outtimetr}</Text>
              </View>
              <View className='normalPadding commonColumnFlex flexCenter gradientTheme'
                    onClick={() => toGet(item.id)}
                    style={{
                      flex: 1,
                      justifyContent: 'space-around'
                    }}
              >
                <Text className='slightlySmallText whiteText'>领</Text>
                <Text className='slightlySmallText whiteText'>取</Text>
              </View>
            </View>
          </View>
        )) : (
          <EmptyPage title='暂无可领取优惠券' />
        )}
      </View>
    </View>
  )
}

export default GetCoupon
