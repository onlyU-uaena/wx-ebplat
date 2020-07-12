import Taro, { useState, useReachBottom, useImperativeHandle } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'

interface Props {
  onRef: (ref: any) => void
}

export interface FreshListInterface {
  refreshList: () => void
  nextPage: () => void
}

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
    return (
      <View>

      </View>
    )
  }
}

export default FreshList
