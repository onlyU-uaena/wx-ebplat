import Taro, { useState, useEffect } from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import colors from '../../common/styles/color'
import './index.scss'
import CustomIcon from '../CustomIcon'

interface Props {
  title: string
  backButton?: boolean
  honeButton?: boolean
}

const TabBar: Taro.FC<Props> = ({title, backButton, honeButton}) => {
  const [safeTop, setSafeTop] = useState<number>(0)

  useEffect(() => {
    const { safeArea } = Taro.getSystemInfoSync()
    setSafeTop(safeArea.top)
  }, [])

  const goBack = () => {
    Taro.navigateBack()
  }

  const goHome = () => {
    Taro.switchTab({
      url: '/pages/home/index'
    })
  }

  return (
    <View
      className='tabBarContainer commonRowFlex gradient'
      style={{
        paddingTop: `${safeTop}px`,
        ...styles.tabBarContainer
      }}
    >
      <View className='buttonGroup commonRowFlex'>
        <CustomIcon
          size={20}
          name='back'
          color={colors.white}
          style={{
            marginLeft: '8px'
          }}
          onClick={goBack}
        />
        <CustomIcon
          size={20}
          name='backHome'
          color={colors.white}
          style={{
            marginLeft: '16px'
          }}
          onClick={goHome}
        />
      </View>
      <Text className='title' style={styles.title}>{title}</Text>
      <View className='buttonGroup' />
    </View>
  )
}

const styles = {
  tabBarContainer: {
    height: '40px'
  },
  title: {
    color: colors.white
  }
}

export default TabBar
