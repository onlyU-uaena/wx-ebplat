import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import Index from './pages/home/index'
import store from './redux/store/index'
import './app.scss'
import './custom-theme.scss'

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
      'pages/mine/pages/myOrder/index',
      'pages/mine/pages/orderDetail/index',
      'pages/mine/pages/setting/index',
      'pages/shoppingCart/index',
      'pages/home/pages/confirmOrder/index',
      'pages/home/pages/chooseAddress/index',
      'pages/home/pages/modifyAddress/index',
      'pages/home/pages/addAddress/index',
      'pages/home/pages/productDetails/index',
      'pages/home/pages/search/index',
      'pages/home/pages/searchResult/index',
      'pages/mine/index',
      'pages/mine/pages/login/index',
      'pages/mine/pages/register/index',
      'pages/mine/pages/profile/index',
      'pages/classification/index'
    ],
    tabBar: {
      selectedColor: "#CB4842",
      list: [{
        pagePath: "pages/home/index",
        text: "首页",
        iconPath: 'images/home.png',
        selectedIconPath: 'images/homeSelect.png'
      },{
        pagePath: "pages/classification/index",
        text: "分类",
        iconPath: 'images/classification.png',
        selectedIconPath: 'images/classificationSelect.png'
      },{
        pagePath: "pages/shoppingCart/index",
        text: "购物车",
        iconPath: 'images/shop.png',
        selectedIconPath: 'images/shopSelect.png'
      },{
        pagePath: "pages/mine/index",
        text: "我的",
        iconPath: 'images/mine.png',
        selectedIconPath: 'images/mineSelect.png'
      }]
    },
    permission: {
      "scope.userLocation": {
        "desc": "你的位置信息将用于向您展示个性化的内容"
      }
    },
    window: {
      // backgroundTextStyle: 'light',
      // navigationBarBackgroundColor: '#fff',
      // navigationBarTitleText: 'WeChat',
      // navigationBarTextStyle: 'black',
      navigationStyle: "custom"
    }
  }

  componentDidMount () {

  }

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
