import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtAvatar, AtButton, AtFloatLayout, AtInput, AtInputNumber, AtListItem, AtRadio } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import HeightView from '../../../../components/HeightView'
import { selectShopState } from '@redux/reducers/selector'
import { navTo } from '@utils/route'
import ReadCommodity from '../../../../components/ReadCommodity'
import InputCard from '../../../../components/InputCard'
import order from '../../../mine/utils/order'
import CustomIcon from '../../../../components/CustomIcon'
import user from '../../../mine/utils/user'

interface Props {

}

export interface OrderDetail {
  shopid: number
  totalMoney: number
  freightMoney: number
  activityId: number
  discount?: number
  scids?: string
  gnum?: number
  gid?: string
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

const ConfirmOrder: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const shopState = useSelector(selectShopState)

  const [showFloat, setShowFloat] = useState<boolean>(false)
  const [freightPrice, setFreightPrice] = useState({freight: '', freightdesc: ''})
  const [currentTab, setCurrentTab] = useState<number>(0)
  const [discount, setDiscount] = useState<number>(0)
  const [countDown, setCountDown] = useState<number>(0.00)
  const [orderDetail, setOrderDetail] = useState<OrderDetail>()
  const [remark, setRemark] = useState<string>('')
  const [coupon, setCoupon] = useState()
  const [couponList, setCouponList] = useState([])

  useEffect(() => {
    const data = JSON.parse(router.params.props)
    setOrderDetail(data)
    setCountDown(data.discount || 0.00)
    setDiscount(data.discount || 0.00)
    getFreight(data.totalMoney)
    getOrderCoupon(data)
  }, [])

  const getOrderCoupon = async (detail) => {
    const param = [{
      shopid: shopState.shopData.shopid,
      money: detail.totalMoney,
      prolist: detail.skuID.map(item => {
        return {
          proid: item.skuid,
          promoney: item.price * item.proCount
        }
      })
    }]
    const {data} = await user.getOrderCoupon(param)
    const newList = data.map(item => {
      return {
        label: `${item.couponname} 减${item.facevalue}`,
        value: JSON.stringify(item),
        desc: `有效期至${item.outtimetr}`
      }
    })
    newList.unshift({
      label: `不使用`,
      value: null,
    })
    setCouponList(newList)
  }

  const getFreight = async (price) => {
    const {data} = await order.getFreight(shopState.shopData.shopid, price)
    setFreightPrice(data)
  }

  const chooseCoupon = (e) => {
    console.log(e)
    if (e) {
      setDiscount(JSON.parse(e).facevalue + Number(countDown))
      setCoupon(e)
    } else {
      setCoupon(null)
      setDiscount(countDown)
    }
    setShowFloat(false)
  }

