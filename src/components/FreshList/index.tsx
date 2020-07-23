import Taro, { useState, useReachBottom, useImperativeHandle } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import CardCommodity from '../CardCommodity'
import commodity from '../../pages/home/utils/commodity'
import { GetTopicSku } from '../../pages/home/utils/interface'

interface Props {
  onRef: (ref: any) => void
  shopid?: any
  topicId?: number
  beRenderList?: GetTopicSku[]
  hurdle?: boolean
  dispatchListFunc: (page: number, size: number, topicid: number, shopId?: number) => any
  onShopCart?: () => void
}

export interface FreshListInterface {
  refreshList: () => void
  nextPage: () => void
}

// 触底自动更新列表

class FreshList extends Taro.Component<Props, any> implements FreshListInterface{

  static defaultProps = {
    beRenderList: []
  }

  state = {
    showPage: false,
    page: 1,
    list: [],
    size: 14
  }

  componentDidMount(){
    this.props.onRef(this)
    this.initGetList()
  }

  async initGetList () {
    this.setState({
      showPage: false
    })
    if (this.props.shopid) {
      const {data} = await this.props.dispatchListFunc(this.state.page, this.state.size, this.props.topicId, this.props.shopid)
      this.setState({
        page: 2,
        list: data
      })
    } else {
      const {data} = await this.props.dispatchListFunc(this.state.page, this.state.size)
      this.setState({
        page: 2,
        list: data
      })
    }
    this.setState({
      showPage: true
    })
  }

  refreshList = async () => {
    if (this.props.shopid) {
      const {data} = await this.props.dispatchListFunc(1, this.state.size, this.props.topicId, this.props.shopid)
      this.setState({
        page: 2,
        list: data
      })
    } else {
      const {data} = await this.props.dispatchListFunc(1, this.state.size)
      this.setState({
        page: 2,
        list: data
      })
    }
  }

  nextPage = async () => {
    if (this.props.shopid) {
      const {data} = await this.props.dispatchListFunc(this.state.page, this.state.size, this.props.topicId, this.props.shopid)
      if (!data.length)
        return
      this.setState({
        page: this.state.page + 1,
        list: this.state.list.concat(data)
      })
      console.log('next', this.state.list)
    } else {
      const {data} = await this.props.dispatchListFunc(this.state.page, this.state.size)
      if (!data.length)
        return
      this.setState({
        page: this.state.page + 1,
        list: this.state.list.concat(data)
      })
      console.log('next', this.state.list)
    }
  }

  render () {
    const { beRenderList, hurdle, onShopCart } = this.props
    const {list, showPage} = this.state
    return (
      <View>{showPage && <View>
        {hurdle ? (
          <View>
            {list && list.map((item, index) => (
              <CardCommodity onShopCart={onShopCart} key={index} proId={item.id} hurdle imgUrl={item.imgurl} title={item.name} desc={item.num || item.subtitle} price={item.price} oldPrice={item.oldPrice || ''} />
            ))}
          </View>
        ) : (
          <View className='commonRowFlex' style={{
            flexWrap: 'wrap',
            justifyContent: 'space-between'
          }}
          >
            {list && list.map((item, index) => (
              <CardCommodity onShopCart={onShopCart} key={index} proId={item.id} imgUrl={item.imgurl} title={item.name} price={item.price} oldPrice={item.oldPrice || ''} />
            ))}
          </View>
        )}
      </View>}
      </View>
    )
  }
}

export default FreshList
