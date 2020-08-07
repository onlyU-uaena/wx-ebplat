import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Image, Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton, AtTag } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import colors from '../../../../common/styles/color'
import HeightView from '../../../../components/HeightView'
import { selectAuthState } from '@redux/reducers/selector'
import CustomIcon from '../../../../components/CustomIcon'
import { navTo } from '@utils/route'
import commodity from '../../../home/utils/commodity'
import LimitStr from '@utils/stringLimit'

interface Props {

}

const PointShop: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const authState = useSelector(selectAuthState)
  const [list, setList] = useState()
  const [width, setWidth] = useState<number>(0)

  const getWindowWidth = async () => {
    const result = await Taro.getSystemInfo()
    setWidth((result.windowWidth - 64) / 3)
  }

  const getItems = async () => {
    const {data} = await commodity.getPointItem(1, 14)
    setList(data)
  }

  useEffect(() => {
    getItems()
    getWindowWidth()
  }, [])

  return (
    <View>
      <TabBar title='积分商城' />
      <View className='normalPadding'
            style={{
              backgroundColor: colors.themeColor
            }}
      >
        <View className='commonRowFlex'
              style={{
                justifyContent: 'flex-end'
              }}
        >
          <AtTag size='small'
                 onClick={() => navTo('mine', 'pointDetail')}
                 customStyle={{
                   backgroundColor: 'rgb(255, 255, 255, .1)',
                   color: 'white',
                   border: 'none'
                 }}
          >积分明细</AtTag>
        </View>
        <View className='commonRowFlex flexCenter'
              style={{
                justifyContent: 'center'
              }}
        >
          <Text className='whiteText smallMarginRight'>当前</Text>
          <Text className='whiteText' style={{fontSize: '30px'}}>{authState.userData.points}</Text>
          <Text className='whiteText smallMarginLeft'>积分</Text>
        </View>
        <HeightView />
      </View>
      <View className='normalPadding commonRowFlex' style={{
        backgroundColor: 'white'
      }}
      >
        <View className='commonRowFlex flexCenter borderRight'
              onClick={() => navTo('mine', 'swapRecord')}
              style={{
          flex: 1,
          justifyContent: 'center'
        }}
        >
          <CustomIcon name='pointRecord' color={colors.themeRed} size={25} />
          <Text className='normalMarginLeft'>兑换记录</Text>
        </View>
        <View className='commonRowFlex flexCenter'
              onClick={() => navTo('mine', 'pointRule')}
              style={{
                flex: 1,
                justifyContent: 'center'
              }}
        >
          <CustomIcon name='pointRule' color={colors.themeRed} size={29} />
          <Text className='normalMarginLeft'>积分规则</Text>
        </View>
      </View>
      <HeightView />
      <View className='normalPadding commonRowFlex'
            style={{
              backgroundColor: 'white',
              flexWrap: 'wrap',
              paddingRight: 0
            }}
      >
        {list && list.map(item => (
          <View className='commonColumnFlex flexCenter normalMarginRight'
                onClick={() => navTo('mine', 'pointItem', {pro: item})}
                key={item.id}
                style={{
                  width: `${width}px`,
                  padding: '8px'
                }}
          >
            <Image style={{
                     width: `${width}px`,
                     height: `${width}px`
                   }}
                   src={item.img}
            />
            <HeightView />
            <Text className='slightlySmallText'>{LimitStr(item.goodname, 10)}</Text>
            <HeightView />
            <AtButton size='small' type='primary'>{item.points}积分</AtButton>
          </View>
        ))}
      </View>
    </View>
  )
}

export default PointShop
