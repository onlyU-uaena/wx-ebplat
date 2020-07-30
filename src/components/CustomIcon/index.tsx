import Taro, { useState } from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { CSSProperties } from 'react'
import { AtBadge } from 'taro-ui'

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
      onClick={event => event.stopPropagation()}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
      }}
    >
      <AtBadge value={dotNumber} dot={showDot}>
        <View
          onClick={onClick}
          className={`fa fa-${name}`}
          style={{
            position: 'relative',
            top: '-1.5px',
            fontSize: (size || 14) + 'px',
            color: color || '',
            ...style
          }}
        />
      </AtBadge>
    </View>
  )
}

export default CustomIcon
