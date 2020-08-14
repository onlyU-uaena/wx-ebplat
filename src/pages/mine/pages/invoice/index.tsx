import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import ReadCommodity from '../../../../components/ReadCommodity'
import HeightView from '../../../../components/HeightView'

interface Props {

}

const Invoice: Taro.FC<Props> = () => {
  const dispatch = useDispatch()

  return (
    <View>
      <TabBar title='订单详情' />
      <View className='normalPadding borderBottom'
            style={{
              backgroundColor: 'white'
            }}
      >
        <Text className='mediumText'>可开发票订单</Text>
      </View>
      <HeightView />
      <View style={{
        backgroundColor: 'white'
      }}
      >
        <View className='normalPadding borderBottom'>
          <Text className='slightlySmallText grayText'>2017-2902323</Text>
        </View>
        <ReadCommodity imgUrl='' title='沙卡' price='20.00' num={2} />
        <View className='commonRowFlex flexCenter normalPadding'
              style={{
                justifyContent: 'flex-end'
              }}
        >
          <Text className='mediumText'>共<Text className='mediumText redText'>2</Text>件 需付款 ¥<Text className='mediumText redText'>200</Text></Text>
        </View>
      </View>
    </View>
  )
}

export default Invoice
