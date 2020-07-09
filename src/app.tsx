import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import 'taro-ui/dist/style/index.scss'
import Index from './pages/home/index'
import store from './redux/store/index'
import './app.scss'
import './common/styles/icon.scss'

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */

  config: Config = {
    pages: [
      'pages/home/index',
      'pages/mine/pages/login/index',
      'pages/mine/index'
    ],
    tabBar: {
      "list": [{
        "pagePath": "pages/home/index",
        "text": "首页"
      },{
        "pagePath": "pages/mine/index",
        "text": "我的"
      }]
    },
    window: {
      // backgroundTextStyle: 'light',
      // navigationBarBackgroundColor: '#fff',
      // navigationBarTitleText: 'WeChat',
      // navigationBarTextStyle: 'black',
      navigationStyle: "custom"
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
