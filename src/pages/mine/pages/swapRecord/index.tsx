import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton, AtListItem } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import EmptyPage from '../../../../components/EmptyPage'
import point from '../../utils/point'

interface Props {

}

const SwapRecord: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState<number>(1)
  const [list, setList] = useState([])

  const getSwapItem = async () => {
    const {data} = await point.getSwapOrder(page, 14)
    if (data.length) {
      setPage(page + 1)
      setList(list.concat(data))
    }
  }

  useEffect(() => {
    getSwapItem()
  }, [])

  return (
    <View>
      <TabBar title='兑换记录' />
      {list.length ? (
        list.map(item => (
          <AtListItem key={item.id} title={item.productname} note={item.createtimestr} extraText={`-${item.points}积分`} />
        ))
      ) : (
        <View>
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
      )}
    </View>
  )
}

export default SwapRecord
