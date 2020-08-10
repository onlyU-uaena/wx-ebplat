import Taro from '@tarojs/taro'
import { connect, useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtListItem, AtSearchBar } from 'taro-ui'
import commodity from '../../pages/home/utils/commodity'
import { RootState } from '@redux/reducers'
import store from '@redux/store'

interface Props {
  showActionButton?: boolean
  focus?: boolean
  onChangeResult: (e: any) => void
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
    let list = Taro.getStorageSync('historySearch') || []
    list.push(this.state.value)
    list = Array.from(new Set(list))
    Taro.setStorageSync('historySearch', list)
    const state = store.getState()
    const {code, data} = await commodity.search(0, state.shopState.shopData.shopid, 1, this.state.value, 1, 10000)
    if (code === 0) {
      this.props.onChangeResult(data)
    }
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
          onConfirm={this.search.bind(this)}
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
