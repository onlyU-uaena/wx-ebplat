import { noEmpty, throttleFunc } from '@utils/decorator'
import Taro from '@tarojs/taro'
import httpRequest from '@utils/request'
import { setCartBadge } from '../../shoppingCart/utils/shopCart'

class Order {
  private urls = {
    getOrderList: '/api/app/order/getorderBycode',
    addOrder: '/api/app/order/add',
    deleteOrder: '/api/app/order/delOrder',
    confirmOrder: '/api/app/order/comfirmreceive',
    cancelOrder: '/api/app/order/cancel',
    getFreight: '/api/app/order/getFreightByShop',
    payOrder: '/api/app/pay/getwxconfig',
    toRefund: '/api/app/order/afterreturn',
    toComment: '/api/app/order/addordercomment',
    // 团购
    addGroupOrder: '/api/app/grp/applypro',
    joinGroupOrder: '/api/app/grp/addorder',
    getGroupList: '/api/app/grp/getlist',
    myGroupDetail: '/api/app/grp/getdetail'
  }

  public async getOrderList (page: number, size: number, status: string | number = '', ordercode = '') {
    const data = {
      status,
      page,
      size,
      ordercode
    }
    return await httpRequest(this.urls.getOrderList, data)
  }

  public async getGroupList (pageindex, pagesize) {
    const data = {
      pageindex,
      pagesize
    }
    return await httpRequest(this.urls.getGroupList, data)
  }

  public async getFreight (shopid: number, procount: number, proprice: number) {
    const data = {
      shopid,
      procount,
      proprice
    }
    return await httpRequest(this.urls.getFreight, data)
  }

  public async myGroupDetail (gnum: number) {
    const data = {
      gnum
    }
    return await httpRequest(this.urls.myGroupDetail, data)
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
  public async toRefund (orderid: number, reason: string, skustatus: number, imgs: string) {
    const data = {
      orderid,
      reason,
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
  public async joinGroupOrder (skuid: number, gid: number, receiveaddrid: number, disptype: number, timetype: string, remark: number, arrivetime: string) {
    const data = {
      skuid,
      gid,
      remark,
      receiveaddrid,
      timetype,arrivetime
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
