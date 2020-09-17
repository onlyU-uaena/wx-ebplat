import Taro, { useState } from '@tarojs/taro'
import { Image, Text, View } from '@tarojs/components'
import './index.scss'

import useEffect = Taro.useEffect
import CustomIcon from '../CustomIcon'
import LimitStr from '@utils/stringLimit'
import { navTo } from '@utils/route'
import shopCart from '../../pages/shoppingCart/utils/shopCart'
import { useSelector } from '@tarojs/redux'
import { selectShopState } from '@redux/reducers/selector'
import HeightView from '../HeightView'

interface Props {
  imgUrl: string
  title: string
  price: number
  oldPrice: number
  desc?: string
  hurdle?: boolean
  proId: number
  jumpToDetail?: boolean
  labelName?: string
  labelUrl?: string
  onShopCart?: () => void
}

// 该组件非通栏默认一列可以容纳2个,一般左右各16px间隔，中间16px最为美观

const CardCommodity: Taro.FC<Props> = (props) => {
  const shopState = useSelector(selectShopState)
  const { imgUrl, onShopCart, labelName, labelUrl, title, proId, oldPrice, price, hurdle, desc, jumpToDetail = true } = props
  const [width, setWidth] = useState<number>(0)

  const getWindowWidth = async () => {
    const result = await Taro.getSystemInfo()
    setWidth(((result.windowWidth - 48) / 2) - 16)
  }

  const addToCart = async (id: number) => {
    console.log(id)
    const res = await shopCart.addCart(shopState.shopData.shopid, id, 1, 0, 0)
    if ((res.code === 0) && onShopCart) {
      onShopCart()
    } else if (res.code === 0) {
      await Taro.showToast({
        title: '加入购物车成功'
      })
    }
  }

  const toDetail = (id: number) => {
    navTo('home', 'productDetails', {id: id})
  }

  useEffect(() => {
    getWindowWidth()
  }, [])

  return (
    <View onClick={jumpToDetail ? () => toDetail(proId) : () => {}}>
      {width === 0 ? null : (
        <View>
        {hurdle ? (
          <View className='commonRowFlex normalPadding borderBottom'
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'space-between'
                }}
          >
            <View style={{
              position: 'relative',
              flexShrink: 0,
              marginRight: '8px'
            }}
            >
              <Image src={labelUrl.split(',')[0]} className='labelImg' />
              <Image src={imgUrl}
                     className='displayImg'
              />
            </View>
            <View className='commonColumnFlex' style={{
              justifyContent: 'space-between',
              flex: 1
            }}
            >
              <View className='commonRowFlex flexCenter' style={{
                justifyContent: 'space-between'
              }}
              >
                <Text className='mediumText'>{LimitStr(title, 12)}</Text>
              </View>
              <Text className='slightlySmallText grayText'>{desc}</Text>
              <View>
                <View className='commonRowFlex smallMarginTop normalMarginBottom'>
                  {labelName.split(',').map(item => {
                    if (item !== '')
                    return (
                      <View key={item} className='commodityLabel gradientTheme'>
                        <Text className='smallText whiteText'>
                          {item}
                        </Text>
                      </View>
                    )
                  })}
                </View>
                <View className='commonRowFlex'
                      style={{
                        justifyContent: 'space-between'
                      }}
                >
                  <View className='commonRowFlex flexCenter'>
                    <Text className='mediumText redText'>¥ {price}</Text>
                    {oldPrice && <Text className='smallText grayText smallMarginLeft'>¥ {oldPrice}</Text>}
                  </View>
                  <CustomIcon name='add' onClick={() => addToCart(proId)} color='rgb(239, 154, 151)' size={25} />
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View className='radius'
                style={{
                  width: `${width + 16}px`,
                  backgroundColor: 'white',
                  padding: '8px',
                  marginBottom: '8px'
                }}
          >
            <View style={{
              position: 'relative',
              flexShrink: 0,
            }}
            >
              <Image src={labelUrl.split(',')[0]} className='labelImg' />
              <Image src={imgUrl}
                     style={{
                       width: `${width}px`,
                       height: `${width}px`
                     }}
              />
            </View>
            <Text className='mediumText smallMarginTop'>{LimitStr(title, 7)}</Text>
            <View className='commonRowFlex smallMarginTop normalMarginBottom'>
              {labelName.split(',').map(item => {
                if (item !== '')
                  return (
                    <View key={item} className='commodityLabel gradientTheme'>
                      <Text className='smallText whiteText'>
                        {item}
                      </Text>
                    </View>
                  )
              })}
            </View>
            <View className='commonRowFlex'
                  style={{
                    justifyContent: 'space-between'
                  }}
            >
              <View className='commonRowFlex flexCenter'>
                <Text className='mediumText redText'>¥ {price}</Text>
                {/*<Text className='smallText grayText smallMarginLeft'>¥ {oldPrice}</Text>*/}
              </View>
              <CustomIcon name='add' onClick={() => addToCart(proId)} color='rgb(239, 154, 151)' size={25} />
            </View>
          </View>
        )}
        </View>
        )}
    </View>

  )
}

export default CardCommodity
