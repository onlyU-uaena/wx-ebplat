import Taro, { useState } from "@tarojs/taro"
import { View } from "@tarojs/components"
import { AtTabBar } from 'taro-ui'
import Home from '../home'

interface Props {
}

const Index: Taro.FC<Props> = () => {
  const [currentTab, setCurrentTab] = useState<number>(0)
  const handleClick = value => {
    setCurrentTab(value)
  }
  const tabTitle = [
    '首页',
    '分类',
    '探索',
    '购物车',
    '我的'
  ]
  return (
    <View className='container'>
      {currentTab === 0 && <Home />}
      {currentTab === 1 && ''}
      {currentTab === 2 && ''}
      {currentTab === 3 && ''}
      {currentTab === 4 && ''}
      <AtTabBar
        fixed
        fontSize={11}
        tabList={[
          { title: tabTitle[0], iconType: 'home' },
          { title: tabTitle[1], iconType: 'bullet-list' },
          { title: tabTitle[2], iconType: 'eye' },
          { title: tabTitle[3], iconType: 'shopping-cart' },
          { title: tabTitle[4], iconType: 'user' }
        ]}
        onClick={handleClick}
        current={currentTab}
      />
    </View>
  )
}

export default Index
