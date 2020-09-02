import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Image, Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import commodity from '../../utils/commodity'
import HeightView from '../../../../components/HeightView'
import { navTo } from '@utils/route'

interface Props {

}

const HotActivity: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const [list, setList] = useState([])

  useEffect(() => {
    getHotActivityList()
  }, [])

  const getHotActivityList = async () => {
    const {data} = await commodity.getHotActivityList()
    setList(data)
  }

  return (
    <View>
      <TabBar title='热门活动' />
      <View className='normalMargin'>
        {list.map(item => (
          <View className='commonColumnFlex normalMarginBottom'
                key={item.id}
                onClick={() => navTo('home', 'activityDetail', {id: item.id})}
                style={{
                  backgroundColor: 'white'
                }}
          >
            <Image src={item.imgurl}
                   style={{
                     height: '100px',
                     width: '100%',
                     borderRadius: '5px'
                   }}
            />
            <View className='commonRowFlex flexCenter normalPadding'
                  style={{
                    justifyContent: 'space-between'
                  }}
            >
              <View className='commonColumnFlex'>
                <Text className='mediumText'>{item.name}</Text>
                <HeightView high='small' />
                <Text className='smallText grayText'>{item.endtime}</Text>
              </View>
              <Text className={item.status === '已结束' ? '' : 'orangeText'}>{item.status}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

export default HotActivity
