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

interface Props {

}

const PointShop: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const authState = useSelector(selectAuthState)

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
      <View className='normalPadding'
            style={{
              backgroundColor: 'white'
            }}
      >
        <View className='commonColumnFlex flexCenter'>

        </View>
      </View>
    </View>
  )
}

export default PointShop
