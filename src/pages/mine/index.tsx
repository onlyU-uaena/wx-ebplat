import Taro, { useState } from "@tarojs/taro"
import { View, Image, Text, Button } from '@tarojs/components'
import { AtDivider, AtIcon } from 'taro-ui'
import './index.scss'
import '../../common/styles/style.scss'
import colors from '../../common/styles/color'

interface Props {

}

const Mine: Taro.FC<Props> = () => {
  const renderButtonGroup = () => {
    const label = [
      {icon: 'order', title: '我的订单'},
      {icon: 'compass', title: '我的动态'},
      {icon: 'bag', title: '积分商城'},
      {icon: 'coupon', title: '优惠券'}
    ]

    return (
      <View className='buttonGroup commonRowFlex'>
        {label.map((item, index) => (
          <View hover-class='buttonHover' hover-start-time={0} hover-stay-time={100} key={index} className='commonColumnFlex'>
            <AtIcon prefixClass='fa' value={item.icon} size={25} color={colors.dark} />
            <Text className='headerText' style={{color: colors.gray}}>{item.title}</Text>
          </View>
        ))}
      </View>
    )
  }

  return (
    <View className='container'>
      <View className='header'>
        <Image
          className='icon'
          src={require(`../../assets/logo.png`)}
        />
        <View className='commonRowFlex' style={{marginTop: '8px'}}>
          <Text className='nameText'>韩世墨</Text>
          <AtIcon prefixClass='fa' value='medal' size='15' color={colors.skyBlue} />
        </View>
        <Text className='headerText' style={{color: colors.gray}}>/ Voss以点滴浸润美好人生 /</Text>
        <Button className='signInButton'>签到</Button>
      </View>
      {renderButtonGroup()}
      <View style={{paddingLeft: '32px', paddingRight: '32px'}}>
        <AtDivider lineColor={colors.gray} height='.5px' />
      </View>
    </View>
  )
}

export default Mine
