import Taro, { useState, useEffect } from '@tarojs/taro'
import { Image, Swiper, SwiperItem, View } from '@tarojs/components'
import './index.scss'
import { SwiperProps } from '@tarojs/components/types/Swiper'
import { GetAdv } from '../../pages/home/utils/interface'

interface Props extends SwiperProps {
  list: GetAdv[] | string[]
  marginLeft?: number
  marginRight?: number
  imgWidth?: number
  swiperHeight?: string
}

const SwiperImg: Taro.FC<Props> = (props) => {
  const { list, marginLeft, marginRight, circular, autoplay, imgWidth, swiperHeight } = props

  return (
    <Swiper
      indicatorDots
      autoplay={autoplay}
      circular={circular}
      nextMargin={`${marginRight}px`}
      previousMargin={`${marginLeft}px`}
      style={{
        height: swiperHeight
      }}
    >
      {list && list.map((item, index) => (
        <SwiperItem key={index}>
          <Image className='swiperImg'
            src={item.list[0].imgurl || item}
            style={{
              width: imgWidth ? `${imgWidth}%` : '100%'
            }}
          >
          </Image>
        </SwiperItem>
      ))}
    </Swiper>
  )
}

export default SwiperImg
