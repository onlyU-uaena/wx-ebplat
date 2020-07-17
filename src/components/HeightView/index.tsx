import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { View } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'

interface Props {
  high?: keyof {normal; large; small}
}

const HeightView: Taro.FC<Props> = ({high = 'small'}) => {

  const viewHeight = {
    normal: '16px',
    large: '32px',
    small: '8px'
  }

  return (
    <View style={{
      height: viewHeight[high]
    }}
    />
  )
}

export default HeightView
