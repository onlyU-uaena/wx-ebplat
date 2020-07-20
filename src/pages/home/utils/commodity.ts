import AccountVerification from '@utils/accountVerification'
import { noEmpty, throttleFunc } from '@utils/decorator'
import Taro from '@tarojs/taro'
import httpRequest from '@utils/request'

class Commodity extends AccountVerification {
  constructor() {
    super()
  }

  private urls = {
    getAdv: '/api/app/adverting/queryadvert',
    getSkuList: '/api/app/topic/getlist',
    search: '/api/app/pro/checkgoodsName',
    gettopicsku: '/api/app/topic/gettopicsku',
    productDetail: '/api/app/pro/getprodetail',
    collect: '/api/app/pro/collectpro',
    cancelCollect: '/api/app/pro/recollectpro',
    getShop: '/api/app/shopInfo/getzuijinshop',
    getHotShop: '/api/app/pro/gethotpro',
    getClassList: '/api/app/pro/classlist'
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  public async getAdv (pagemark: number) {
    const data = {
      pagemark: pagemark
    }
    return await httpRequest(this.urls.getAdv, data, false)
  }

  public async getTopicSku (topicid: number | string = '', shopid: number, page: number, size: number) {
    const data = {
      topicid,
      shopid,
      page,
      size
    }
    return await httpRequest(this.urls.gettopicsku, data, false)
  }

  public async getDetail (skuid: number, type = 0, skiid: number | string = '') {
    const data = {
      skuid,
      type,
      skiid
    }
    return await httpRequest(this.urls.productDetail, data, false)
  }

  public async getClassList (num = '') {
    const data = {
      num
    }
    return await httpRequest(this.urls.getClassList, data, false)
  }

  public async getHotShop (shopid: number) {
    const data = {
      shopid
    }
    return await httpRequest(this.urls.getHotShop, data, false)
  }

  public async getShop () {
    const location = await Taro.getLocation({})
    const data = {
      longitude: location.longitude,
      latitude: location.latitude
    }
    return await httpRequest(this.urls.getShop, data, false)
  }

  public async getSkuList (shopid: number) {
    const data = {
      shopid
    }
    return await httpRequest(this.urls.getSkuList, data, false)
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  @throttleFunc(1000)
  public async search (goodsname: string, shopid = '') {
    const data = {
      shopid, goodsname
    }
    return await httpRequest(this.urls.search, data)
  }

  @throttleFunc(1000)
  public async collect (sid: number) {
    const data = {
      sid
    }
    return await httpRequest(this.urls.collect, data)
  }

  @throttleFunc(1000)
  public async cancelCollect (sid: number) {
    const data = {
      sid
    }
    return await httpRequest(this.urls.cancelCollect, data)
  }

}

const commodity = new Commodity()

export default commodity
