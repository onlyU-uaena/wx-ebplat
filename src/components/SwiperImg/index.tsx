import Taro, { useState } from '@tarojs/taro'
import { Image, Swiper, SwiperItem, View } from '@tarojs/components'
import './index.scss'
import { SwiperProps } from '@tarojs/components/types/Swiper'

interface Props extends SwiperProps {
  imgUrl: string[]
  marginLeft?: number
  marginRight?: number
  imgWidth?: number
  swiperHeight?: string
}

const SwiperImg: Taro.FC<Props> = (props) => {
  const { imgUrl, marginLeft, marginRight, circular, autoplay, imgWidth, swiperHeight } = props

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
      {imgUrl ? imgUrl.map((item, index) => (
        <SwiperItem key={index}>
          <Image className='swiperImg'
            src={item}
            style={{
              width: imgWidth ? `${imgWidth}%` : '100%'
            }}
          >
          </Image>
        </SwiperItem>
      )) : null}
    </Swiper>
  )
}

export default SwiperImg
