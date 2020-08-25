import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { View } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import TabBar from '../../../../components/TabBar'

interface Props {

}

const HotProduct: Taro.FC<Props> = () => {
  const dispatch = useDispatch()

  return (
    <View>
      <TabBar title='热销排行榜' />
    </View>
  )
}

export default HotProduct
