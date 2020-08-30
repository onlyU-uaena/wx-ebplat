import Taro, { useState, useEffect, useReachBottom } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { View } from '@tarojs/components'
import './index.scss'
import TabBar from '../../../../components/TabBar'
import commodity from '../../utils/commodity'
import { selectShopState } from '@redux/reducers/selector'
import CardCommodity from '../../../../components/CardCommodity'

interface Props {

}

const HotProduct: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const shopState = useSelector(selectShopState)
  const [list, setList] = useState([])
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    getHotPro()
  }, [])

  useReachBottom(() => {
    getHotPro()
  })

  const getHotPro = async () => {
    const {data} = await commodity.getHotPro(shopState.shopData.shopid, page, 14)
    if (data.length) {
      setPage(page + 1)
      setList(list.concat(data))
    }
  }

  return (
    <View>
      <TabBar title='热销排行榜' />
      {list.map(item => (
        <CardCommodity hurdle labelName={item.lablename} labelUrl={item.lableimg} key={item.id} proId={item.id} imgUrl={item.imgurl} title={item.name} price={item.price} oldPrice={item.oldPrice || ''} />
      ))}
    </View>
  )
}

export default HotProduct
