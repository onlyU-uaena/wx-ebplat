import Taro, { useState, useEffect, useReachBottom} from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import CustomIcon from '../../../../components/CustomIcon'
import user from '../../utils/user'

interface Props {

}

const couponStatus = {
  0: '特定商品使用',
  1: '指定分类商品使用',
  2: '指定店铺可用',
  3: '全场通用'
}

const ExpiredCoupon: Taro.FC<Props> = () => {
  const dispatch = useDispatch()

  const [couponList, setCouponList] = useState()
  const [page, setPage] = useState(1)

  useEffect(() => {
    getCouponList()
  }, [])

  useReachBottom(async () => {
    const {data} = await user.getCoupon(3, page + 1, 14)
    if (data.length) {
      setPage(page + 1)
      setCouponList(couponList.concat(data))
    }
  })

  const getCouponList = async () => {
    const {data} = await user.getCoupon(3, page, 14)
    setCouponList(data)
  }

  return (
    <View>
      <TabBar title='过期券' />
      {couponList && couponList.map(item => (
        <View key={item.couponid} className='normalMargin'>
          <View className='commonRowFlex'>
            <View className='commonColumnFlex normalPadding flexCenter'
                  style={{
                    flex: 1,
                    backgroundColor: 'rgb(200, 200, 200)',
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
                    position: 'relative',
                    backgroundColor: 'white',
                    flex: 2,
                    justifyContent: 'space-around'
                  }}
            >
              <Text className='slightlySmallText'>{couponStatus[item.couponusetype]}</Text>
              <Text className='grayText slightlySmallText'>{item.providetimetr}-{item.outtimetr}</Text>
              <View style={{
                position: 'absolute',
                right: '21px',
                top: 'calc(50% - 25px)'
              }}
              >
                <CustomIcon name='expired' color='rgb(200, 200, 200)' size={50} />
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  )
}

export default ExpiredCoupon
