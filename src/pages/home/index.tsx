import Taro, { useState, useEffect, useReachBottom } from "@tarojs/taro"
import { View, Text, Swiper, SwiperItem, Image, ScrollView } from '@tarojs/components'
import TabBar from '../../components/TabBar'
import './index.scss'
import { getLocation } from '@utils/getLocation'
import { AtAvatar, AtCountdown, AtTag } from 'taro-ui'
import CustomIcon from '../../components/CustomIcon'
import SwiperImg from '../../components/SwiperImg'
import FreshList, { FreshListInterface } from '../../components/FreshList'
import CusTabs from '../../components/CusTabs'
import commodity from './utils/commodity'
import { GetAdv } from './utils/interface'
import { navTo } from '@utils/route'
import { useDispatch, useSelector } from '@tarojs/redux'
import { loginIn, loginOut, setShop } from '@redux/actions'
import LimitStr from '@utils/stringLimit'
import account from '../mine/utils/login'
import shopCart from '../shoppingCart/utils/shopCart'
import { selectAuthState, selectShopState } from '@redux/reducers/selector'
import user from '../mine/utils/user'

let firstIn = true

interface Props {

}

const Home: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const shopState = useSelector(selectShopState)
  const authState = useSelector(selectAuthState)

  const [location, setLocation] = useState<string>('')
  const [freshList, setFreshList] = useState<FreshListInterface>()
  const [advList, setAdvList] = useState<GetAdv[]>()
  const [spikeList, setSpikeList] = useState({pros: []})
  const [groupList, setGroupList] = useState([])
  const [shopInfo, setShopInfo] = useState()
  const [topicId, setTopicId] = useState<number>()
  const [showPage, setShowPage] = useState<boolean>(false)
  const [tabList, setTabList] = useState()
  const [hotList, setHotList] = useState()
  const [messageList, setMessageList] = useState()
  const [classList, setClassList] = useState()

  useReachBottom(() => {
    if (freshList)
      freshList.nextPage()
  })

  useEffect(() => {
    const autoLogin = async () => {
      if (!Taro.getStorageSync('token'))
        return
      const { code, data } = await account.getUserData()
      if (!code) {
        dispatch(loginIn(data))
      } else {
        dispatch(loginOut())
      }
    }

    autoLogin()
  }, [])

  const addToCart = async (item) => {
    console.log(item)
    const res = await shopCart.addCart(shopState.shopData.shopid, item.id, 1, 0, 0)
    if (!res.code) {
      await Taro.showToast({
        title: '加入购物车成功'
      })
    }
  }

  const toSort = (num?: string) => {
    if (num)
      Taro.reLaunch({
        url: '/pages/classification/index?props=' + JSON.stringify({num: num})
      })
    else
      Taro.reLaunch({
        url: '/pages/classification/index'
      })
  }

  const initPage = async () => {
    try {
      let shopRes
      if (firstIn) {
        shopRes = await commodity.getShop()
        setShopInfo(shopRes.data)
        dispatch(setShop(shopRes.data))
        firstIn = false
      }
      getLocationMes()
      const {data} = await commodity.getAdv(0)
      const listRes = await commodity.getSkuList(shopState.shopData.shopid || shopRes.data.shopid)
      const hotListRes = await commodity.getHotShop(shopState.shopData.shopid || shopRes.data.shopid)
      const spikeRes = await commodity.getSpikeHome(shopState.shopData.shopid || shopRes.data.shopid)
      const groupRes = await commodity.getGroupHome(shopState.shopData.shopid || shopRes.data.shopid)
      const classListRes = await commodity.getClassList()
      if (authState.loginStatus) {
        const messageRes = await user.getMessageCount(1, 0)
        setMessageList(messageRes.data)
      }
      setSpikeList(spikeRes.data || {pros: []})
      setGroupList(groupRes.data || [])
      setHotList(hotListRes.data)
      setClassList(classListRes.data)
      setTabList(listRes.data)
      setAdvList(data)
    } catch (e) {
    }
    setShowPage(true)
  }

  useEffect(() => {
    if (!shopInfo || (shopState.shopData.shopid !== shopInfo.shopid)) {
      initPage()
      setShopInfo(shopState.shopData)
    }
  }, [shopState.shopData.shopid])

  useEffect(() => {
    if (freshList)
      freshList.refreshList()
  }, [topicId])

  const getLocationMes = async () => {
    const res = await getLocation()
    setLocation(res)
    console.log(res)
  }

  return (
    <View>
      {showPage &&
      (
        <View>
          {/*首页顶部*/}
          <TabBar title='首页' hideContent />
          <View className='topBackground gradientTheme' />
          <View
            className='headerAndTitle commonRowFlex'
            style={{
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}
          >
            <View
              className='commonRowFlex'
              onClick={() => navTo('home', 'chooseShop')}
              style={{
                alignItems: 'center'
              }}
            >
              <CustomIcon size={20}
                          onClick={() => navTo('home', 'chooseShop')}
                          name='location'
                          color='white'
              />
              <Text
                className='mediumText'
                style={{
                  color: 'white',
                  marginLeft: '8Px'
                }}
              >
                {location}
              </Text>
            </View>
          </View>
          <View
            className='commonRowFlex flexCenter'
            style={{
              justifyContent: 'space-between'
            }}
          >
            <View className='cusSearchBar flexCenter commonRowFlex'
                  onClick={() => navTo('home', 'search')}
            >
              <CustomIcon
                name='search'
                size={25}
                color='gray'
                style={{
                  margin: '0 12px'
                }}
              />
              <Text
                className='mediumText'
                style={{
                  color: 'gray'
                }}
              >
                请输入关键字搜索
              </Text>
            </View>
            <View
              className='commonColumnFlex flexCenter'
              onClick={() => navTo('mine', 'myMessage')}
              style={{
                marginRight: '16px'
              }}
            >
              <CustomIcon name='ring'
                          color='white'
                          size={25}
                          onClick={() => navTo('mine', 'myMessage')}
              />
              <Text className='smallText whiteText'>消息</Text>
            </View>
          </View>
          {/*首页banner*/}
          <View
            style={{
              margin: '0 16px 8px 16px'
            }}
          >
            {advList[0] &&
            <SwiperImg list={advList[0].list}>
            </SwiperImg>}
          </View>
          <View
            className='commonRowFlex'
            style={{
              margin: '8px 16Px',
              justifyContent: 'space-around'
            }}
          >
            <View className='commonRowFlex flexCenter'>
              <CustomIcon name='diamond' color='gray' size={15} style={{marginRight: '8px'}} />
              <Text className='slightlySmallText grayText'>品质好物</Text>
            </View>
            <View className='commonRowFlex flexCenter'>
              <CustomIcon name='lightning' color='gray' size={15} style={{marginRight: '8px'}} />
              <Text className='slightlySmallText grayText'>急速送达</Text>
            </View>
            <View className='commonRowFlex flexCenter'>
              <CustomIcon name='heart' color='gray' size={15} style={{marginRight: '8px'}} />
              <Text className='slightlySmallText grayText'>无忧售后</Text>
            </View>
          </View>
          {/*栏目分类*/}
          <View className='commonRowFlex'
                style={{
                  justifyContent: 'space-between',
                  margin: '0 16px'
                }}
          >
            {classList.map((item, index) => {
              if (index > 3)
                return
              return (
                <View onClick={() => toSort(item.num)} className='commonColumnFlex flexCenter' key={index}>
                  <AtAvatar size='large' image={item.img} circle />
                  <Text className='slightlySmallText' style={{marginTop: '4px'}}>{item.name}</Text>
                </View>
              )
            })}
            <View onClick={() => toSort()} className='commonColumnFlex flexCenter'>
              <AtAvatar size='large' image='http://www.gx8899.com/uploads/allimg/160825/3-160R5093948-52.jpg' circle />
              <Text className='slightlySmallText' style={{marginTop: '4px'}}>查看更多</Text>
            </View>
          </View>
          {/*促销活动*/}
          <View
            style={{
              margin: '16px 16px 0 16px',
            }}
          >
            {advList[1] &&
            <SwiperImg
              marginRight={20}
              autoplay={false}
              circular={false}
              imgWidth={95}
              swiperHeight='100px'
              list={advList[1].list}
            />}
          </View>
          <View className='commonRowFlex'
            style={{
              margin: '16px 16px 0 16px',
            }}
          >
            {/*秒杀*/}
            <View className='commonColumnFlex'
                  onClick={() => navTo('home', 'spikeHome')}
                  style={{
                    background: 'linear-gradient(to left top, white, rgb(253, 246, 246))',
                    borderRadius: '15PX',
                    padding: '8px',
                    flex: 1,
                    marginRight: '8px'
                  }}
            >
              <View className='commonRowFlex'
                style={{
                  justifyContent: 'space-between'
                }}
              >
                <Text>今日秒杀</Text>
                <View className='countDown commonRowFlex'>
                  <CustomIcon name='lightning' color='white' size={15} style={{marginLeft: '4px'}} />
                  <AtCountdown
                    format={{
                      hours: ':',
                      minutes: ':',
                      seconds: ''
                    }}
                    hours={1}
                    minutes={1}
                    seconds={10}
                    onTimeUp={() => {}}
                  />
                </View>
              </View>
              <Text className='slightlySmallText redText'>拼手速 低价抢好物</Text>
              <View className='commonRowFlex'
                style={{
                  justifyContent: 'space-around',
                  marginTop: '8px'
                }}
              >
                {spikeList.pros.map((item, index) => (
                  <View className='commonColumnFlex flexCenter'
                    key={index}
                    style={{
                      justifyContent: 'center',
                      flex: 1,
                    }}
                  >
                    <AtAvatar image={item.imgurl} />
                    <View className='commonRowFlex flexCenter'>
                      <Text className='slightlySmallText'>
                        ¥ {item.activityprice}
                      </Text>
                      <Text className='smallText grayText'
                            style={{
                              marginLeft: '4px',
                              textDecoration: 'line-through'
                            }}
                      >
                        ¥ {item.price}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            {/*拼团*/}
            <View className='commonColumnFlex'
                  onClick={() => navTo('home', 'groupHome')}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '15PX',
                    padding: '8px',
                    flex: 1,
                  }}
            >
              <View className='commonRowFlex'
                    style={{
                      justifyContent: 'space-between'
                    }}
              >
                <Text>拼团特惠</Text>
              </View>
              <Text className='slightlySmallText grayText'>拼团享特价优惠</Text>
              <View className='commonRowFlex'
                    style={{
                      justifyContent: 'space-around',
                      marginTop: '8px'
                    }}
              >
                {groupList.map((item, index) => (
                  <View className='commonColumnFlex flexCenter'
                        key={index}
                        style={{
                          justifyContent: 'center',
                          flex: 1,
                        }}
                  >
                    <AtAvatar image={item.imgurl} />
                    <View className='commonRowFlex flexCenter'>
                      <AtTag size='small' circle active>{`${item.tgcount}人团${item.activityprice}`}</AtTag>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
          {/*热门活动*/}
          <View className='normalMarginTop'
                style={{
                  position: 'relative'
                }}
          >
            <View className='titleWithColor' />
            <Text className='boldText'
                  style={{
                    marginLeft: '16px'
                  }}
            >热销排行榜</Text>
          </View>
          <View className='radius normalMargin'
                style={{
                  backgroundColor: 'white'
                }}
          >
            <ScrollView scrollX>
              <View className='commonRowFlex'>
                {hotList.map((item, index) => (
                  <View onClick={() => navTo('home', 'productDetails', {id: item.id})} className='normalMargin commonColumnFlex flexCenter' key={index}>
                    <View className='smallMarginLeft smallMarginRight'>
                      <AtAvatar size='large' image={item.imgurl} />
                    </View>
                    <Text className='slightlySmallText smallMarginTop smallMarginBottom'>{LimitStr(item.name, 4)}</Text>
                    <View className='commonRowFlex flexCenter'
                          style={{
                            justifyContent: 'space-between',
                            width: '100%'
                          }}
                    >
                      <View className='commonColumnFlex'>
                        <Text className='slightlySmallText redText'>¥ {item.price}</Text>
                        {/*<Text className='smallText throughLineText grayText'>¥ {item.oldPrice}</Text>*/}
                      </View>
                      <CustomIcon name='add' onClick={() => addToCart(item)} color='rgb(239, 154, 151)' size={25} />
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
          {/*商品列表*/}
          <CusTabs tabs={tabList} active={0} changeTab={(id) => setTopicId(id)} defaultTitle='精选好物' />
          <View className='normalMarginLeft normalMarginRight'>
            <FreshList onRef={setFreshList} topicId={topicId} shopid={shopState.shopData.shopid} dispatchListFunc={async (page: number, size: number, topicid: number, shopId: number) => {
              return await commodity.getTopicSku(topicid, shopId, page, size)
            }}
            />
          </View>
        </View>
      )
      }
    </View>
  )
}

export default Home
