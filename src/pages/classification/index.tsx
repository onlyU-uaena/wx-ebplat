import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { View } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import TabBar from '../../components/TabBar'

interface Props {

}

const Classification: Taro.FC<Props> = () => {
  const dispatch = useDispatch()

  return (
    <View>
      <TabBar title='分类' homeButton={false} backButton={false} />
    </View>
  )
}

export default Classification
