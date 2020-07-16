import Taro, { useState } from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { CSSProperties } from 'react'

interface Props {
  size?: number
  color?: string
  name: string
  onClick?: () => void
  style?: CSSProperties
  showDot?: boolean
  dotNumber?: number
}

const CustomIcon: Taro.FC<Props> = (props) => {
  const {size, color, name, onClick, style, showDot, dotNumber} = props

  return (
    <View
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
      }}
    >
      {(showDot && dotNumber) ? (
        <View className='noNumDot'>
          <Text className='smallText boldText' style={{color: 'red'}}>{dotNumber}</Text>
        </View>
      ) : showDot ? (
        <View className='dot' >
        </View>
      ) : null}
      <View
        onClick={onClick}
        className={`fa fa-${name}`}
        style={{
          fontSize: (size || 14) + 'px',
          color: color || '',
          ...style
        }}
      />
    </View>
  )
}

export default CustomIcon
