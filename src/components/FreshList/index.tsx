import Taro, { useState, useReachBottom, useImperativeHandle } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import CardCommodity from '../CardCommodity'

interface Props {
  onRef: (ref: any) => void
  beRenderList: any
}

export interface FreshListInterface {
  refreshList: () => void
  nextPage: () => void
}

// 触底自动更新列表

class FreshList extends Taro.Component<Props, any> implements FreshListInterface{
  componentDidMount(){
    this.props.onRef(this)
  }

  refreshList = () => {

  }

  nextPage = () => {
    console.log('next')
  }

  render () {
    const { beRenderList } = this.props
    return (
      <View className='commonRowFlex' style={{
        flexWrap: 'wrap',
        justifyContent: 'space-between'
      }}
      >
        {beRenderList && beRenderList.map((item, index) => (
          <CardCommodity key={index} imgUrl={item.imgUrl} title={item.name} price={item.price} oldPrice={item.oldPrice} />
        ))}
      </View>
    )
  }
}

export default FreshList
