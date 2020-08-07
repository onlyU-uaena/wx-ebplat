import Taro, { useState, useEffect, useDidShow, useReachBottom } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Checkbox, CheckboxGroup, Image, Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton, AtCheckbox, AtInputNumber } from 'taro-ui'
import TabBar from '../../components/TabBar'
import shopCart, { setCartBadge } from './utils/shopCart'
import { selectAuthState, selectShopState } from '@redux/reducers/selector'
import HeightView from '../../components/HeightView'
import FreshList, { FreshListInterface } from '../../components/FreshList'
import commodity from '../home/utils/commodity'
import colors from '../../common/styles/color'
import { navTo } from '@utils/route'
import { OrderDetail } from '../home/pages/confirmOrder'

interface Props {

}

const ShoppingCart: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const shopState = useSelector(selectShopState)
  const authState = useSelector(selectAuthState)
  const [cartList, setCartList] = useState({isselected: true, shops: []})
  const [width, setWidth] = useState<number>(0)
  const [freshList, setFreshList] = useState<FreshListInterface>()
  const [modifyMode, setModifyMode] = useState<boolean>(false)

  useReachBottom(() => {
    if (freshList)
      freshList.nextPage()
  })

  const getCart = async () => {
    const {data} = await shopCart.getCart(shopState.shopData.shopid)
    setCartList(data)
  }

  const changeSelect = async (id, type) => {
    const res = await shopCart.changeSelect([id], type)
    if (res) {
      getCart()
    }
  }

  const toDetail = (id: number) => {
    navTo('home', 'productDetails', {id: id})
  }

  const jumpToConfirm = () => {
    const item = cartList.shops[0]
    const data: OrderDetail = {
      shopid: item.shopid,
      totalMoney: item.totalmoney,
      freightMoney: item.freightMoney,
      activityId: item.activityid,
      scids: cartList.shops.map(item => item.spuscd.filter(filterItem => filterItem.isselected).map(shopItem => shopItem.shopcartproid)).toString(),
      skuID: item.spuscd.filter(sku => sku.isselected).map(sku => {
        return {
          title: sku.name,
          subtitle: '',
          proCount: sku.count,
          packageid: 0,
          skuid: sku.id,
          price: sku.price,
          imgurl: sku.img,
          unitid: 0,
          marketid: 0,
          spikeid: sku.spikeid,
          type: sku.protype
        }
      })
    }
    console.log(data)
    if (!data.skuID.length)
      return
    navTo('home', 'confirmOrder', data)
  }

  const deleteItem = async () => {
    const ids = cartList.shops.map(item => item.spuscd.filter(filterItem => filterItem.isselected).map(shopItem => shopItem.shopcartproid))
    Taro.showModal({
      title: '删除商品',
      content: '确认删除选中的商品?',
      success: async function (res) {
        if (res.confirm) {
          const deleteRes = await shopCart.deleteItem(ids)
          if (deleteRes) {
            getCart()
          }
        } else if (res.cancel) {
        }
      }
    })
  }

  const deleteNone = async (id) => {
    const deleteRes = await shopCart.deleteItem(id)
    if (deleteRes) {
      getCart()
    }
  }

  const selectAll = async () => {
    const ids = cartList.shops.map(item => item.spuscd.map(shopItem => {
      return shopItem.shopcartproid
    }))
    const sels = cartList.shops.map(item => item.spuscd.map(shopItem => {
      return cartList.isselected ? '0' : '1'
    }))
    const res = await shopCart.changeSelect(ids as number[], sels.toString())
    if (res) {
      getCart()
    }
  }

  const changeNum = async (id, num) => {
    const res = await shopCart.changeNum(id, num)
    if (res) {
      getCart()
    }
  }

  useDidShow(() => {
    if (authState.loginStatus) {
      getCart()
      setCartBadge(shopState.shopData.shopid)
    }
  })

  return (
    <View>
      {authState.loginStatus ? (
        <View>
          <TabBar title='购物车' homeButton={false} backButton={false} />
          <Text className='smallMargin mediumText'
                onClick={() => setModifyMode(!modifyMode)}
                style={{
                  display: 'block',
                  textAlign: 'left',
                  color: colors.themeColor
                }}
          >
            {modifyMode ? '返回' : '编辑'}
          </Text>
          {cartList.shops.length ? cartList.shops.map((item, index) => (
            <View key={index}>
              {item.spuscd.map((shopItem, shopIndex) => (
                <View key={shopIndex}
                      className='commonRowFlex flexCenter borderBottom'
                      style={{
                        backgroundColor: 'white'
                      }}
                >
                  <AtCheckbox onChange={(e) => changeSelect(shopItem.shopcartproid, e.length === 0 ? '0' : '1')}
                              options={[{
                                value: shopItem.shopcartproid,
                                label: '',
                                disabled: !shopItem.stock
                              }]}
                              selectedList={[shopItem.isselected ? shopItem.shopcartproid : '']}
                  />
                  <View className='commonRowFlex normalPadding'
                        style={{flex: 1}}
                        onClick={() => toDetail(shopItem.id)}
                  >
                    <Image src={shopItem.img}
                           className='displayImg'
                    />
                    <View className='commonColumnFlex'
                          style={{
                            justifyContent: 'space-between',
                            flex: 1
                          }}
                    >
                      <View className='commonRowFlex flexCenter' style={{
                        justifyContent: 'space-between'
                      }}
                      >
                        <Text className='slightlySmallText'>{shopItem.name}</Text>
                        {/*<Text className='slightlySmallText redText'>库存紧张</Text>*/}
                      </View>
                      <View className='commonRowFlex flexCenter' style={{
                        justifyContent: 'space-between'
                      }}
                      >
                        <View>
                          <Text className='redText slightlySmallText'>¥{shopItem.price}</Text>
                          {/*<Text className='grayText throughLineText slightlySmallText smallMarginLeft'>¥{shopItem.oldprice}</Text>*/}
                        </View>
                        <View onClick={(event => event.stopPropagation())}>
                          {shopItem.stock ? (
                            <AtInputNumber type='number' value={shopItem.count} max={shopItem.stock} min={1} onChange={(e) => changeNum(shopItem.shopcartproid, e)} />
                          ) : (
                            <View>
                              <Text className='slightlySmallText grayText'>已售罄</Text>
                              <Text onClick={() => deleteNone(shopItem.shopcartproid)} className='slightlySmallText orangeText smallMarginLeft'>删除</Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
              <HeightView />
            </View>
          )) : (
            <View className='commonRowFlex flexCenter'
                  style={{
                    justifyContent: 'center',
                    margin: '32px 0'
                  }}
            >
              <Text className='grayText slightlySmallText'>
                购物车内暂无商品～
              </Text>
            </View>
          )}
          <View className='bottomGroup commonRowFlex' style={{
            zIndex: 999
          }}
          >
            <View className='smallMarginRight smallMarginTop smallMarginBottom commonRowFlex'
                  style={{
                    justifyContent: 'space-between',
                    flex: 1
                  }}
            >
              <View className='commonRowFlex flexCenter'>
                <AtCheckbox onChange={(e) => selectAll()}  options={[{
                  value: 'all',
                  label: ''
                }]} selectedList={[cartList.isselected ? 'all' : '']}
                />
                <Text className='slightlySmallText'>全选</Text>
              </View>
              {modifyMode ? null : <View className='commonRowFlex'>
                <View className='commonColumnFlex' style={{
                  alignItems: 'flex-end',
                  justifyContent: 'space-between'
                }}
                >
                  <View>
                    <Text className='slightlySmallText'>合计</Text>
                    <Text className='smallText'>(不含运费):</Text>
                    <Text className='slightlySmallText redText'>¥{cartList.amountpayable}</Text>
                  </View>
                  <Text className='smallText grayText'>已优惠:¥{cartList.money - cartList.amountpayable}</Text>
                </View>
              </View>}
            </View>
            <View className='commonRowFlex flexCenter gradientTheme'
                  onClick={modifyMode ? () => deleteItem() : () => jumpToConfirm()}
                  style={{
                    justifyContent: 'center',
                    width: '90px'
                  }}
            >
              {modifyMode ? (
                <Text className='slightlySmallText whiteText'>删除</Text>
              ) : (
                <Text className='slightlySmallText whiteText'>去结算</Text>
              )}
            </View>
          </View>
          <HeightView high='large' />
          <HeightView />
          <Text className='normalMarginTop normalMarginBottom' style={{
            display: 'block',
            fontSize: '20px',
            textAlign: 'center'
          }}
          >
            为您推荐
          </Text>
          <View onClick={() => console.log(1)} className='normalMarginLeft normalMarginRight'>
            <FreshList onShopCart={() => getCart()} onRef={setFreshList} dispatchListFunc={async (page: number, size: number) => {
              return await commodity.getTopicSku('', Number(shopState.shopData.shopid), page, size)
            }}
            />
          </View>
          <HeightView high='large' />
          <HeightView high='large' />
        </View>
      ) : (
        <View>
          <TabBar title='购物车' homeButton={false} backButton={false} />
          <View className='commonRowFlex normalMargin flexCenter'
                style={{
                  justifyContent: 'center'
                }}
          >
            <AtButton customStyle={{padding: '0 16px'}} onClick={() => navTo('mine', 'login')} size='small' circle type='primary'>登录</AtButton>
            <Text className='slightlySmallText grayText normalMarginLeft'>登录后可获得更好的使用体验</Text>
          </View>
          <HeightView />
          <Text className='normalMarginTop normalMarginBottom' style={{
            display: 'block',
            fontSize: '20px',
            textAlign: 'center'
          }}
          >
            为您推荐
          </Text>
          <View onClick={() => console.log(1)} className='normalMarginLeft normalMarginRight'>
            <FreshList onShopCart={() => getCart()} onRef={setFreshList} dispatchListFunc={async (page: number, size: number) => {
              return await commodity.getTopicSku('', Number(shopState.shopData.shopid), page, size)
            }}
            />
          </View>
          <HeightView high='large' />
          <HeightView high='large' />
        </View>
      )}
    </View>
  )
}

export default ShoppingCart
