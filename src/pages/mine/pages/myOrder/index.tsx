import Taro, { useState, useEffect, useRouter, useReachBottom, usePullDownRefresh, useDidShow } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { ScrollView, Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton, AtTabs } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import ReadCommodity from '../../../../components/ReadCommodity'
import HeightView from '../../../../components/HeightView'
import { delayBack, navTo } from '@utils/route'
import order from '../../utils/order'
import { toCancelOrder, toDeleteOrder } from '../../utils/modalOrder'

interface Props {

}

const tabs = [
  { title: '全部' },
  { title: '待付款' },
  { title: '待收货' },
  { title: '已完成' },
  { title: '售后/退款' }
]

let page = 1
let waitReset = false


const MyOrder: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  usePullDownRefresh(() => {
    console.log(1)
  })

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
            navTo('mine', 'orderDetail', {id: item.code})
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
    5: {name: '取消申请中', button: [
        {
          title: '删除订单',
          func: async (item) => {
            await toDeleteOrder(item.id)
            refreshList()
          }
        }
      ]},
    8: '待收货',
    10: '待评论',
    1: '待受理',
    2: '已受理',
    11: '退货中',
    12: '已退款',
    13: '退款不通过',
  }

  const [currentTabs, setCurrentTabs] = useState<number>(0)
  const [onRefresh, setOnRefresh] = useState<boolean>(false)
  const [size, setSize] = useState<number>(10)
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
      console.log(1)
      refreshList()
    }
  })

  useReachBottom( async () => {
    getOrderList()
  })

  const getOrderList = async (status?: string | number) => {
    const {data} = await order.getOrderList(page, size, status)
    if (data.length && !waitReset) {
      setOrderList(orderList.concat(data))
    } else if (waitReset) {
      setOrderList(data)
      waitReset = false
      page = page + 1
    }
    return data
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
      <AtTabs tabList={tabs}
              scroll
              onClick={(e) => changeTab(e)}
              current={currentTabs}
      />
      <ScrollView refresherTriggered={onRefresh}
                  onRefresherRefresh={() => refreshList()}
                  refresherEnabled
      >
        {orderList ? (
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
                  <ReadCommodity key={index} onClick={() => navTo('mine', 'orderDetail', {id: item.code})} imgUrl={shopItem.productimg} title={shopItem.productname} price={shopItem.proprice} num={shopItem.productcount} />
                ))}
                <View className='commonRowFlex normalPadding borderBottom borderTop flexCenter'
                      style={{
                        justifyContent: 'flex-end'
                      }}
                >
                  <Text className='mediumText'>共</Text>
                  <Text className='mediumText redText'>{item.lsitdetais.length}</Text>
                  <Text className='mediumText'>件</Text>
                  <Text className='smallMarginLeft mediumText'>需付款</Text>
                  <Text className='mediumText redText smallMarginLeft'>¥{item.actualpay}</Text>
                </View>
                  {statusToTitle[item.status].button.length === 2 ? (
                    <View className='commonRowFlex normalPadding borderBottom flexCenter'
                          style={{
                            justifyContent: 'flex-end'
                          }}
                    >
                      <AtButton onClick={() => statusToTitle[item.status].button[0].func(item)} size='small'>{statusToTitle[item.status].button[0].title}</AtButton>
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
                    </View>
                  ) : (
                    <View className='commonRowFlex normalPadding borderBottom flexCenter'
                          style={{
                            justifyContent: 'flex-end'
                          }}
                    >
                      <AtButton onClick={() => statusToTitle[item.status].button[0].func(item)} size='small'>{statusToTitle[item.status].button[0].title}</AtButton>
                    </View>
                  )}
              </View>
              <HeightView />
            </View>
          ))
        ) : null}
      </ScrollView>
    </View>
  )
}

MyOrder.config = {
  enablePullDownRefresh: false
}

export default MyOrder
