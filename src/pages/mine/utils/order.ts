import { noEmpty, throttleFunc } from '@utils/decorator'
import Taro from '@tarojs/taro'
import httpRequest from '@utils/request'
import { setCartBadge } from '../../shoppingCart/utils/shopCart'

class Order {
  private urls = {
    getOrderDetail: '/api/app/order/showOrderDetail',
    getOrderList: '/api/app/order/getorderBycode',
    addOrder: '/api/app/order/add',
    deleteOrder: '/api/app/order/delOrder',
    confirmOrder: '/api/app/order/comfirmreceive',
    cancelOrder: '/api/app/order/cancel',
    getFreight: '/api/app/order/getfreight',
    payOrder: '/api/app/pay/getwxconfig',
    toRefund: '/api/app/order/newafterreturn',
    getReturnPrice: '/api/app/order/getreturnprice',
    toComment: '/api/app/order/addordercomment',
    getCommentList: '/api/app/pro/getprodcmt',
    queryTrack: '/api/app/track/querytrack',
    buyAgain: '/api/app/cart/buyone',
    // 团购
    addGroupOrder: '/api/app/grp/applypro',
    joinGroupOrder: '/api/app/grp/addorder',
    getGroupList: '/api/app/grp/getlist',
    myGroupDetail: '/api/app/grp/getdetail'
  }

  public async getOrderDetail (orderid: string) {
    const data = {
      orderid
    }
    return await httpRequest(this.urls.getOrderDetail, data)
  }

  public async buyAgain (id: string) {
    const data = {
      id
    }
    return await httpRequest(this.urls.buyAgain, data)
  }

  public async getOrderList (page: number, size: number, status: string | number = '', ordercode = '') {
    const data = {
      status,
      page,
      size,
      ordercode
    }
    return await httpRequest(this.urls.getOrderList, data, true, true, true, 'GET', () => {}, 2)
  }

  public async getGroupList (pageindex: number, pagesize: number, status: number) {
    const data = {
      status,
      pageindex,
      pagesize
    }
    return await httpRequest(this.urls.getGroupList, data, true, true, true, 'GET', () => {}, 2)
  }

  public async getCommentList (page: number, size: number, star: number, sid: number) {
    const data = {
      star,
      sid,
      page,
      size
    }
    return await httpRequest(this.urls.getCommentList, data, true, true, true, 'GET', () => {}, 2)
  }

  public async getFreight (shopid: number, skuprice: number) {
    const data = {
      shopid,
      skuprice
    }
    return await httpRequest(this.urls.getFreight, data)
  }

  public async getReturnPrice (type: number, orderdetaiparams: string, orderid: string) {
    const data = {
      type,
      orderdetaiparams,
      orderid
    }
    return await httpRequest(this.urls.getReturnPrice, data)
  }

  public async myGroupDetail (gnum: number) {
    const data = {
      gnum
    }
    return await httpRequest(this.urls.myGroupDetail, data)
  }

  public async queryTrack (orderid: number) {
    const data = {
      orderid
    }
    return await httpRequest(this.urls.queryTrack, data)
  }

  @throttleFunc(1000)
  public async deleteOrder (id: number) {
    const data = {
      id
    }
    return await httpRequest(this.urls.deleteOrder, data)
  }

  @throttleFunc(1000)
  public async confirmOrder (orderid: number) {
    const data = {
      orderid
    }
    return await httpRequest(this.urls.confirmOrder, data)
  }

  @throttleFunc(1000)
  public async cancelOrder (orderid: number, reason: string, status: number) {
    const data = {
      orderid,
      reason,
      status
    }
    return await httpRequest(this.urls.cancelOrder, data)
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  @throttleFunc(1000)
  public async toRefund (orderid: number, reason: string, skustatus: number, imgs: string, orderdetaiparams: any) {
    const data = {
      orderid,
      reason,
      orderdetaiparams,
      skustatus,
      imgs
    }
    return await httpRequest(this.urls.toRefund, data)
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  @throttleFunc(1000)
  public async toComment (orderid: number, shopid: number, commentstr: [], gooddescription: string, sellerattitude: string, logisticsspeed: string) {
    const data = {
      orderid,
      shopid,
      commentstr,
      gooddescription,
      sellerattitude,
      logisticsspeed
    }
    return await httpRequest(this.urls.toComment, data)
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  @throttleFunc(1000)
  public async addOrder (receiveaddrid: number, orderparams: string, disptype: number, datetype: number, timetype: number, invoicetype: number, scids?: string) {
    const data = {
      orderparams,
      receiveaddrid,
      disptype,
      datetype,
      timetype,
      invoicetype,
      scids,
      arrivetime: '16:00'
    }
    return await httpRequest(this.urls.addOrder, data, true, true, true, 'GET', setCartBadge)
  }

  @throttleFunc(1000)
  public async payOrder (groupnum: number, openid: number) {
    const data = {
      groupnum,
      openid
    }
    return await httpRequest(this.urls.payOrder, data)
  }

  @throttleFunc(1000)
  public async joinGroupOrder (gcount: number, skuid: number, gid: number, receiveaddrid: number, disptype: number, timetype: string, remark: number, arrivetime: string) {
    const data = {
      gcount,
      skuid,
      gid,
      remark,
      receiveaddrid,
      timetype,
      arrivetime,
      disptype
    }
    return await httpRequest(this.urls.joinGroupOrder, data)
  }

  @throttleFunc(1000)
  public async addGroupOrder (skuid: number, gid: number, gnum?: number) {
    const data = {
      skuid,
      gid,
      gnum: gnum || ''
    }
    return await httpRequest(this.urls.addGroupOrder, data)
  }


}

const order = new Order()

export default order
