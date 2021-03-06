import Taro, { useState } from '@tarojs/taro'
import { ScrollView, Text, View } from '@tarojs/components'
import './index.scss'
import { AtTag } from 'taro-ui'

interface Props {
  tabs: {
    id: number
    img: string
    name: string
    num: string
    tagName: string
  }[]
  defaultTitle?: string
  active?: number
  changeTab?: (id?: number | string) => void
  defaultTab?: boolean
}

const CusTabs: Taro.FC<Props> = ({tabs, defaultTab = true, active, changeTab = (index: number | string) => {}, defaultTitle}) => {
  const [activeTab, setActiveTab] = useState<number>(active || 0)

  return (
    <ScrollView scrollX>
      <View className='commonRowFlex'>
        {defaultTab && (
          <View className='commonColumnFlex flexCenter normalMarginBottom border'
                onClick={() => {
                  setActiveTab(0)
                  changeTab('')
                }}
                key={0}
                style={{
                  padding: '0 16px 0 16px',
                  flexShrink: 0
                }}
          >
            <Text className={activeTab === 0 ? 'redText mediumText' : 'mediumText'}>全部</Text>
            <AtTag type='primary' size='small' circle active={activeTab === 0}>精选好物</AtTag>
          </View>
        )}
        {tabs && tabs.map((item, index) => (
          <View className='commonColumnFlex flexCenter normalMarginBottom border'
                onClick={() => {
                  setActiveTab(index + 1)
                  changeTab(item.id)
                }}
                key={index + 1}
                style={{
                  padding: '0 16px 0 16px',
                  flexShrink: 0
                }}
          >
            <Text className={activeTab === (index + 1) ? 'redText mediumText' : 'mediumText'}>{item.name}</Text>
            <AtTag type='primary' size='small' circle active={activeTab === (index + 1)}>{defaultTitle || item.tagName}</AtTag>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default CusTabs
