import Taro, { useState, useEffect } from '@tarojs/taro'
import { Image, Swiper, SwiperItem, Video, View } from '@tarojs/components'
import './index.scss'
import { SwiperProps } from '@tarojs/components/types/Swiper'
import { GetAdv } from '../../pages/home/utils/interface'
import { navTo } from '@utils/route'

interface Props extends SwiperProps {
  list: GetAdv[] | string[]
  marginLeft?: number
  act?: boolean
  indicatorDots?: boolean
  marginRight?: number
  imgWidth?: number
  swiperHeight?: string
  videoUrl?: string
  imgRadius?: number
  networkType?: string
  onChange?: (e) => void
  onVideoPlay?: (e) => void
  onRef?: (e) => void
}


class SwiperImg extends Taro.Component<Props, any> {

  componentDidMount(){
    if (this.props.onRef) {
      this.props.onRef(this)
    }
  }

  bannerJump = (item, act) => {
    if (item.imgurl) {
      if (item.type === 0) {
        navTo('home', 'webPage', {url: item.url})
      } else if (item.type === 2) {
        navTo('home', 'productDetails', {id: item.typeid})
      } else if (act) {
        navTo('home', 'fullCutDetail', {actId: item.id})
      }
    }
  }

  render () {
    const { list, marginLeft, indicatorDots = true, imgRadius = 15, onVideoPlay, onChange, marginRight, networkType, act, circular, autoplay, imgWidth, swiperHeight, videoUrl } = this.props
    return (
      <Swiper
        indicatorDots={indicatorDots}
        autoplay={autoplay}
        circular={circular}
        onChange={onChange ? onChange : () => {}}
        nextMargin={`${marginRight}px`}
        previousMargin={`${marginLeft}px`}
        style={{
          height: swiperHeight
        }}
      >
        {videoUrl && (
          <SwiperItem>
            <Video className='swiperImg'
                   id='video'
                   enableProgressGesture={false}
                   src={videoUrl}
                   onPlay={onVideoPlay ? onVideoPlay : () => {}}
                   controls
                   autoplay={networkType === 'wifi'}
                   style={{
                     width: '100%'
                   }}
            >
            </Video>
          </SwiperItem>
        )}
        {list && list.map((item, index) => (
          <SwiperItem key={index} onClick={() => this.bannerJump(item, act)}>
            <Image className='swiperImg'
                   src={item.imgurl || item}
                   style={{
                     borderRadius: imgRadius + 'px',
                     width: imgWidth ? `${imgWidth}%` : '100%'
                   }}
            >
            </Image>
          </SwiperItem>
        ))}
      </Swiper>
    )
  }
}

export default SwiperImg
