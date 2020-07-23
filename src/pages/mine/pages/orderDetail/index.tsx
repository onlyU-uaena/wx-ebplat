import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton, AtListItem } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import HeightView from '../../../../components/HeightView'
import ReadCommodity from '../../../../components/ReadCommodity'
import CustomIcon from '../../../../components/CustomIcon'
import order from '../../utils/order'
import { delayBack, navTo } from '@utils/route'
import { toCancelOrder, toDeleteOrder } from '../../utils/modalOrder'

interface Props {

}

const OrderDetail: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [orderDetail, setOrderDetail] = useState()

  const statusToTitle = {
    0: {name: '待付款', button: [
        {title: '取消订单', func: async (item) => {
            await toCancelOrder(item.id, item.status)
            delayBack(1, 1000)
          }},
        {
          title: '去支付',
          func: async (item) => {
            const {code} = await order.payOrder(item.groupcode, item.status)
            if (code === 0) {
              Taro.showToast({
                title: '支付成功'
              })
              delayBack(1, 1000)
            }
          }
        }
      ]},
    6: {name: '已取消', button: [
        {
          title: '删除订单',
          func: async (item) => {
            await toDeleteOrder(item.id)
            delayBack(1, 1000)
          }
        }
      ]},
    5: {name: '取消申请中', button: [
        {
          title: '删除订单',
          func: async (item) => {
            await toDeleteOrder(item.id)
            delayBack(1, 1000)
          }
        }
      ]},
    1: {name: '待受理', button: [
        {
          title: '删除订单',
          func: async (item) => {
            await toDeleteOrder(item.id)
            delayBack(1, 1000)
          }
        }
      ]},
    8: {name: '待收货', button: [
        {
          title: '删除订单',
          func: async (item) => {
            await toDeleteOrder(item.id)
            delayBack(1, 1000)
          }
        }
      ]},
    10: {name: '待评论', button: [
        {
          title: '删除订单',
          func: async (item) => {
            await toDeleteOrder(item.id)
            delayBack(1, 1000)
          }
        }
      ]},
    2: {name: '已受理', button: [
        {
          title: '删除订单',
          func: async (item) => {
            await toDeleteOrder(item.id)
            delayBack(1, 1000)
          }
        }
      ]},
    11: {name: '退货中', button: [
        {
          title: '删除订单',
          func: async (item) => {
            await toDeleteOrder(item.id)
            delayBack(1, 1000)
          }
        }
      ]},
    12: {name: '已退款', button: [
        {
          title: '删除订单',
          func: async (item) => {
            await toDeleteOrder(item.id)
            delayBack(1, 1000)
          }
        }
      ]},
    13: {name: '退款不通过', button: [
        {
          title: '删除订单',
          func: async (item) => {
            await toDeleteOrder(item.id)
            delayBack(1, 1000)
          }
        }
      ]},
  }

  const getDetail = async (id) => {
    const {data} = await order.getOrderList(1, 10, '', id)
    setOrderDetail(data[0])
  }

  useEffect(() => {
    const props = JSON.parse(router.params.props)
    console.log(props)
    getDetail(props.id)
  }, [router.params.props])

  return (
    <View>
      <TabBar title='订单详情' />
      {orderDetail && (
        <View>
          <View style={{
            backgroundColor: 'white'
          }}
          >
            <View className='commonRowFlex normalPadding borderBottom flexCenter'
                  style={{
                    justifyContent: 'space-between'
                  }}
            >
              <Text className='mediumText'>订单号 {orderDetail.code}</Text>
              <Text className='mediumText orangeText'>{statusToTitle[orderDetail.status].name}</Text>
            </View>
            <View className='commonRowFlex normalPadding borderBottom flexCenter'
                  style={{
                    justifyContent: 'space-between'
                  }}
            >
              <Text className='mediumText'>配送方式</Text>
              <Text className='mediumText'>{orderDetail.deliverymode === 0 ? '物流配送' : '自提'}</Text>
            </View>
          </View>
          <HeightView />
          <View style={{
            backgroundColor: 'white'
          }}
          >
            <AtListItem title='收货人' extraText={orderDetail.consignee} />
          </View>
          <HeightView />
          <View className='borderBottom'>
            {orderDetail.lsitdetais.map((item, index) => (
              <ReadCommodity key={index} imgUrl={item.productimg} title={item.productname} price={item.proprice} num={item.productcount}  />
            ))}
          </View>
          <View className='normalPadding commonColumnFlex borderBottom'
                style={{
                  backgroundColor: 'white'
                }}
          >
            <View className='commonRowFlex flexCenter normalMarginBottom'
                  style={{
                    justifyContent: 'space-between'
                  }}
            >
              <Text className='mediumText'>商品总价</Text>
              <Text className='slightlySmallText'>¥{orderDetail.price}</Text>
            </View>
            <View className='commonRowFlex flexCenter normalMarginBottom'
                  style={{
                    justifyContent: 'space-between'
                  }}
            >
              <Text className='mediumText'>配送费</Text>
              <Text className='slightlySmallText'>¥0.00</Text>
            </View>
            <View className='commonRowFlex flexCenter'
                  style={{
                    justifyContent: 'space-between'
                  }}
            >
              <Text className='mediumText'>优惠券</Text>
              <Text className='slightlySmallText'>¥0.00</Text>
            </View>
          </View>
          <View className='normalPadding commonColumnFlex'
                style={{
                  backgroundColor: 'white'
                }}
          >
            <View className='commonRowFlex normalMarginBottom'
                  style={{
                    justifyContent: 'flex-end'
                  }}
            >
              <Text className='mediumText'>总计</Text>
              <Text className='redText normalMarginLeft'>¥{orderDetail.actualpay.toFixed(2)}</Text>
            </View>
            <AtButton customStyle={{width: '100%'}} size='small' type='primary' openType='contact'>
              联系客服
            </AtButton>
          </View>
          <HeightView />
          <View style={{
            backgroundColor: 'white'
          }}
          >
            <View className='commonRowFlex normalPadding borderBottom flexCenter'
                  style={{
                    justifyContent: 'space-between'
                  }}
            >
              <Text className='mediumText'>下单时间</Text>
              <Text className='slightlySmallText grayText'>{orderDetail.addorderdate}</Text>
            </View>
            {statusToTitle[orderDetail.status].button.length === 2 ? (
              <View className='commonRowFlex normalPadding borderBottom flexCenter'
                    style={{
                      justifyContent: 'flex-end'
                    }}
              >
                <AtButton onClick={() => statusToTitle[orderDetail.status].button[0].func(orderDetail)} size='small'>{statusToTitle[orderDetail.status].button[0].title}</AtButton>
                <View className='smallMarginLeft'>
                  <AtButton type='primary'
                            onClick={() => statusToTitle[orderDetail.status].button[1].func(orderDetail)}
                            customStyle={{
                              padding: '0 16px'
                            }} size='small'
                  >
                    {statusToTitle[orderDetail.status].button[1].title}
                  </AtButton>
                </View>
              </View>
            ) : (
              <View className='commonRowFlex normalPadding borderBottom flexCenter'
                    style={{
                      justifyContent: 'flex-end'
                    }}
              >
                <AtButton onClick={() => statusToTitle[orderDetail.status].button[0].func(orderDetail)} size='small'>{statusToTitle[orderDetail.status].button[0].title}</AtButton>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  )
}

export default OrderDetail
