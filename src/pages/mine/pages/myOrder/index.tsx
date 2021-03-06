import Taro, { useState, useEffect, useRouter, useReachBottom, usePullDownRefresh, useDidShow } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { ScrollView, Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton, AtTabs, AtTabsPane } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import ReadCommodity from '../../../../components/ReadCommodity'
import HeightView from '../../../../components/HeightView'
import { delayBack, navTo } from '@utils/route'
import order from '../../utils/order'
import { toCancelOrder, toConfirmOrder, toDeleteOrder } from '../../utils/modalOrder'

interface Props {

}

const tabs = [
  { title: '全部' },
  { title: '待付款' },
  { title: '待收货' },
  { title: '待评价' },
  { title: '售后/退款' }
]

let page = 1
let waitReset = false


const MyOrder: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [safeTop, setSafeTop] = useState<number>(0)
  const [safeHeight, setSafeHeight] = useState<number>(0)

  useEffect(() => {
    const { safeArea, screenHeight } = Taro.getSystemInfoSync()
    setSafeTop(safeArea.top)
    setSafeHeight(screenHeight)
  }, [])

  const statusToTitle = {
    0: {name: '待付款', button: [
        {
          title: '取消订单',
          func: async (item) => {
            await toCancelOrder(item.id, item.status)
            refreshList()
          }
        },
        {
          title: '去支付',
          func: (item) => {
            navTo('mine', 'orderDetail', {id: item.id})
          }
        }
      ]},
    6: {name: '已取消', button: [
        {
          title: '删除订单',
          func: async (item) => {
            await toDeleteOrder(item.id)
            refreshList()
          }
        }
      ]},
    20: {name: '拼团中', button: [
        {
          title: '删除订单',
          func: async (item) => {
            await toDeleteOrder(item.id)
            refreshList()
          }
        }
      ]},
    29: {name: '拼团失败', button: [
        {
          title: '删除订单',
          func: async (item) => {
            await toDeleteOrder(item.id)
            refreshList()
          }
        }
      ]},
    5: {name: '取消申请中', button: [
        {
          title: '删除订单',
          func: async (item) => {
            await toDeleteOrder(item.id)
            refreshList()
          }
        }
      ]},
    3: {name: '待配送', button: [
        {
          title: '去退款',
          func: async (item) => {
            navTo('mine','refund', {item})
          }
        },
      ]},
    1: {name: '已付款', button: [
        {
          title: '去退款',
          func: async (item) => {
            navTo('mine','refund', {item})
          }
        },
        {
          title: '删除订单',
          func: async (item) => {
            await toDeleteOrder(item.id)
            refreshList()
          }
        }
        // ,{
        //   title: '确认收货',
        //   func: async (item) => {
        //     if (item.deliverymode !== 1) {
        //       await toConfirmOrder(item.id)
        //       refreshList()
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
            navTo('mine','refund', {item})
          }
        },{
          title: '确认收货',
          func: async (item) => {
            if (item.deliverymode !== 1) {
              await toConfirmOrder(item.id)
              refreshList()
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
            navTo('mine','refund', {item})
          }
        },{
          title: '再来一单',
          func: async (item) => {
            const {code} = await order.buyAgain(item.id)
            if (code === 0)
              Taro.showToast({
                title: '已将商品添加到购物车',
                icon: 'none'
              })
          }
        }
      ]},
    9: {name: '待评价', button: [
        {
          title: '去退款',
          func: async (item) => {
            navTo('mine','refund', {item})
          }
        },{
          title: '评价订单',
          func: async (item) => {
            navTo('mine','evaluationOrder', {item})
            refreshList()
          }
        }
      ]},
    2: {name: '待发货', button: [
        {
          title: '去退款',
          func: async (item) => {
            navTo('mine','refund', {item})
          }
        },
        {
          title: '删除订单',
          func: async (item) => {
            await toDeleteOrder(item.id)
            refreshList()
          }
        }
        // ,{
        //   title: '确认收货',
        //   func: async (item) => {
        //     if (item.deliverymode !== 1) {
        //       await toConfirmOrder(item.id)
        //       refreshList()
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
            refreshList()
          }
        }
      ]},
    12: {name: '已退款', button: [
        {
          title: '删除订单',
          func: async (item) => {
            await toDeleteOrder(item.id)
            refreshList()
          }
        }
      ]},
    13: {name: '退款不通过', button: [
        {
          title: '删除订单',
          func: async (item) => {
            await toDeleteOrder(item.id)
            refreshList()
          }
        }
      ]}
  }

  const [currentTabs, setCurrentTabs] = useState<number>(0)
  const [onRefresh, setOnRefresh] = useState<boolean>(false)
  const [size, setSize] = useState<number>(3)
  const [firstInto, setFirstInto] = useState<boolean>(true)
  const [orderList, setOrderList] = useState([])

  useEffect(() => {
    const tab = JSON.parse(router.params.props).tab + 1
    changeTab(tab)
  }, [])

  useDidShow(() => {
    if (firstInto) {
      setFirstInto(false)
    } else {
      refreshList()
    }
  })

  const getOrderList = async (status?: string | number) => {
    const {data} = await order.getOrderList(page, size, status)
    if (data.length && !waitReset) {
      setOrderList(orderList.concat(data))
      page = page + 1
    } else if (waitReset) {
      setOrderList([].concat(data))
      waitReset = false
      page = page + 1
    }
  }

  const changeTab = (e) => {
    resetPage()
    setCurrentTabs(e)
    if (e === 0) {
      getOrderList()
    } else {
      getOrderList(e - 1)
    }
  }

  const resetPage = () => {
    page = 1
    waitReset = true
  }

  const refreshList = async () => {
    resetPage()
    if (currentTabs === 0) {
      await getOrderList()
    } else {
      await getOrderList(currentTabs - 1)
    }
  }

  const pullDownRefresh = async () => {
    resetPage()
    setOnRefresh(true)
    if (currentTabs === 0) {
      await getOrderList()
    } else {
      await getOrderList(currentTabs - 1)
    }
    setOnRefresh(false)
  }

  return (
    <View>
      <TabBar title='我的订单' />
      <ScrollView refresherTriggered={onRefresh}
                  onRefresherRefresh={() => pullDownRefresh()}
                  refresherEnabled
                  onScrollToLower={() => getOrderList(currentTabs - 1)}
                  scrollY
                  style={{
                    height: `${safeHeight - safeTop - 40}px`
                  }}
      >
        <View>
          <AtTabs tabList={tabs}
                  scroll
                  onClick={(e) => changeTab(e)}
                  current={currentTabs}
          >
            {tabs.map((tabItem, tabIndex) => (
              <AtTabsPane key={tabIndex} current={currentTabs} index={tabIndex}>
                {orderList.length ? (
                  orderList.map((item, index) => (
                    <View key={index}>
                      <View style={{
                        backgroundColor: 'white'
                      }}
                      >
                        <View className='commonRowFlex normalPadding borderBottom flexCenter'
                              style={{
                                justifyContent: 'space-between'
                              }}
                        >
                          <Text className='slightlySmallText grayText'>{item.addorderdate}</Text>
                          <Text className='mediumText orangeText'>{statusToTitle[item.status].name}</Text>
                        </View>
                        {item.lsitdetais.map((shopItem, shopIndex) => (
                          <ReadCommodity key={shopIndex} onClick={() => navTo('mine', 'orderDetail', {id: item.id})} imgUrl={shopItem.productimg} title={shopItem.productname} price={shopItem.proprice} num={shopItem.productcount} />
                        ))}
                        <View className='commonRowFlex normalPadding borderBottom borderTop flexCenter'
                              style={{
                                justifyContent: 'flex-end'
                              }}
                        >
                          <Text className='mediumText'>共</Text>
                          <Text className='mediumText redText'>{item.lsitdetais.length}</Text>
                          <Text className='mediumText'>件</Text>
                          <Text className='smallMarginLeft mediumText'>付款</Text>
                          <Text className='mediumText redText smallMarginLeft'>¥{item.actualpay.toFixed(2)}</Text>
                        </View>
                        {statusToTitle[item.status].button.length === 2 ? (
                          <View className='commonRowFlex normalPadding borderBottom flexCenter'
                                style={{
                                  justifyContent: 'flex-end'
                                }}
                          >
                            <AtButton onClick={() => statusToTitle[item.status].button[0].func(item)} size='small'>{statusToTitle[item.status].button[0].title}</AtButton>
                            {(!item.iscomment || item.status === 10) && (
                              <View className='smallMarginLeft'>
                                <AtButton type='primary'
                                          onClick={() => statusToTitle[item.status].button[1].func(item)}
                                          customStyle={{
                                            padding: '0 16px'
                                          }} size='small'
                                >
                                  {statusToTitle[item.status].button[1].title}
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
                            <AtButton onClick={() => statusToTitle[item.status].button[0].func(item)} size='small'>{statusToTitle[item.status].button[0].title}</AtButton>
                            {item.status === 13 && (
                              <AtButton openType='contact' type='primary' customStyle={{marginLeft: '8px'}} size='small'>联系客服</AtButton>
                            )}
                          </View>
                        )}
                      </View>
                      <HeightView />
                    </View>
                  ))
                ) : (
                  <View className='commonRowFlex flexCenter'
                        style={{
                          justifyContent: 'center',
                          margin: '32px 0'
                        }}
                  >
                    <Text className='grayText slightlySmallText'>
                      没有订单哦～
                    </Text>
                  </View>)}
              </AtTabsPane>
            ))}
          </AtTabs>
        </View>
      </ScrollView>
    </View>
  )
}

MyOrder.config = {
  enablePullDownRefresh: false
}

export default MyOrder
