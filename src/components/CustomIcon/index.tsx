import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { CSSProperties } from 'react'

interface Props {
  size?: number
  color?: string
  name: string
  onClick?: () => void
  style?: CSSProperties
}

const CustomIcon: Taro.FC<Props> = (props) => {
  const {size, color, name, onClick, style} = props

  return (
    <View
      onClick={onClick}
      className={`fa fa-${name}`}
      style={{
        fontSize: size + 'px',
        color: color,
        ...style
      }}
    />
  )
}

export default CustomIcon
