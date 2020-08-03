import { noEmpty, throttleFunc } from '@utils/decorator'
import Taro from '@tarojs/taro'
import httpRequest from '@utils/request'

class User {
  private urls = {
    changePassword: '/api/app/userinfo/findPwd',
    setPayPwd: '/api/app/userinfo/setpayPwd',
    updatePayPwd: '/api/app/userinfo/updpayPwd',
    addFeedback: 'api/app/userinfo/addFeedBack',
    queryassets: '/api/app/userinfo/queryassets',
    getFoot: '/api/app/userinfo/browseHistory',
    getMessageCount: '/api/app/messages/getMessageCount',
    getMessageList: '/api/app/messages/queryMessages',
    getMessageDetail: '/api/app/messages/getMessagesById',
    getCollect: '/api/app/userinfo/getcollectspu',
    deleteCollect: '/api/app/userinfo/deletecollect',
    //优惠券
    getWaitedCoupon: '/api/app/coupon/getCouponList',
    takeCoupon: '/api/app/coupon/takeCoupon',
    getCoupon: '/api/app/coupon/showCoupon',
    getOrderCoupon: '/api/app/coupon/getOrderCoupon',
    getCouponCount: '/api/app/coupon/couponCount',
    swapCoupon: '/api/app/coupon/takeCoupon',
    // 微信接口
    wxAuth: '/api/app/ys/auth',
    wxRegister: '/api/app/userinfo/wxregister',
    wxLogin: '/api/app/userinfo/wxlogin'
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  @throttleFunc(1000)
  public async changePassword (mobile: string, sms: string, password: string, passwordagin: string) {
    const data = {
      mobile,
      sms,
      password,
      passwordagin
    }
    return await httpRequest(this.urls.changePassword, data)
  }

  public async queryassets () {
    const data = {
    }
    return await httpRequest(this.urls.queryassets, data)
  }

  public async getMessageCount (status: number, receType: number) {
    const data = {
      status, receType
    }
    return await httpRequest(this.urls.getMessageCount, data)
  }

  public async getMessageList () {
    const data = {
    }
    return await httpRequest(this.urls.getMessageList, data)
  }

  public async getMessageDetail (id: number) {
    const data = {
      id
    }
    return await httpRequest(this.urls.getMessageDetail, data, false)
  }

  public async getFoot (pageindex: number, pagesize: number) {
    const data = {
      pageindex,
      pagesize
    }
    return await httpRequest(this.urls.getFoot, data)
  }

  public async getCollect (pageindex: number, pagesize: number) {
    const data = {
      pageindex,
      pagesize
    }
    return await httpRequest(this.urls.getCollect, data)
  }

  public async getCoupon (type: number, page: number, size: number) {
    const data = {
      type,
      page,
      size
    }
    return await httpRequest(this.urls.getCoupon, data)
  }

  public async getCouponCount () {
    const data = {
    }
    return await httpRequest(this.urls.getCouponCount, data)
  }

  public async getOrderCoupon (paramstr) {
    const data = {
      paramstr
    }
    return await httpRequest(this.urls.getOrderCoupon, data)
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  @throttleFunc(1000)
  public async swapCoupon (couponid) {
    const data = {
      couponid
    }
    return await httpRequest(this.urls.swapCoupon, data)
  }

  public async deleteCollect (ids: string) {
    const data = {
      ids
    }
    return await httpRequest(this.urls.deleteCollect, data)
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  @throttleFunc(1000)
  public async updatePayPwd (oldpwd: string, pwd: string, repwd: string) {
    const data = {
      oldpwd,
      pwd,
      repwd
    }
    return await httpRequest(this.urls.updatePayPwd, data)
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  @throttleFunc(1000)
  public async wxAuth (code: string) {
    const data = {
      code
    }
    return await httpRequest(this.urls.wxAuth, data, false, true, false)
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  @throttleFunc(1000)
  public async wxRegister (openid: string, nickname: string, imgurl: string) {
    const data = {
      openid,
      nickname,
      imgurl
    }
    return await httpRequest(this.urls.wxRegister, data)
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  @throttleFunc(1000)
  public async wxLogin (openid: string) {
    const data = {
      openid
    }
    return await httpRequest(this.urls.wxLogin, data)
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  @throttleFunc(1000)
  public async setPayPwd (pwd: string, repwd: string, ) {
    const data = {
      pwd,
      repwd
    }
    return await httpRequest(this.urls.setPayPwd, data)
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  @throttleFunc(1000)
  public async addFeedback (content: string, mobile: string, ) {
    const data = {
      content,
      mobile
    }
    return await httpRequest(this.urls.addFeedback, data)
  }
}

const user = new User()

export default user
