import Taro, { useState, useEffect } from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import colors from '../../common/styles/color'
import './index.scss'
import CustomIcon from '../CustomIcon'

interface Props {
  hideContent?: boolean
  title: string
  backButton?: boolean
  homeButton?: boolean
}

const TabBar: Taro.FC<Props> = ({title, hideContent, backButton = true, homeButton = true}) => {
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
    <View>
      {!hideContent ? (
        <View
          className='tabBarContainer gradientTheme commonRowFlex'
          style={{
            paddingTop: `${safeTop}px`,
            ...styles.tabBarContainer
          }}
        >
          <View className='buttonGroup commonRowFlex'>
            {backButton ? (
              <CustomIcon
                size={20}
                name='back'
                color={colors.white}
                style={{
                  marginLeft: '8px'
                }}
                onClick={goBack}
              />
            ) : null}
            {homeButton ? (
              <CustomIcon
                size={20}
                name='backHome'
                color={colors.white}
                style={{
                  marginLeft: '16px'
                }}
                onClick={goHome}
              />
            ) : null}
          </View>
          <Text className='title' style={styles.title}>{title}</Text>
          <View className='buttonGroup' />
        </View>
      ) : (
        <View
          className='tabBarContainer gradientTheme commonRowFlex'
          style={{
            paddingTop: `${safeTop}px`
          }}
        />
      )}
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
