import Taro, { useState } from '@tarojs/taro'
import { ScrollView, Text, View } from '@tarojs/components'
import './index.scss'
import { AtTag } from 'taro-ui'

interface Props {
  tabs: {
    title: string
    desc?: string
  }[]
  active?: number
  changeTab?: (index: number) => void
}

const CusTabs: Taro.FC<Props> = ({tabs, active, changeTab = (index: number) => {}}) => {
  const [activeTab, setActiveTab] = useState<number>(active || 0)

  return (
    <ScrollView scrollX>
      <View className='commonRowFlex'>
        {tabs && tabs.map((item, index) => (
          <View className='commonColumnFlex flexCenter normalMarginBottom border'
                onClick={() => {
                  setActiveTab(index)
                  changeTab(index)
                }}
                key={index}
                style={{
                  padding: '0 16px 0 16px',
                  flexShrink: 0
                }}
          >
            <Text className={activeTab === index ? 'redText mediumText' : 'mediumText'}>{item.title}</Text>
            <AtTag type='primary' size='small' circle active={activeTab === index}>{item.desc}</AtTag>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default CusTabs
