import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import EmptyPage from '../../../../components/EmptyPage'

interface Props {

}

const SwapRecord: Taro.FC<Props> = () => {
  const dispatch = useDispatch()

  return (
    <View>
      <TabBar title='兑换记录' />
      <EmptyPage title='您还没有兑换过商品' />
      <View className='commonRowFlex flexCenter'
            style={{
              justifyContent: 'center'
            }}
      >
        <AtButton type='primary' size='small'
                  onClick={() => Taro.navigateBack()}
        >去兑换</AtButton>
      </View>
    </View>
  )
}

export default SwapRecord
