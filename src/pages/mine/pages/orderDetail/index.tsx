import Taro, { useState, useEffect, useRouter, useDidShow } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Image, Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton, AtListItem } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import HeightView from '../../../../components/HeightView'
import ReadCommodity from '../../../../components/ReadCommodity'
import CustomIcon from '../../../../components/CustomIcon'
import order from '../../utils/order'
import { delayBack, navTo } from '@utils/route'
import { toCancelOrder, toConfirmOrder, toDeleteOrder } from '../../utils/modalOrder'
import user from '../../utils/user'
import account from '../../utils/login'
import { loginIn } from '@redux/actions'

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
            Taro.login({
              success: (e) => {
                Taro.getUserInfo({
                  withCredentials: true,
                  success: async (info) => {
                    console.log(info)
                    console.log(e)
                    const codeRes = await user.wxAuth(e.code)
                    const {code, data} = await order.payOrder(item.groupcode, codeRes.data)
                    if (code === 0) {
                      Taro.requestPayment({
                        fail: () => {
                          Taro.showToast({
                            title: '支付取消',
                            icon: 'none'
                          })
                        },
                        success: () => {
                          Taro.showToast({
                            title: '支付成功',
                            icon: 'none',
                            mask: true
                          })
                          setTimeout(() => {
                            navTo('home', 'paySuccess', {detail: orderDetail})
                          }, 1500)
                        },
                        nonceStr: data.nonceStr,
                        signType: data.signType,
                        paySign: data.paySign,
                        timeStamp: data.timeStamp,
                        package: data.packages
                      })
                    }                  }
                })
              }
            })
          }
        }
      ]},
    20: {name: '拼团中', button: [
        {
          title: '删除订单',
          func: async (item) => {
            await toDeleteOrder(item.id)
            delayBack()
          }
        }
      ]},
    29: {name: '拼团失败', button: [
        {
          title: '删除订单',
          func: async (item) => {
            await toDeleteOrder(item.id)
            delayBack()
          }
        }
      ]},
    6: {name: '已取消', button: [
        {
          title: '删除订单',
          func: async (item) => {
            await toDeleteOrder(item.id)
            delayBack()
          }
        }
      ]},
    5: {name: '取消申请中', button: [
        {
          title: '删除订单',
          func: async (item) => {
            await toDeleteOrder(item.id)
            delayBack()
          }
        }
      ]},
    3: {name: '待配送', button: [
        {
          title: '去退款',
          func: async (item) => {
            navTo('mine','refund', {item: {
                lsitdetais: item.children.map(shopItem => {
                  return {
                    proprice: shopItem.productprice,
                    ...shopItem
                  }
                }),
                actualpay: item.actualPay,
                ...item
              }})
          }
        },
      ]},
    1: {name: '已付款', button: [
        {
          title: '去退款',
          func: async (item) => {
            navTo('mine','refund', {item: {
                lsitdetais: item.children.map(shopItem => {
                  return {
                    proprice: shopItem.productprice,
                    ...shopItem
                  }
                }),
                actualpay: item.actualPay,
                ...item
              }})
          }
        },
        {
          title: '删除订单',
          func: async (item) => {
            await toDeleteOrder(item.id)
            delayBack()
          }
        }
        // ,{
        //   title: '确认收货',
        //   func: async (item) => {
        //     if (item.deliveryMode !== 1) {
        //       await toConfirmOrder(item.id)
        //       delayBack()
        //     } else {
        //       Taro.showToast({
        //         title: '自提订单需线下收货',
        //         icon: 'none'
        //       })
        //     }
        //   }
        // }
      ]},
    8: {name: '已发货', button: [
        {
          title: '去退款',
          func: async (item) => {
            navTo('mine','refund', {item: {
                lsitdetais: item.children.map(shopItem => {
                  return {
                    proprice: shopItem.productprice,
                    ...shopItem
                  }
                }),
                actualpay: item.actualPay,
                ...item
              }})
          }
        },{
          title: '确认收货',
          func: async (item) => {
            if (item.deliveryMode !== 1) {
              await toConfirmOrder(item.id)
              delayBack()
            } else {
              Taro.showToast({
                title: '自提订单需线下收货',
                icon: 'none'
              })
            }
          }
        }
      ]},
    10: {name: '已完成', button: [
        {
          title: '去退款',
          func: async (item) => {
            navTo('mine','refund', {item: {
                lsitdetais: item.children.map(shopItem => {
                  return {
                    proprice: shopItem.productprice,
                    ...shopItem
                  }
                }),
                actualpay: item.actualPay,
                ...item
              }})
          }
        }
      ]},
    9: {name: '待评价', button: [
        {
          title: '去退款',
          func: async (item) => {
            navTo('mine','refund', {item: {
                lsitdetais: item.children.map(shopItem => {
                  return {
                    proprice: shopItem.productprice,
                    ...shopItem
                  }
                }),
                actualpay: item.actualPay,
                ...item
              }})
          }
        },{
          title: '评价订单',
          func: async (item) => {
            navTo('mine','evaluationOrder', {item: {
                lsitdetais: item.children.map(shopItem => {
                  return {
                    proprice: shopItem.productprice,
                    ...shopItem
                  }
                }),
                actualpay: item.actualPay,
                ...item
              }})
          }
        }
      ]},
    2: {name: '待发货', button: [
        {
          title: '去退款',
          func: async (item) => {
            navTo('mine','refund', {item: {
                lsitdetais: item.children.map(shopItem => {
                  return {
                    proprice: shopItem.productprice,
                    ...shopItem
                  }
                }),
                actualpay: item.actualPay,
                ...item
              }})
          }
        },
        {
          title: '删除订单',
          func: async (item) => {
            await toDeleteOrder(item.id)
            delayBack()
          }
        }
        // ,{
        //   title: '确认收货',
        //   func: async (item) => {
        //     if (item.deliveryMode !== 1) {
        //       await toConfirmOrder(item.id)
        //       delayBack()
        //     } else {
        //       Taro.showToast({
        //         title: '自提订单需线下收货',
        //         icon: 'none'
        //       })
        //     }
        //   }
        // }
      ]},
    11: {name: '退货中', button: [
        {
          title: '删除订单',
          func: async (item) => {
            await toDeleteOrder(item.id)
            delayBack()
          }
        }
      ]},
    12: {name: '已退款', button: [
        {
          title: '删除订单',
          func: async (item) => {
            await toDeleteOrder(item.id)
            delayBack()
          }
        }
      ]},
    13: {name: '退款不通过', button: [
        {
          title: '删除订单',
          func: async (item) => {
            await toDeleteOrder(item.id)
            delayBack()
          }
        }
      ]}
  }

  const getDetail = async (id) => {
    const {data} = await order.getOrderDetail(id)
    setOrderDetail(data)
  }

  useDidShow(() => {
    const props = JSON.parse(router.params.props)
    console.log(props)
    getDetail(props.id)
  })

  return (
    <View>
      <TabBar title='订单详情' />
      {orderDetail && (
        <View>
          <View style={{
            backgroundColor: 'white'
          }}
          >
            {orderDetail && orderDetail.transportMode === 0 && (
              <View>
                <View className='commonRowFlex normalPadding borderBottom flexCenter'
                      style={{
                        justifyContent: 'space-between'
                      }}
                >
                  <Text className='mediumText'>配送地址</Text>
                  <Text className='mediumText'>{orderDetail.address || '暂无'}</Text>
                </View>
                <View className='commonRowFlex normalPadding borderBottom flexCenter'
                      style={{
                        justifyContent: 'space-between'
                      }}
                >
                  <Text className='mediumText'>收货人 {orderDetail.telPhone}</Text>
                  <Text className='mediumText'>{orderDetail.consignee || '暂无'}</Text>
                </View>
              </View>
            )}
            {orderDetail && orderDetail.transportMode !== 0 && (
              <View className='commonRowFlex normalPadding borderBottom flexCenter'
                    style={{
                      justifyContent: 'space-between'
                    }}
              >
                <Text className='mediumText'>店铺地址</Text>
                <Text className='mediumText'>{orderDetail.shopname || '暂无'}</Text>
              </View>
            )}
            {(orderDetail && orderDetail.qrcodenumber && orderDetail.transportMode !== 0) ? (
              <View className='commonRowFlex normalPadding borderBottom flexCenter'
                    onClick={() => navTo('mine', 'qrCode', orderDetail)}
                    style={{
                      justifyContent: 'space-between'
                    }}
              >
                <Text className='mediumText'>自提码 {orderDetail.qrcodenumber}</Text>
                <Image style={{
                  width: '30px',
                  height: '30px'
                }} src={orderDetail.qrcode}
                />
              </View>
            ) : null}
            <View className='commonRowFlex normalPadding borderBottom flexCenter'
                  style={{
                    justifyContent: 'space-between'
                  }}
            >
              <Text className='mediumText'>配送方式</Text>
              <View onClick={() => {
                if (orderDetail.transportMode === 0)
                  navTo('mine' , 'queryTrack', {orderId: orderDetail.id})
              }}
              >
                <Text className='mediumText'>{orderDetail.transportMode === 0 ? '物流配送' : '自提'}</Text>
                <Text className='mediumText grayText'>{orderDetail.transportMode === 0 ? ' >' : ''}</Text>
              </View>
            </View>
          </View>
          <HeightView />
          <View className='borderBottom'>
            {orderDetail.children.map((item, index) => (
              <ReadCommodity key={index} imgUrl={item.productimg} title={item.productname} price={item.productprice} num={item.productcount}  />
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
              <Text className='slightlySmallText'>¥{orderDetail.freight}</Text>
            </View>
            <View className='commonRowFlex flexCenter'
                  style={{
                    justifyContent: 'space-between'
                  }}
            >
              <Text className='mediumText'>优惠券</Text>
              <Text className='slightlySmallText'>¥{(orderDetail.price + orderDetail.freight - orderDetail.actualPay).toFixed(2)}</Text>
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
              <Text className='redText normalMarginLeft'>¥{orderDetail.actualPay}</Text>
            </View>
            {/*<AtButton customStyle={{width: '100%'}} size='small' type='primary' openType='contact'>*/}
            {/*  联系客服*/}
            {/*</AtButton>*/}
          </View>
          <HeightView />
          <View style={{
            backgroundColor: 'white'
          }}
          >
            <View className='commonRowFlex normalPadding borderBottom flexCenter'
                  onClick={() => {
                    Taro.setClipboardData({
                      data: orderDetail.code,
                    })
                  }}
                  style={{
                    justifyContent: 'space-between'
                  }}
            >
              <Text className='mediumText'>订单号 {orderDetail.code}</Text>
              <Text className='mediumText orangeText'>{statusToTitle[orderDetail.status].name}</Text>
            </View>
            <HeightView />
            {(orderDetail && orderDetail.status === 0) && (
              <Text className='slightlySmallText grayText normalMarginLeft'>订单超过24小时未支付将失效</Text>
            )}
            <HeightView />
            {(orderDetail && orderDetail.status === 13) && (
              <View className='commonRowFlex normalPadding borderBottom flexCenter'
                    style={{
                      justifyContent: 'space-between'
                    }}
              >
                <Text className='mediumText'>拒绝原因</Text>
                <Text className='slightlySmallText grayText'>{orderDetail.returnreason}</Text>
              </View>
            )}
            <HeightView />
            <View className='commonRowFlex normalPadding borderBottom flexCenter'
                  style={{
                    justifyContent: 'space-between'
                  }}
            >
              <Text className='mediumText'>下单时间</Text>
              <Text className='slightlySmallText grayText'>{orderDetail.orderDate}</Text>
            </View>
            <HeightView />
            <View className='commonRowFlex normalPadding borderBottom flexCenter'
                  style={{
                    justifyContent: 'space-between'
                  }}
            >
              <Text className='mediumText'>支付方式</Text>
              <Text className='slightlySmallText grayText'>微信支付</Text>
            </View>
            <View className='commonRowFlex normalPadding borderBottom flexCenter'
                  style={{
                    justifyContent: 'space-between'
                  }}
            >
              <Text className='mediumText'>支付时间</Text>
              <Text className='slightlySmallText grayText'>{orderDetail.paydatetr}</Text>
            </View>
            {statusToTitle[orderDetail.status].button.length === 2 ? (
              <View className='commonRowFlex normalPadding borderBottom flexCenter'
                    style={{
                      justifyContent: 'flex-end'
                    }}
              >
                <AtButton onClick={() => statusToTitle[orderDetail.status].button[0].func(orderDetail)} size='small'>{statusToTitle[orderDetail.status].button[0].title}</AtButton>
                {orderDetail && !orderDetail.iscomment && (
                  <View className='smallMarginLeft'>
                    <AtButton type='primary'
                              openType='getUserInfo'
                              onClick={() => statusToTitle[orderDetail.status].button[1].func(orderDetail)}
                              customStyle={{
                                padding: '0 16px'
                              }} size='small'
                    >
                      {statusToTitle[orderDetail.status].button[1].title}
                    </AtButton>
                  </View>
                )}
              </View>
            ) : (
              <View className='commonRowFlex normalPadding borderBottom flexCenter'
                    style={{
                      justifyContent: 'flex-end'
                    }}
              >
                <AtButton onClick={() => statusToTitle[orderDetail.status].button[0].func(orderDetail)} size='small'>{statusToTitle[orderDetail.status].button[0].title}</AtButton>
                {orderDetail && orderDetail.status === 13 && (
                  <AtButton openType='contact' type='primary' customStyle={{marginLeft: '8px'}} size='small'>联系客服</AtButton>
                )}
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  )
}

export default OrderDetail
