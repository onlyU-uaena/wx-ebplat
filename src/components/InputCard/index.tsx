import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import CustomIcon from '../CustomIcon'
import { ITouchEvent } from '@tarojs/components/types/common'

interface Props {
  title: string
  onClick?: (e: ITouchEvent) => void
  rightTitle?: string
  renderRight?: any
  link?: boolean
}

class InputCard extends Taro.Component<Props, any> {

  render () {
    const {title, rightTitle, onClick, renderRight, link = true} = this.props

    return (
      <View className='commonRowFlex flexCenter normalPadding borderBottom'
            hoverClass='buttonHover'
            onClick={onClick ? onClick : () => {}}
            style={{
              backgroundColor: 'white',
              justifyContent: 'space-between'
            }}
      >
        <Text className='mediumText'>{title}</Text>
        <View className='commonRowFlex flexCenter'>
          {renderRight()}
          {rightTitle && <Text className='grayText mediumText'>{rightTitle}</Text>}
          {link &&
          <View className='smallMarginLeft horMirror'>
            <CustomIcon name='back' color='gray' />
          </View>}
        </View>
      </View>
    )
  }
}

export default InputCard
