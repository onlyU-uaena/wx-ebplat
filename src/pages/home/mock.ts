import { Comment } from './utils/interface'

export const classificationList = [
  {name: '时令水果', img: 'http://www.gx8899.com/uploads/allimg/160825/3-160R5093948-52.jpg'},
  {name: '新鲜蔬菜', img: 'http://www.gx8899.com/uploads/allimg/160825/3-160R5093948-52.jpg'},
  {name: '肉蛋水产', img: 'http://www.gx8899.com/uploads/allimg/160825/3-160R5093948-52.jpg'},
  {name: '快手美食', img: 'http://www.gx8899.com/uploads/allimg/160825/3-160R5093948-52.jpg'}
]

export const imgList = [
  'https://qq.yh31.com/tp/fj/201903192118302864.jpg',
  'https://qq.yh31.com/tp/fj/201903192118302864.jpg'
]

export const spikeList = [
  {imgUrl: 'https://jdc.jd.com/img/200', price: 5, oldPrice: 10},
  {imgUrl: 'https://jdc.jd.com/img/200', price: 5, oldPrice: 10},
]

export const fightTogether = [
  {imgUrl: 'https://jdc.jd.com/img/200', person: 5, price: 10.2},
  {imgUrl: 'https://jdc.jd.com/img/200', person: 5, price: 10.9},
]

export const hotShopping = [
  {imgUrl: 'https://jdc.jd.com/img/200', price: 5.2, oldPrice: 10.4, name: '测试商品'},
  {imgUrl: 'https://jdc.jd.com/img/200', price: 5, oldPrice: 10, name: '测试商品'},
  {imgUrl: 'https://jdc.jd.com/img/200', price: 5, oldPrice: 10, name: '测试商品'},
  {imgUrl: 'https://jdc.jd.com/img/200', price: 5, oldPrice: 10, name: '测试商品'},
  {imgUrl: 'https://jdc.jd.com/img/200', price: 5, oldPrice: 10, name: '测试商品'},
  {imgUrl: 'https://jdc.jd.com/img/200', price: 5, oldPrice: 10, name: '测试商品'}
]

export const tabs = [
  {title: '全部', desc: '精选好物'},
  {title: '全部', desc: '精选好物'},
  {title: '全部', desc: '精选好物'},
  {title: '全部', desc: '精选好物'},
  {title: '全部', desc: '精选好物'},
  {title: '全部', desc: '精选好物'}
]

export const commodityList = [
  {imgUrl: 'https://jdc.jd.com/img/200', price: 5, oldPrice: 10, name: '测试商品'},
  {imgUrl: 'https://jdc.jd.com/img/200', price: 5, oldPrice: 10, name: '测试商品'},
]

export const cmts: Comment[] = [
  {
    id: 1,
    star: 4,
    username: '测试',
    title: '12',
    createtime: '123',
    content: '测试谁是谁',
    ShowImgList: [
      {imgurl: 'https://jdc.jd.com/img/200', id: 2},
      // {imgurl: 'https://jdc.jd.com/img/200', id: 22},
      // {imgurl: 'https://jdc.jd.com/img/200', id: 4}
    ]
  }
]
