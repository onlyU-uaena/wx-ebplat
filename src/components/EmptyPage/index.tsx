import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import CustomIcon from '../CustomIcon'
import HeightView from '../HeightView'

interface Props {
  title: string
}

const EmptyPage: Taro.FC<Props> = ({title}) => {
  const dispatch = useDispatch()

  return (
    <View className='commonColumnFlex flexCenter'
          style={{
            margin: '32px'
          }}
    >
      <CustomIcon name='emptyPage' size={50} color='gray' />
      <HeightView />
      <Text className='slightlySmallText grayText'>{title}</Text>
    </View>
  )
}

export default EmptyPage
