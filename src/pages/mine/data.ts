import colors from '../../common/styles/color'

export const firstIconList = [
  {title: '待付款', iconName: 'waitPay'},
  {title: '待收货', iconName: 'waitAccept'},
  {title: '待评价', iconName: 'waitComment'},
  {title: '退款/售后', iconName: 'refund'}
]

export const secondIconList = [
  {title: '我的收藏', iconName: 'collect', color: '', nav: {index: 'mine', name: 'myFavorites'}},
  {title: '我的拼团', iconName: 'fightTogether', color: colors.green, nav: {index: 'mine', name: 'myGroup'}},
  {title: '积分商城', iconName: 'point', color: colors.pink, nav: {index: 'mine', name: 'pointShop'}},
  {title: '足迹', iconName: 'foot', color: colors.purple, nav: {index: 'mine', name: 'myFoot'}}
]

export const thirdIconList = [
  {title: '收货地址', iconName: 'location', color: colors.pink, nav: {index: 'home', name: 'chooseAddress'}},
  {title: '设置', iconName: 'setting', color: colors.blue, nav: {index: 'mine', name: 'setting'}},
  {title: '服务反馈', iconName: 'message', color: colors.green, nav: {index: 'mine', name: 'feedback'}}
]
