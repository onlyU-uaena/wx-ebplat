import Taro, { useState, useEffect, useReachBottom } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { View } from '@tarojs/components'
import './index.scss'
import { AtButton, AtListItem } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import user from '../../utils/user'
import EmptyPage from '../../../../components/EmptyPage'

interface Props {

}

const pointStr = {
  0: '积分兑换',
  1: '订单评价',
  2: '签到',
  3: '活动赠送',
  4: '订单消费',
  5: '活动消费',
  6: '下单赠送'
}

const PointDetail: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const [infoList, setInfoList] = useState([])
  const [page, setPage] = useState<number>(1)

  useReachBottom(() => {
    getPoint()
  })

  const getPoint = async () => {
    const {data} = await user.getPointInfo('', page, 14)
    setInfoList(infoList.concat(data))
    if (data.length) {
      setPage(page + 1)
    }
  }

  useEffect(() => {
    getPoint()
  }, [])

  return (
    <View>
      <TabBar title='积分明细' />
      <View>
        {infoList.length ? (
          infoList.map(item => (
            <AtListItem key={item.id} title={pointStr[item.type]} note={item.createtimestr} extraText={`+${item.points}`} />
          ))
        ) : (
          <EmptyPage title='暂无积分明细' />
        )}
      </View>
    </View>
  )
}

export default PointDetail
