import { noEmpty, throttleFunc } from '@utils/decorator'
import Taro from '@tarojs/taro'
import httpRequest from '@utils/request'

class Order {
  private urls = {
    getOrderList: '/api/app/order/getorderBycode',
    addOrder: '/api/app/order/add',
    deleteOrder: '/api/app/order/delOrder',
    confirmOrder: '/api/app/order/receiveOrder',
    cancelOrder: '/api/app/order/cancel',
    getFreight: '/api/app/order/getFreightByShop',
    payOrder: '/api/app/pay/wechatpay'
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

  public async getFreight (shopid: number, procount: number, proprice: number) {
    const data = {
      shopid,
      procount,
      proprice
    }
    return await httpRequest(this.urls.getFreight, data)
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
  public async addOrder (receiveaddrid: number, orderparams: string, disptype: number, datetype: number, timetype: number, invoicetype: number, scids?: number) {
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
    return await httpRequest(this.urls.addOrder, data)
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  @throttleFunc(1000)
  public async payOrder (groupnum: number) {
    const data = {
      groupnum
    }
    return await httpRequest(this.urls.payOrder, data)
  }


}

const order = new Order()

export default order
