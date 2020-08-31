import Taro, { useState, useEffect, useRouter, useReachBottom, useScope } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { ScrollView, Text, View } from '@tarojs/components'
import './index.scss'
import { AtAvatar, AtButton } from 'taro-ui'
import TabBar from '../../components/TabBar'
import { navTo } from '@utils/route'
import LimitStr from '@utils/stringLimit'
import CustomIcon from '../../components/CustomIcon'
import commodity from '../home/utils/commodity'
import colors from '../../common/styles/color'
import SwiperImg from '../../components/SwiperImg'
import { GetAdv } from '../home/utils/interface'
import HeightView from '../../components/HeightView'
import CardCommodity from '../../components/CardCommodity'
import shopCart from '../shoppingCart/utils/shopCart'
import { selectAuthState, selectShopState } from '@redux/reducers/selector'
import useDidShow = Taro.useDidShow
import usePageScroll = Taro.usePageScroll

interface Props {

}

interface List {
  id: number
  img: string
  name: string
  num: string
}

let page = 1
let outId: number

const Classification: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const scope = useScope()
  const shopState = useSelector(selectShopState)
  const authState = useSelector(selectAuthState)
  const [safeTop, setSafeTop] = useState<number>(0)
  const [classList, setClassList] = useState<List[]>()
  const [skuList, setSkuList] = useState([])
  const [secClassList, setSecClassList] = useState<List[]>()
  const [advList, setAdvList] = useState<GetAdv[]>()
  const [secIndex, setSecIndex] = useState<number>(0)
  const [anchorArray, setAnchorArray] = useState([])
  const [secTitle, setSecTitle] = useState<string>()
  const [firIndex, setFirIndex] = useState<string>()

  const getClass = async () => {
    const {data} = await commodity.getClassList()
    setClassList(data)
    return data
  }

  useEffect(() => {
    const { safeArea } = Taro.getSystemInfoSync()
    setSafeTop(safeArea.top)
  }, [])

  const getAdv = async () => {
    const {data} = await commodity.getAdv(0, shopState.shopData.shopid)
    setAdvList(data[0])
  }

  const getSecClass = async (num: string) => {
    const {data} = await commodity.getAllSecPro(shopState.shopData.shopid, num)
    setSecClassList(data)
    return data
  }

  const initPage = async () => {
    const data = await getClass()
    let numProps
    if (router.params.props)
      numProps = JSON.parse(router.params.props).num
    if (numProps) {
      const res = await chooseFir(numProps)
    } else {
      const res = await chooseFir(data[0].num)
    }
  }

  // const nextPage = async (id: number, reset: boolean) => {
  //   const {data} = await commodity.getSortSku(shopState.shopData.shopid, id, page, 14, 0, 1)
  //   if (reset)
  //     setSkuList(data)
  //   if (data.length) {
  //     page = page + 1
  //     if (reset)
  //       setSkuList(data)
  //     else
  //       setSkuList(skuList.concat(data))
  //   }
  // }

  // useReachBottom(() => {
  //   nextPage(outId, false)
  // })

  const chooseSec = async (index) => {
    setSecIndex(index)
    Taro.pageScrollTo({
      scrollTop: anchorArray[index] - anchorArray[0]
    })
  }

  const chooseFir = async (num: string) => {
    const res = await getSecClass(num)
    setFirIndex(num)
    // chooseSec(res[0].num, res[0].id, res[0].name)
    return res
  }

  useDidShow(() => {
    initPage()
  })

  const handleScroll = (e) => {
    const scrollTop = e.scrollTop - anchorArray[0]
    const scrollArr = anchorArray
    // if (scrollTop >= scrollArr[scrollArr.length - 1] - (windowHeight - safeTop + 80)) {
    //   return
    // } else {
    for (let i = 0; i < scrollArr.length; i++) {
      if (scrollTop >= 0 && scrollTop < scrollArr[0]){
        setSecIndex(0)
      } else if (scrollTop >= scrollArr[i] && scrollTop < scrollArr[i + 1]) {
        setSecIndex(i + 1)
      }
    }
    // }
  }

  usePageScroll((e) => handleScroll(e))

  const toDetail = (id: number) => {
    navTo('home', 'productDetails', {id: id})
  }

  useEffect(() => {
    getHeight()
  }, [secClassList])

  const getHeight = () => {
    const query = Taro.createSelectorQuery().in(scope)
    const heightArr = [];
    let h = 0;
    query.selectAll('.anchorPoint').boundingClientRect((react) =>{
      react.forEach((res)=>{
        h += res.height;
        heightArr.push(h)
      })
      console.log(heightArr)
      setAnchorArray(heightArr)
    }).exec();
  }

  const addToCart = async (item) => {
    console.log(item)
    const res = await shopCart.addCart(shopState.shopData.shopid, item.id, 1, 0, 0)
    if (!res.code) {
      await Taro.showToast({
        title: '加入购物车成功'
      })
    }
  }

  useEffect(() => {
    getAdv()
  }, [])

  return (
    <View>
      <TabBar title='分类' homeButton={false} backButton={false} />
      <View style={{height: '67px'}} />
      <View
        className='commonRowFlex flexCenter gradientTheme'
        style={{
          justifyContent: 'space-between',
          height: '67px',
          position: 'fixed',
          top: `${safeTop + 40}px`,
          width: '100%',
          zIndex: 999
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
          style={{
            marginRight: '16px'
          }}
        >
          <CustomIcon name='ring'
                      color='white'
                      showDot={authState.haveMessage}
                      size={25}
                      onClick={() => navTo('mine', 'myMessage')}
          />
          <Text className='smallText whiteText'
                onClick={() => navTo('mine', 'myMessage')}
          >消息</Text>
        </View>
      </View>
      <View className='normalPadding'
            style={{
              backgroundColor: 'white'
            }}
      >
        <ScrollView scrollX>
          <View className='commonRowFlex'>
            {classList && classList.map((item, index) => (
              <View className='commonColumnFlex smallMarginLeft smallMarginRight flexCenter'
                    key={index}
                    onClick={() => chooseFir(item.num)}
              >
                <AtAvatar circle image={item.img} size='large' />
                <Text className={firIndex === item.num ? 'smallMarginTop slightlySmallText redText boldText' : 'smallMarginTop slightlySmallText'}>{item.name}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <View className='commonRowFlex'>
        <View className='commonColumnFlex'>
          <View style={{
            position: 'sticky',
            top: safeTop + 107 + 'px'
          }}
          >
            {secClassList && secClassList.map((item, index) => (
              <View className='commonRowFlex flexCenter normalPadding'
                    key={item.categoryid}
                    onClick={() => chooseSec(index)}
                    style={{
                      justifyContent: 'center',
                      position: 'relative',
                      backgroundColor: secIndex === index ? 'white' : colors.background
                    }}
              >
                {secIndex === index ? (<View className='titleWithColor' />) : null}
                <Text className={secIndex === index ? 'slightlySmallText redText boldText' : 'slightlySmallText'}>{item.classname}</Text>
              </View>
            ))}
          </View>
        </View>
        <View className='commonColumnFlex normalMargin'
              style={{
                flex: 1
              }}
        >
          <View>
            {advList && <SwiperImg swiperHeight='100px' list={advList.list} />}
          </View>
          <HeightView />
          <View className='radius normalPadding'
                style={{
                  backgroundColor: 'white'
                }}
          >
            <View className='commonColumnFlex'>
              {secClassList && (
                secClassList.map(item => (
                  <View className='anchorPoint' key={item.categoryid}>
                    <Text className='boldText mediumText'>{item.classname}</Text>
                    {item.skulist.map(shopItem => (
                      <View className='normalPaddingTop normalPaddingBottom borderBottom commonRowFlex'
                            key={shopItem.id}
                            onClick={() => toDetail(shopItem.id)}
                      >
                        <AtAvatar size='normal' image={shopItem.imgurl} />
                        <View className='commonColumnFlex smallMarginLeft'
                              style={{
                                justifyContent: 'space-between',
                                width: '100%'
                              }}
                        >
                          <Text className='slightlySmallText'>{shopItem.name}</Text>
                          <View className='commonRowFlex flexCenter'
                                style={{
                                  justifyContent: 'space-between'
                                }}
                          >
                            <View className='commonRowFlex flexCenter'>
                              <Text className='mediumText redText'>¥{shopItem.price}</Text>
                              {/*<Text className='smallText smallMarginLeft throughLineText grayText'>¥9.9</Text>*/}
                            </View>
                            <CustomIcon name='add' onClick={() => addToCart(shopItem)} color='rgb(239, 154, 151)' size={25} />
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                ))
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Classification
