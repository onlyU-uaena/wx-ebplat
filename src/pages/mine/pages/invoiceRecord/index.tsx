import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import HeightView from '../../../../components/HeightView'
import invoice from '../../utils/invoice'
import EmptyPage from '../../../../components/EmptyPage'
import { navTo } from '@utils/route'

interface Props {

}

const InvoiceRecord: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const [list, setList] = useState([])

  const getList = async () => {
    const {data} = await invoice.getInvoiceList()
    setList(data)
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <View>
      <TabBar title='开票记录' />
      {list.length ? (
        list.map(item => (
          <View key={item.id} className='normalMargin'
                onClick={() => navTo('mine', 'invoiceDetail', {id: item.id})}
          >
            <View className='normalPadding radius'
                  style={{
                    backgroundColor: 'white'
                  }}
            >
              <View className='commonRowFlex flexCenter'
                    style={{
                      justifyContent: 'space-between'
                    }}
              >
                <Text className='slightlySmallText'>2018</Text>
                <Text className='mediumText orangeText'>{item.type === 2 ? '未开票' : '已开票'}</Text>
              </View>
              <HeightView />
              <View className='commonRowFlex flexCenter'
                    style={{
                      justifyContent: 'space-between'
                    }}
              >
                <Text className='mediumText'>电子发票</Text>
              </View>
              <HeightView />
              <View className='commonRowFlex flexCenter'
                    style={{
                      justifyContent: 'space-between'
                    }}
              >
                <Text className='mediumText'>{item.content}</Text>
                <Text className='mediumText'>{item.money}</Text>
              </View>
            </View>
          </View>
        ))
      ) : (
        <EmptyPage title='暂无开票记录' />
      )}
    </View>
  )
}

export default InvoiceRecord