  const confirmOrder = async () => {
    const data = {
      shopID: orderDetail.shopid,
      totalMoney: orderDetail.totalMoney,
      delMoney: discount,
      freightMoney: freightPrice.freight,
      couponID: coupon ? JSON.parse(coupon).couponid : 0,
      activityid: orderDetail.activityId,
      isInvoice: 0,
      remark: remark || '无'
    }

    let skuString = ''

    orderDetail.skuID.map((item, index) => {
      if (index === 0)
        skuString += `,skuID:${item.skuid}-proCount:${item.proCount}-packageid:${item.packageid}-marketid:${item.marketid}-unitid:${item.unitid}-spikeid:${item.spikeid}-type:${item.type}`
      else
        skuString += `|skuID:${item.skuid}-proCount:${item.proCount}-packageid:${item.packageid}-marketid:${item.marketid}-unitid:${item.unitid}-spikeid:${item.spikeid}-type:${item.type}`
    })

    skuString = JSON.stringify(data).replace('{', '').replace(new RegExp(/"/, 'g'), '').replace('}', '') + skuString

    if (!shopState.address.id && (currentTab === 0)) {
      return Taro.showToast({
        title: '请选择收货地址',
        icon: 'none'
      })
    }

    const res = await order.addOrder(shopState.address.id || 0, skuString, currentTab, 0, 0, 0, orderDetail.scids || '0')
    if (res.code === 0) {
      const orderRes = await order.getOrderList(1, 14, '', res.data)
      if (orderRes.code === 0)
        navTo('mine', 'orderDetail', {id: orderRes.data[0].id})
    }
  }

  const addGroupOrder = async () => {
    if (!shopState.address.id && (currentTab === 0)) {
      return Taro.showToast({
        title: '请选择收货地址',
        icon: 'none'
      })
    }
    let addRes = {data: ''}
    if (!orderDetail.gid)
      addRes = await order.addGroupOrder(orderDetail.skuID[0].skuid, orderDetail.skuID[0].skugrp.id, orderDetail.gnum)
    const {code, data} = await order.joinGroupOrder(orderDetail.skuID[0].proCount, orderDetail.skuID[0].skuid, addRes.data || orderDetail.gnum, shopState.address.id || '', currentTab, '12:00', remark, '12:00')
    if (code === 0) {
      Taro.login({
        success: (e) => {
          Taro.getUserInfo({
            withCredentials: true,
            success: async (info) => {
              console.log(info)
              console.log(e)
              const codeRes = await user.wxAuth(e.code)
              const payRes = await order.payOrder(data, codeRes.data)
              if (payRes.code === 0) {
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
                      navTo('mine', 'groupDetail', {outer: false, ugnum: addRes.data || orderDetail.gnum})
                    }, 1500)
                  },
                  nonceStr: payRes.data.nonceStr,
                  signType: payRes.data.signType,
                  paySign: payRes.data.paySign,
                  timeStamp: payRes.data.timeStamp,
                  package: payRes.data.packages
                })
              }
            }
          })
        }
      })
    }
  }

  return (
    <View>
      {orderDetail ? (
        <View>
          <TabBar title='确认订单' />
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
          {orderDetail.skuID.map((item, index) => (
            <ReadCommodity key={index} imgUrl={item.imgurl} title={item.title} desc={item.subtitle} price={String(item.price)} num={item.proCount} />
          ))}
          <View style={{
            backgroundColor: 'white'
          }}
          >
            <AtListItem title='商品金额' extraText={`¥${orderDetail.totalMoney.toFixed(2)}`} />
            <AtListItem title='优惠金额' extraText={`¥${discount}`} />
            {currentTab === 0 && (
              <AtListItem title='配送费' extraText={`¥${freightPrice.freight}`} note={freightPrice.freightdesc} />
            )}
          </View>
          <HeightView />
          <View style={{
            backgroundColor: 'white'
          }}
          >
            {orderDetail && !(orderDetail.skuID[0].isgrp || orderDetail.skuID[0].spikeid !== 0) && (
              <InputCard title='优惠券'
                         onClick={() => setShowFloat(true)}
                         rightTitle={coupon ? JSON.parse(coupon).couponname : `${couponList.length - 1 > 0 ? couponList.length - 1 : 0}张可用`}
              />
            )}
            <AtInput name='remark' title='备注' placeholder='请输入备注' onChange={(e) => setRemark(String(e))} />
            <InputCard title=''
                       link={false}
                       renderRight={() => <View>
                         <Text className='slightlySmallText'>
                           小计
                         </Text>
                         {currentTab === 0 ? (
                           <Text className='mediumText redText smallMarginLeft'>
                             {`¥${(orderDetail.totalMoney + freightPrice.freight - discount) < 0 ? 0 : (orderDetail.totalMoney + freightPrice.freight - discount).toFixed(2)}`}
                           </Text>
                         ) : (
                           <Text className='mediumText redText smallMarginLeft'>
                             {`¥${(orderDetail.totalMoney - discount) < 0 ? 0 : (orderDetail.totalMoney - discount).toFixed(2)}`}
                           </Text>
                         )}
                       </View>}
            />
          </View>
          <HeightView high='large' />
          <HeightView high='large' />
          <View className='commonRowFlex flexCenter' style={{
            position: 'fixed',
            width: '100%',
            bottom: 0,
            zIndex: 10,
            justifyContent: 'space-between',
            backgroundColor: 'white',
            padding: '8px 16px'
          }}
          >
            <View>
              <Text className='mediumText'>
                合计
              </Text>
              {currentTab === 0 ? (
                <Text className='mediumText redText smallMarginLeft'>
                  {`¥${(orderDetail.totalMoney + freightPrice.freight - discount) < 0 ? 0 : (orderDetail.totalMoney + freightPrice.freight - discount).toFixed(2)}`}
                </Text>
              ) : (
                <Text className='mediumText redText smallMarginLeft'>
                  {`¥${(orderDetail.totalMoney - discount) < 0 ? 0 : (orderDetail.totalMoney - discount).toFixed(2)}`}
                </Text>
              )}
            </View>
            {orderDetail && orderDetail.skuID[0].isgrp ? (
              <AtButton customStyle={{
                borderRadius: '30px',
                padding: '0 32px'
              }}
                        onClick={() => addGroupOrder()}
                        openType='getUserInfo'
                        type='primary'
              >{orderDetail.gnum ? '参加团购' : '去开团'}</AtButton>
            ) : (
              <AtButton customStyle={{
                borderRadius: '30px',
                padding: '0 32px'
              }}
                        onClick={() => confirmOrder()}
                        type='primary'
              >去支付</AtButton>
            )}
          </View>
        </View>
      ) : <View>
        <TabBar title='确认订单' />
      </View>}
      <AtFloatLayout isOpened={showFloat}
                     scrollY
                     onClose={() => setShowFloat(false)}
      >
        <View className='commonRowFlex flexCenter'
              style={{
                justifyContent: 'space-between'
              }}
        >
          <View  style={{
            width: '50px'
          }}
          />
          <Text className='mediumText'>优惠详情</Text>
          <View style={{
            width: '50px'
          }}
          >
            <CustomIcon name='close' size={19} color='gray' onClick={() => setShowFloat(false)} />
          </View>
        </View>
        <HeightView high='normal' />
        <AtRadio
          options={couponList}
          value={coupon}
          onClick={(e) => chooseCoupon(e)}
        />
      </AtFloatLayout>
    </View>
  )
}

export default ConfirmOrder
