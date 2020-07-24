import Taro, { useState, useEffect, useReachBottom } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { View } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import CardCommodity from '../../../../components/CardCommodity'
import user from '../../utils/user'

interface Props {

}

let page = 1

const MyFoot: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const [footList, setFootList] = useState([])

  useReachBottom(() => getFoot())

  const getFoot = async () => {
    const {data} = await user.getFoot(page, 14)
    if (data.length) {
      setFootList(footList.concat(data))
      page += 1
    }
  }

  useEffect(() => {
    page = 1
    getFoot()
  }, [])

  return (
    <View>
      <TabBar title='我的足迹' />
      <View>
        <View style={{
          backgroundColor: 'white'
        }}
        >
          <View>
            {footList.length && footList.map((item, index) => (
              <View key={index}>
                {item.list.map(shopItem => (
                  <CardCommodity key={shopItem.id} proId={shopItem.id} hurdle imgUrl={shopItem.imgurl} title={shopItem.spuname} desc={shopItem.subtitle} price={shopItem.price} oldPrice={0} />
                ))}
              </View>
            ))}
            {/*{footList.length && footList.map((item) => item.list.map((shopItem, index) => (*/}
            {/*  <View></View>*/}
            {/*)))}*/}
          </View>
        </View>
      </View>
    </View>
  )
}

export default MyFoot
