import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtAvatar, AtButton, AtFloatLayout, AtInput, AtInputNumber, AtListItem, AtRadio } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import HeightView from '../../../../components/HeightView'
import { selectShopState } from '@redux/reducers/selector'
import { delayBack, navTo } from '@utils/route'
import ReadCommodity from '../../../../components/ReadCommodity'
import InputCard from '../../../../components/InputCard'
import order from '../../../mine/utils/order'
import CustomIcon from '../../../../components/CustomIcon'
import user from '../../../mine/utils/user'
import point from '../../../mine/utils/point'
import WxParse from '../../../../components/wxParse/wxParse'

interface Props {

}

export interface OrderDetail {
  shopid: number
  totalMoney: number
  freightMoney: number
  activityId: number
  scids?: string
  gnum?: number
  skuID: {
    title: string
    subtitle: string
    proCount: number
    packageid: number
    skuid: number
    price: number
    imgurl: string
    unitid: number
    marketid: number
    spikeid: number
    type: number
    isgrp: number
    skugrp: any
  }[]
}

const tabList = ['配送', '自提']

const PointOrder: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const shopState = useSelector(selectShopState)

  const [showFloat, setShowFloat] = useState<boolean>(false)
  const [currentTab, setCurrentTab] = useState<number>(0)
  const [orderDetail, setOrderDetail] = useState()
  const [remark, setRemark] = useState<string>('')

  useEffect(() => {
    const id = JSON.parse(router.params.props).id
    getGoodDetail(id)
  }, [])

  const getGoodDetail = async (id) => {
    const {data} = await point.getGoodDetail(id)
    setOrderDetail(data)
  }

  const confirmOrder = async () => {
    if (!shopState.address.id && (currentTab === 0)) {
      return Taro.showToast({
        title: '请选择收货地址',
        icon: 'none'
      })
    }
    console.log(orderDetail.id, 1, orderDetail.points, shopState.address.id, remark, currentTab, '12:00', '12:00')
    const {code} = await point.swapItem(orderDetail.id, 1, orderDetail.points, shopState.address.id, remark, currentTab, '12:00', '12:00')
    if (code === 0) {
      Taro.showToast({
        title: '兑换成功'
      })
      delayBack(2)
    }
  }

  return (
    <View>
      {orderDetail ? (
        <View>
          <TabBar title='确认兑换订单' />
          {/*选择自提*/}
          <View className='commonRowFlex' style={{
            justifyContent: 'space-around',
            backgroundColor: 'white',
            padding: '8px 0'
          }}
          >
            {tabList.map((item, index) => (
              <Text className={currentTab === index ? 'tabText mediumText' : 'mediumText'} onClick={() => setCurrentTab(index)} key={index}>{item}</Text>
            ))}
          </View>
          <HeightView />
          {/*选择地址*/}
          {currentTab === 0 ? (
            <View style={{
              backgroundColor: 'white'
            }}
            >
              {shopState.address.origin ? (
                <AtListItem
                  title={`${shopState.address.origin.value}${shopState.address.addressDetail}`}
                  note={`${shopState.address.name} ${shopState.address.phoneNum}`}
                  onClick={() => navTo('home', 'chooseAddress', {choose: true})}
                  arrow='right'
                  iconInfo={{ size: 22, color: '#C1C1C1', value: 'map-pin'}}
                />
              ) : (
                <AtListItem
                  title='请选择收货地址'
                  arrow='right'
                  onClick={() => navTo('home', 'chooseAddress', {choose: true})}
                  iconInfo={{ size: 22, color: '#C1C1C1', value: 'map-pin'}}
                />
              )}
            </View>
          ) : (
            <View style={{
              backgroundColor: 'white'
            }}
            >
              <AtListItem
                title={`${shopState.shopData.shopname} ${shopState.shopData.principalMobile}`}
                note={shopState.shopData.shopaddress}
                arrow='right'
                iconInfo={{ size: 22, color: '#C1C1C1', value: 'map-pin'}}
              />
            </View>
          )}
          <HeightView />
          <ReadCommodity imgUrl={orderDetail.goodimg} title={orderDetail.goodname} desc='' price={`${orderDetail.points}积分`} num={1} />
          <HeightView />
          <View style={{
            backgroundColor: 'white'
          }}
          >
            <AtInput name='remark' title='备注' placeholder='请输入备注' onChange={(e) => setRemark(String(e))} />
          </View>
          <View className='commonRowFlex flexCenter' style={{
            position: 'fixed',
            width: '100%',
            bottom: 0,
            justifyContent: 'space-between',
            backgroundColor: 'white',
            padding: '8px 16px'
          }}
          >
            <View>
              <Text className='mediumText'>
                合计
              </Text>
              <Text className='mediumText redText smallMarginLeft'>
                {`${orderDetail.points}积分`}
              </Text>
            </View>
              <AtButton customStyle={{
                borderRadius: '30px',
                padding: '0 32px'
              }}
                        onClick={() => confirmOrder()}
                        type='primary'
              >兑换</AtButton>
          </View>
        </View>
      ) : <View>
        <TabBar title='确认订单' />
      </View>}
    </View>
  )
}

export default PointOrder
