import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { View } from '@tarojs/components'
import './index.scss'
import { AtButton, AtListItem } from 'taro-ui'
import TabBar from '../../../../components/TabBar'

interface Props {

}

const PointDetail: Taro.FC<Props> = () => {
  const dispatch = useDispatch()

  return (
    <View>
      <TabBar title='积分明细' />
      <View>
        <AtListItem title='每日签到[美家生活]' note='2017-12-12' extraText='+1' />
      </View>
    </View>
  )
}

export default PointDetail
