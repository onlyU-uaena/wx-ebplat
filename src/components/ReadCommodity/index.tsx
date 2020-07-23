import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtAvatar, AtButton } from 'taro-ui'

interface Props {
  imgUrl: string
  title: string
  desc?: string
  price: string
  num: number
  onClick?: () => void
}

const ReadCommodity: Taro.FC<Props> = (props) => {
  const dispatch = useDispatch()
  const {imgUrl, title, num, desc, price, onClick} = props

  return (
    <View className='normalPadding'
          onClick={onClick ? () => onClick() : () => {}}
          style={{
            backgroundColor: 'white'
          }}
    >
      <View className='commonRowFlex'>
        <AtAvatar size='large' image={imgUrl} />
        <View className='commonColumnFlex smallMarginLeft' style={{
          justifyContent: 'space-between',
          flex: 1
        }}
        >
          <Text className='mediumText'>{title}</Text>
          <View className='commonRowFlex'
                style={{
                  justifyContent: 'space-between'
                }}
          >
            <Text className='slightlySmallText grayText'>{desc}</Text>
            <Text className='slightlySmallText'>¥{price}</Text>
          </View>
          <Text className='slightlySmallText'>x{num}</Text>
        </View>
      </View>
    </View>
  )
}

export default ReadCommodity
