import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton, AtTag } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import colors from '../../../../common/styles/color'
import HeightView from '../../../../components/HeightView'
import { selectAuthState } from '@redux/reducers/selector'
import CustomIcon from '../../../../components/CustomIcon'
import { navTo } from '@utils/route'
import point from '../../utils/point'

interface Props {

}

const PointRule: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const [rule, setRule] = useState([])

  const getRule = async () => {
    const {data} = await point.getPointRule()
    setRule(data)
  }

  useEffect(() => {
    getRule()
  }, [])

  return (
    <View>
      <TabBar title='积分规则' />
      <View className='normalPadding'
            style={{
              backgroundColor: 'white'
            }}
      >
        <View>
          <Text className='redText'>Q</Text>
          <Text className='smallMarginLeft'>如何获取积分</Text>
        </View>
        <HeightView />
        <View className='commonRowFlex'>
          <Text className='orangeText'>A</Text>
          <View className='commonColumnFlex smallMarginLeft'>
            {rule.length && rule.map((item, index) => (
              <Text key={index} className='grayText mediumText'>{`${index + 1}.${item.content}`}</Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}

export default PointRule
