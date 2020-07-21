import Taro, { useState } from '@tarojs/taro'
import { Image, Text, View } from '@tarojs/components'
import './index.scss'

import useEffect = Taro.useEffect
import CustomIcon from '../CustomIcon'
import LimitStr from '@utils/stringLimit'
import { navTo } from '@utils/route'

interface Props {
  imgUrl: string
  title: string
  price: number
  oldPrice: number
  desc?: string
  hurdle?: boolean
  proId: number
  jumpToDetail?: boolean
}

// 该组件非通栏默认一列可以容纳2个,一般左右各16px间隔，中间16px最为美观

const CardCommodity: Taro.FC<Props> = (props) => {
  const { imgUrl, title, oldPrice, price, hurdle, desc, jumpToDetail = true, proId } = props
  const [width, setWidth] = useState<number>(0)

  const getWindowWidth = async () => {
    const result = await Taro.getSystemInfo()
    setWidth(((result.windowWidth - 48) / 2) - 16)
  }

  const toDetail = (id: number) => {
    navTo('home', 'productDetails', {id: id})
  }

  useEffect(() => {
    getWindowWidth()
  }, [])

  return (
    <View onClick={jumpToDetail ? () => toDetail(proId) : () => {}}>
      {hurdle ? (
        <View className='commonRowFlex normalPadding borderBottom'
              style={{
                backgroundColor: 'white',
                justifyContent: 'space-between'
              }}
        >
          <Image src={imgUrl}
                 className='displayImg'
          />
          <View className='commonColumnFlex' style={{
            justifyContent: 'space-between',
            flex: 1
          }}
          >
            <View>
              <Text className='mediumText'>{LimitStr(title, 12)}</Text>
              <Text className='slightlySmallText grayText'>{desc}</Text>
            </View>
            <View className='commonRowFlex'
                  style={{
                    justifyContent: 'space-between'
                  }}
            >
              <View className='commonRowFlex flexCenter'>
                <Text className='mediumText redText'>¥ {price}</Text>
                <Text className='smallText grayText smallMarginLeft'>¥ {oldPrice}</Text>
              </View>
              <CustomIcon name='add' color='rgb(239, 154, 151)' size={25} />
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
          <Image src={imgUrl}
                 style={{
                   width: `${width}px`,
                   height: `${width}px`
                 }}
          />
          <Text className='mediumText smallMarginTop'>{LimitStr(title, 18)}</Text>
          <View className='commonRowFlex smallMarginTop normalMarginBottom'>
            <View className='commodityLabel gradientTheme'>
              <Text className='smallText whiteText'>
                明日达
              </Text>
            </View>
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
            <CustomIcon name='add' onClick={() => {}} color='rgb(239, 154, 151)' size={25} />
          </View>
        </View>
      )}
    </View>

  )
}

export default CardCommodity
