import Taro, { useState, useEffect, useRouter, useScope } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Image, Text, View, RichText, Button } from '@tarojs/components'
import './index.scss'
import { AtAvatar, AtButton, AtRate, AtFloatLayout, AtInputNumber, AtTag, AtCountdown } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import commodity from '../../utils/commodity'
import SwiperImg from '../../../../components/SwiperImg'
import CustomIcon from '../../../../components/CustomIcon'
import InputCard from '../../../../components/InputCard'
import { Comment } from '../../utils/interface'
import WxParse from '../../../../components/wxParse/wxParse'
import HeightView from '../../../../components/HeightView'
import colors from '../../../../common/styles/color'
import { navTo } from '@utils/route'
import order from '../../../mine/utils/order'
import shopCart from '../../../shoppingCart/utils/shopCart'
import { selectShopState } from '@redux/reducers/selector'
import LimitStr from '@utils/stringLimit'
import { getCount } from '../../utils/count'

interface Props {

}

const tabList = ['商品', '评价', '详情', '推荐']

const ProductDetails: Taro.FC<Props> = () => {
  const [safeTop, setSafeTop] = useState<number>(0)
  const [countDown, setCountDown] = useState()

  useEffect(() => {
    const { safeArea } = Taro.getSystemInfoSync()
    setSafeTop(safeArea.top)
  }, [])

  const dispatch = useDispatch()
  const shopState = useSelector(selectShopState)
  const router = useRouter()
  const scope = useScope()

  const [showFloat, setShowFloat] = useState<boolean>(false)
  const [buyGroup, setBuyGroup] = useState<boolean>(false)
  // 0 无 1秒杀 2拼团
  const [controlShow, setControlShow] = useState<number>(0)

  const judgeShow = (data) => {
    const showGroup = JSON.parse(router.params.props).showGroup
    if (showGroup) {
      setControlShow(2)
    } else if (data.isgrp && data.packings) {
      setControlShow(1)
    } else if (data.isgrp)
      setControlShow(2)
    else if (data.packings)
      setControlShow(1)
    else setControlShow(0)
  }

  useEffect(() => {
    getDetail()
  }, [])

  const [currentTab, setCurrentTab] = useState<number>(0)
  const [proDetail, setProDetail] = useState({})
  const [favorites, setFavorites] = useState<boolean>(false)
  const [buyNum, setBuyNum] = useState<number>(1)

  const addToCart = async (id: number) => {
    console.log(id)
    const res = await shopCart.addCart(shopState.shopData.shopid, id, 1, 0, 0)
    if (res.code === 0) {
      await Taro.showToast({
        title: '加入购物车成功'
      })
    }
  }

  const getDetail = async () => {
    const {data} = await commodity.getDetail(JSON.parse(router.params.props).id, JSON.parse(router.params.props).type || 0, JSON.parse(router.params.props).actid || 0)
    judgeShow(data)
    setProDetail(data)
    WxParse.wxParse('article', 'html', data.description, scope, 5)
    WxParse.wxParse('serve', 'html', data.afterservice, scope, 5)
    setFavorites(data.isfavorites)
    if (data.packings) {
      const time = getCount(data.packings.skitime, data.packings.servicetime)
      setCountDown(time)
    }
  }

  const toOrder = async (control: number, gnum?: number) => {

    // const res = await order.getFreight(proDetail.shopid, buyNum, buyNum * proDetail.price)

    const data = {
      shopid: proDetail.shopid,
      totalMoney: control === 2 ? proDetail.skugrp.gprice * buyNum : control === 1 ? proDetail.packings.skiprice * buyNum : proDetail.price * buyNum,
      freightMoney: 0,
      activityId: 0,
      gnum: gnum,
      skuID: [{
        skuid: proDetail.id,
        title: proDetail.title,
        imgurl: proDetail.imgurl,
        subtitle: proDetail.subtitle,
        proCount: buyNum,
        price: control === 2 ? proDetail.skugrp.gprice : control === 1 ? proDetail.packings.skiprice : proDetail.price,
        packageid: 0,
        unitid: 0,
        marketid: 0,
        spikeid: control === 1 ? proDetail.packings.skiid : 0,
        type: proDetail.type,
        isgrp: control === 2,
        skugrp: proDetail.skugrp,
        packings: proDetail.packings
      }]
    }

    navTo('home', 'confirmOrder', data)
  }

  const collect = async () => {
    if (!favorites) {
      const {data, code} = await commodity.collect(proDetail.id)
      if (!code) {
        setFavorites(true)
        await Taro.showToast({
          title: '收藏成功'
        })
      }
    } else {
      const {data, code} = await commodity.cancelCollect(proDetail.id)
      if (!code) {
        setFavorites(false)
        await Taro.showToast({
          title: '取消成功'
        })
      }
    }
  }

  const chooseCount = () => {
    setShowFloat(true)
    setBuyGroup(true)
  }

  const chooseTab = (index: number) => {
    setCurrentTab(index)
    Taro.pageScrollTo({
      selector: `#detail${index}`
    })
  }

  return (
    <View>
      <TabBar title='商品详情' />
      {/*锚点*/}
      <View className='gradientTheme commonRowFlex' style={{
        justifyContent: 'space-around',
        padding: '8px 32px',
        position: 'fixed',
        width: '100%',
        top: `${safeTop + 40}px`,
        zIndex: 999
      }}
      >
        {tabList.map((item, index) => (
          <Text className={currentTab === index ? 'whiteText tabText' : 'whiteText'} onClick={() => chooseTab(index)} key={index}>{item}</Text>
        ))}
        <View style={{
          position: 'absolute',
          right: '20rpx'
        }}
        >
          <Button openType='share' style={{
            backgroundColor: 'rgba(0, 0, 0, 0)',
            padding: 0,
            lineHeight: 0,
            overflow: 'inherit'
          }}
          >
            <CustomIcon name='share' size={20} color='white' />
          </Button>
        </View>
      </View>
      {proDetail.id && (
        <View id='detail0'>
          {/*轮播图*/}
          {proDetail && <SwiperImg swiperHeight='300px' list={proDetail.imgs} />}
          {/*拼团秒杀*/}
          {controlShow === 2 && (
            <View className='commonRowFlex flexCenter gradientTheme radius'
                  style={{
                    justifyContent: 'space-between',
                    padding: '8px 16px'
                  }}
            >
              <View className='commonColumnFlex'>
                <View className='commonRowFlex flexCenter'>
                  <Text className='whiteText slightlySmallText'>¥</Text>
                  <Text className='whiteText'>{proDetail.skugrp.gprice}</Text>
                  <View className='normalMarginLeft'>
                    <AtTag size='small'
                           customStyle={{
                             backgroundColor: 'rgba(0, 0, 0, 0)',
                             color: 'white'
                           }}
                    >{proDetail.skugrp.gcount}人拼</AtTag>
                  </View>
                </View>
                <Text className='smallText whiteText throughLineText'>¥{proDetail.price}</Text>
              </View>
              <Text className='mediumText whiteText'>已拼{proDetail.salescount}份</Text>
            </View>
          )}
          {controlShow === 1 && (
            <View className='commonRowFlex flexCenter gradientTheme radius'
                  style={{
                    justifyContent: 'space-between',
                    padding: '8px 16px'
                  }}
            >
              <View className='commonColumnFlex'>
                <View className='commonRowFlex flexCenter'>
                  <Text className='whiteText slightlySmallText'>¥</Text>
                  <Text className='whiteText'>{proDetail.packings.skiprice}</Text>
                </View>
                <View>
                  <Text className='smallText whiteText throughLineText'>¥{proDetail.price}</Text>
                  <Text className='slightlySmallText whiteText normalMarginLeft'>已售{proDetail.salescount}份</Text>
                </View>
              </View>
              <View className='commonColumnFlex flexCenter'>
                <Text className='whiteText slightlySmallText'>距结束仅剩</Text>
                <AtCountdown
                  isShowDay
                  format={{
                    day: '天',
                    hours: ':',
                    minutes: ':',
                    seconds: '' }}
                  day={countDown.day}
                  hours={countDown.hour}
                  minutes={countDown.min}
                  seconds={countDown.sec}
                />
              </View>
            </View>
          )}
          {/*标题*/}
          <View className='normalPadding commonColumnFlex' style={{
            backgroundColor: 'white'
          }}
          >
            <View className='commonRowFlex flexCenter' style={{
              justifyContent: 'space-between'
            }}
            >
              <Text className='mediumText'>{proDetail.title}</Text>
              <CustomIcon name='collect' onClick={() => collect()} color={favorites ? colors.themeRed : colors.lightGray} size={20} />
            </View>
            <Text className='slightlySmallText grayText'>{proDetail.subtitle}</Text>
            {!proDetail.isgrp && (
              <View className='commonRowFlex normalMarginTop'
                    style={{
                      justifyContent: 'space-between'
                    }}
              >
                <View className='commonRowFlex' style={{
                  alignItems: 'flex-end'
                }}
                >
                  <Text className='mediumText redText'>¥{proDetail.price}</Text>
                  {/*<Text className='slightlySmallText grayText smallMarginLeft'>¥ {}</Text>*/}
                </View>
                <Text className='slightlySmallText grayText'>{`已售${proDetail.salescount}份`}</Text>
              </View>
            )}
          </View>
          <HeightView />
          {controlShow === 2 && (proDetail.grpusers.length) && (
            <View className='normalPaddingTop normalPaddingBottom'
                  style={{
                    backgroundColor: 'white'
                  }}
            >
              <View className='normalMarginRight normalMarginLeft borderBottom'>
                <Text className='mediumText'><Text className='mediumText redText'>{proDetail.grpusers.length}</Text>人在拼单,可直接参与</Text>
                <HeightView />
              </View>
              {proDetail.grpusers.map(item => (
                <View className='commonRowFlex flexCenter normalPadding borderBottom'
                      key={item.gid}
                      style={{
                        justifyContent: 'space-between'
                      }}
                >
                  <View className='commonRowFlex flexCenter'>
                    <AtAvatar circle size='normal' image={item.userimg} />
                    <Text className='mediumText normalMarginLeft'>{LimitStr(item.username, 6)}</Text>
                  </View>
                  <View className='commonRowFlex flexCenter'>
                    <Text className='mediumText normalMarginLeft smallMarginRight'>还差<Text className='mediumText redText'>{item.count}人</Text>拼成</Text>
                    <AtButton size='small'
                              onClick={() => toOrder(2, item.gnum)}
                    >去参团</AtButton>
                  </View>
                </View>
              ))}
            </View>
          )}
          <View id='detail1' className='smallMarginTop'>
            <InputCard title='选择包装' onClick={() => Taro.showToast({title: '暂无包装', icon: 'none'})} link />
            <InputCard title={`商品评价(${proDetail.cmtcount})`} renderRight={() => <Text className='redText slightlySmallText'>{`好评率：${proDetail.cmtgood}`}</Text>} link={false} />
          </View>
          {/*评论*/}
          <View style={{
            backgroundColor: 'white'
          }}
          >
            {proDetail.cmts.map((item: Comment, index) => (
              <View key={index} className='normalPadding'>
                <View className='commonRowFlex flexCenter' style={{
                  justifyContent: 'space-between'
                }}
                >
                  <View className='commonRowFlex flexCenter'>
                    <AtAvatar circle />
                    <View className='normalMarginLeft commonColumnFlex'>
                      <Text>{item.username}</Text>
                      <Text className='slightlySmallText grayText'>{item.createtime}</Text>
                    </View>
                  </View>
                  <AtRate value={item.star} />
                </View>
                <View style={{
                  marginLeft: '120rpx'
                }}
                >
                  <Text className='mediumText grayText'>
                    {item.content}
                  </Text>
                  {item.showImgList.length && <View className='commonRowFlex normalMarginTop' style={{
                    justifyContent: 'space-between'
                  }}
                  >
                    <Image src={item.showImgList[0].imgurl || ''} style={{width: '170rpx', height: '170rpx'}} />
                    <Image src={item.showImgList[1].imgurl || ''} style={{width: '170rpx', height: '170rpx'}} />
                    <Image src={item.showImgList[2].imgurl || ''} style={{width: '170rpx', height: '170rpx'}} />
                  </View>}
                </View>
              </View>
            ))}
          </View>
          {/*商品图*/}
          <Text id='detail2' className='mediumText normalPadding borderBottom' style={{
            backgroundColor: 'white',
            display: 'block'
          }}
          >商品详情</Text>
          {/*售后*/}
          <View className='commonColumnFlex flexCenter normalMarginTop normalMarginBottom normalPadding' style={{
            justifyContent: 'center',
            backgroundColor: 'white'
          }}
          >
            <import src='../../../../components/wxParse/wxParse.wxml' />
            <template is='wxParse' data='{{wxParseData:article.nodes}}' />
            <template is='wxParse' data='{{wxParseData:serve.nodes}}' />
          </View>
          <HeightView high='large' />
          <HeightView high='large' />
          {/*底部按钮*/}
          <View className='bottomGroup commonRowFlex'>
            <Button plain
                    className='commonColumnFlex smallMarginTop smallMarginBottom normalMarginLeft normalMarginRight'
                    openType='contact'
                    style={{
                      paddingLeft: 0,
                      paddingRight: 0,
                      lineHeight: 'initial',
                      border: 'none',
                      fontSize: 'inherit'
                    }}
            >
              <CustomIcon name='customerService' size={20} color='gray' />
              <Text className='slightlySmallText grayText'>客服</Text>
            </Button>
            <View onClick={() => Taro.switchTab({url: '/pages/shoppingCart/index'})} className='commonColumnFlex smallMarginTop smallMarginBottom normalMarginRight'>
              <CustomIcon onClick={() => Taro.switchTab({url: '/pages/shoppingCart/index'})} name='shop' size={20} color='gray' />
              <Text className='slightlySmallText grayText'>购物车</Text>
            </View>
            <View className='commonRowFlex' style={{
              flex: 1
            }}
            >
              {controlShow === 0 && (<View onClick={() => addToCart(proDetail.id)} className='gradientYellow commonRowFlex flexCenter' style={{
                flex: 1,
                justifyContent: 'center'
              }}
              >
                <Text className='whiteText slightlySmallText'>加入购物车</Text>
              </View>
              )}
              {controlShow === 2 && (
                <View onClick={() => chooseCount()} className='gradientYellow commonRowFlex flexCenter' style={{
                flex: 1,
                justifyContent: 'center'
              }}
                >
                <Text className='whiteText slightlySmallText'>我要开团</Text>
                </View>
              )}
              {controlShow === 0 && (
                <View onClick={() => setShowFloat(true)} className='gradientTheme commonRowFlex flexCenter' style={{
                  flex: 1,
                  justifyContent: 'center'
                }}
                >
                  <Text className='whiteText slightlySmallText'>立即购买</Text>
                </View>
              )}
              {controlShow === 1 && (
                <View onClick={() => setShowFloat(true)} className='gradientTheme commonRowFlex flexCenter' style={{
                  flex: 1,
                  justifyContent: 'center'
                }}
                >
                  <Text className='whiteText slightlySmallText'>立即购买</Text>
                </View>
              )}
              {controlShow === 2 && (
                <View onClick={() => {
                  setShowFloat(true)
                  setBuyGroup(false)
                }} className='gradientTheme commonRowFlex flexCenter' style={{
                  flex: 1,
                  justifyContent: 'center'
                }}
                >
                  <Text className='whiteText slightlySmallText'>直接购买</Text>
                </View>
              )}
            </View>
          </View>
          <AtFloatLayout isOpened={showFloat}
                         onClose={() => setShowFloat(false)}
          >
            <View className='commonRowFlex normalMargin' style={{
              justifyContent: 'space-between'
            }}
            >
              <View className='commonRowFlex'>
                <AtAvatar size='large' image={proDetail.imgurl} />
                <View className='commonColumnFlex normalMarginLeft' style={{
                  justifyContent: 'flex-end'
                }}
                >
                  <Text className='redText mediumText'>¥{controlShow === 1 ? proDetail.packings.skiprice : buyGroup ? proDetail.skugrp.gprice : proDetail.price}</Text>
                  <HeightView />
                  <Text className='slightlySmallText grayText'>库存{proDetail.stock}件</Text>
                </View>
              </View>
              <CustomIcon name='close' size={15} color='gray' onClick={() => setShowFloat(false)} />
            </View>
            <View className='commonRowFlex normalMargin flexCenter' style={{
              justifyContent: 'space-between'
            }}
            >
              <Text>数量</Text>
              <AtInputNumber type='number' min={1} max={proDetail.stock} value={buyNum} onChange={setBuyNum} />
            </View>
            <View className='commonRowFlex gradientTheme flexCenter normalPadding'
                  onClick={() => toOrder(controlShow === 1 ? 1 : buyGroup ? 2 : 0)}
                  style={{
                    justifyContent: 'center',
                    position: 'fixed',
                    width: '100%',
                    bottom: 0
                  }}
            >
              <Text className='whiteText mediumText'>确认</Text>
            </View>
          </AtFloatLayout>
        </View>
      )}
    </View>
  )
}

export default ProductDetails
