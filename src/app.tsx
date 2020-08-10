import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import Index from './pages/home/index'
import store from './redux/store/index'
import './app.scss'
import './custom-theme.scss'
import commodity from './pages/home/utils/commodity'
import { loginIn, loginOut, setShop } from '@redux/actions'
import account from './pages/mine/utils/login'

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
      'pages/classification/index',
      'pages/shoppingCart/index',
      'pages/mine/index'
    ],
    subPackages:[
      {
        "root": "pages/mine/pages",
        "pages": [
          "myOrder/index",
          "coupon/index",
          "expiredCoupon/index",
          "orderDetail/index",
          "pointItem/index",
          "findPayPwd/index",
          "myFavorites/index",
          "feedback/index",
          "myFoot/index",
          "myGroup/index",
          "refund/index",
          'myMessage/index',
          "groupDetail/index",
          "messageDetail/index",
          "pointShop/index",
          "pointDetail/index",
          "pointRule/index",
          "evaluationOrder/index",
          "swapRecord/index",
          "changePassword/index",
          "payPwd/index",
          "setting/index",
          "login/index",
          "register/index",
          "profile/index",
        ]
      },{
        "root": "pages/home/pages",
        "pages": [
          'groupHome/index',
          'paySuccess/index',
          'confirmOrder/index',
          'spikeHome/index',
          'chooseShop/index',
          'chooseAddress/index',
          'modifyAddress/index',
          'addAddress/index',
          'productDetails/index',
          'search/index',
          'searchResult/index',
        ]
      }
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

  async getShop () {
    const shopRes = await commodity.getShop()
    store.dispatch(setShop(shopRes.data))
  }

  async autoLogin () {
    if (!Taro.getStorageSync('token'))
      return
    const { code, data } = await account.getUserData()
    if (!code) {
      store.dispatch(loginIn(data))
    } else {
      store.dispatch(loginOut())
    }
  }

  componentDidMount () {
    this.getShop()
    this.autoLogin()
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
