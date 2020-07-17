import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { View } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'

interface Props {

}

const Tem: Taro.FC<Props> = () => {
  const dispatch = useDispatch()

  return (
    <View>
    </View>
  )
}

export default Tem
