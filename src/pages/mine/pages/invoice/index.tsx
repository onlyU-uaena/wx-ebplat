import Taro, { useState, useEffect, useDidShow, useReachBottom } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import ReadCommodity from '../../../../components/ReadCommodity'
import HeightView from '../../../../components/HeightView'
import invoice from '../../utils/invoice'
import EmptyPage from '../../../../components/EmptyPage'
import { navTo } from '@utils/route'

interface Props {

}

const Invoice: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState<number>(1)
  const [list, setList] = useState([])

  useReachBottom(async () => {
    const {data} = await invoice.getOrderList(page, 14)
    if (data.length) {
      setList(list.concat(data))
      setPage(page + 1)
    }
  })

  useDidShow(() => {
    getOrderList()
  })

  const getOrderList = async () => {
    const {data} = await invoice.getOrderList(1, 14)
    setPage(page + 1)
    setList(data)
  }

  return (
    <View>
      <TabBar title='订单详情' />
      <View className='normalPadding borderBottom commonRowFlex flexCenter'
            style={{
              backgroundColor: 'white',
              justifyContent: 'space-between'
            }}
      >
        <Text className='mediumText'>可开发票订单</Text>
        <Text className='mediumText orangeText'
              onClick={() => navTo('mine', 'invoiceRecord')}
        >开票记录</Text>
      </View>
      {list.length ? list.map(item => (
        <View key={item.id}
              onClick={() => navTo('mine', 'invoicing', {money: item.actualpay.toFixed(2), ids: item.id})}
        >
          <HeightView />
          <View style={{
            backgroundColor: 'white'
          }}
          >
            <View className='normalPadding borderBottom'>
              <Text className='slightlySmallText grayText'>{item.addorderdate}</Text>
            </View>
            {item.lsitdetais.map(shopItem => (
              <ReadCommodity key={shopItem.id} imgUrl={shopItem.productimg} title={shopItem.productname} price={shopItem.proprice} num={shopItem.productcount} />
            ))}
            <View className='commonRowFlex flexCenter normalPadding'
                  style={{
                    justifyContent: 'flex-end'
                  }}
            >
              <Text className='mediumText'>共<Text className='mediumText redText'>{item.lsitdetais.length}</Text>件 付款 ¥<Text className='mediumText redText'>{item.actualpay.toFixed(2)}</Text></Text>
            </View>
          </View>
        </View>
      )) : <EmptyPage title='暂无可开票订单' />
      }
    </View>
  )
}

export default Invoice
