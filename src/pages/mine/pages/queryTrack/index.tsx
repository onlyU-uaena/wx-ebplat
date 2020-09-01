import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton, AtListItem } from 'taro-ui'
import TabBar from '../../../../components/TabBar'

import useRouter = Taro.useRouter
import order from '../../utils/order'
import EmptyPage from '../../../../components/EmptyPage'
import Home from '../../../home'
import HeightView from '../../../../components/HeightView'

interface Props {

}

const QueryTrack: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [trackInfo, setTrackInfo] = useState({data: null})

  useEffect(() => {
    const id = JSON.parse(router.params.props).orderId
    queryTrack(id)
  }, [])

  const queryTrack = async (id) => {
    const res = await order.queryTrack(id)
    setTrackInfo(res)
  }

  return (
    <View>
      <TabBar title='物流信息' />
      {trackInfo.data ? (
        <View>
          <AtListItem title='物流公司' extraText={trackInfo.desc} />
          <AtListItem title='物流编号' extraText={trackInfo.expno} />
          <HeightView high='large' />
          <View className='normalMargin'>
            {trackInfo.data.map(item => (
              <View className='normalMarginBottom'>
                <Text className='mediumText smallMarginBottom' style={{
                  display: 'block'
                }}
                >
                  {item.context}
                </Text>
                <Text className='slightlySmallText'>
                  {item.ftime}
                </Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <EmptyPage title='暂无物流信息' />
      )}
    </View>
  )
}

export default QueryTrack
