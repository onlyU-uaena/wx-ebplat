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
  beforeBackFuc?: Function
  backDelta?: number
}

const TabBar: Taro.FC<Props> = ({beforeBackFuc, title, hideContent, backButton = true, homeButton = true , backDelta = 1}) => {
  const [safeTop, setSafeTop] = useState<number>(0)

  useEffect(() => {
    const { safeArea } = Taro.getSystemInfoSync()
    setSafeTop(safeArea.top)
  }, [])

  const goBack = () => {
    if (beforeBackFuc)
      beforeBackFuc()
    Taro.navigateBack({
      delta: backDelta
    })
  }

  const goHome = () => {
    Taro.switchTab({
      url: '/pages/home/index'
    })
  }

  return (
    <View style={{
      height: `${!hideContent ? 40 + safeTop : ''}px`
    }}
    >
      {!hideContent ? (
        <View
          className='tabBarContainer gradientTheme commonRowFlex'
          style={{
            paddingTop: `${safeTop}px`,
            height: `${40 + safeTop}px`,
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
    position: 'fixed',
    width: '100%',
    zIndex: 999
},
  title: {
    color: colors.white
  }
}

export default TabBar
