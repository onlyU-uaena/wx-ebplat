import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtListItem, AtSearchBar } from 'taro-ui'
import commodity from '../../pages/home/utils/commodity'

interface Props {
  showActionButton?: boolean
  focus?: boolean
}

class CusSearchBar extends Taro.Component<Props, any> {

  state = {
    value: '',
    showIndex: true
  }

  onChange (value) {
    this.setState({
      value: value
    })
  }

  changeIndex (value) {
    this.setState({
      showIndex: value.type !== 'blur'
    })
  }

  async search () {
    const {data} = await commodity.search(this.state.value, '-1')

  }

  render () {
    return (
      <View>
        <AtSearchBar
          actionName='搜索'
          placeholder='请输入关键字'
          focus={this.props.focus}
          onBlur={this.changeIndex.bind(this)}
          onFocus={this.changeIndex.bind(this)}
          showActionButton={this.props.showActionButton}
          value={this.state.value}
          onChange={this.onChange.bind(this)}
          onActionClick={this.search.bind(this)}
        />
        {/*搜索建议*/}
        {/*{this.state.showIndex &&*/}
        {/*<View style={{*/}
        {/*  position: 'relative'*/}
        {/*}}*/}
        {/*>*/}
        {/*  <View style={{*/}
        {/*    position: 'absolute',*/}
        {/*    width: '100%',*/}
        {/*    padding: '0 16px',*/}
        {/*    boxSizing: 'border-box',*/}
        {/*    backgroundColor: 'white',*/}
        {/*    zIndex: 99*/}
        {/*  }}*/}
        {/*  >*/}
        {/*    <View className='borderBottom'*/}
        {/*          style={{*/}
        {/*            padding: '8px 0'*/}
        {/*          }}*/}
        {/*    >*/}
        {/*      <Text className='mediumText'>123</Text>*/}
        {/*    </View>*/}
        {/*    <View className='borderBottom'*/}
        {/*          style={{*/}
        {/*            padding: '8px 0'*/}
        {/*          }}*/}
        {/*    >*/}
        {/*      <Text className='mediumText'>123</Text>*/}
        {/*    </View>*/}
        {/*  </View>*/}
        {/*</View>}*/}
      </View>
    )
  }
}

export default CusSearchBar
