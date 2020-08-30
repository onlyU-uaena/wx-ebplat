import AccountVerification from '@utils/accountVerification'
import { noEmpty, throttleFunc } from '@utils/decorator'
import Taro from '@tarojs/taro'
import httpRequest from '@utils/request'
import order from '../../mine/utils/order'

class Commodity {

  private urls = {
    getAdv: '/api/app/adverting/queryadvert',
    getSkuList: '/api/app/topic/getlist',
    getSortSku: '/api/app/pro/shopskulist',
    getSortList: '/api/app/pro/shopskulist',
    search: '/api/app/pro/shopskulist',
    gettopicsku: '/api/app/topic/gettopicsku',
    productDetail: '/api/app/pro/getprodetail',
    collect: '/api/app/pro/collectpro',
    cancelCollect: '/api/app/pro/recollectpro',
    getShop: '/api/app/shopInfo/getzuijinshop',
    getShopList: '/api/app/shopInfo/getnearshop',
    getHotShop: '/api/app/pro/gethotpro',
    getClassList: '/api/app/pro/classlist',
    getSpikeHome: '/api/app/act/indexms',
    getSpikeList: '/api/app/act/mslist',
    getGroupHome: '/api/app/act/indexgroup',
    getGroupList: '/api/app/act/groupprolist',
    getGroupImg: '/api/app/act/tgimglist',
    getSearchKeys: '/api/app/pro/getsearchkeys',
    getBrandList: '/api/app/pro/getbrands',
    getAttr: '/api/app/pro/getattrvbyid',
    getFullCutList: '/api/app/act/fullcutlist',
    getFullCutDetailImg: '/api/app/act/fullcutdetail',
    getFullCutDetailList: '/api/app/act/fullcutspulist',
    getHotPro: '/api/app/pro/gethotpromore',
    //积分商品
    getPointItem: '/api/app/pointspro/getpagelist'
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  public async getAdv (pagemark: number, shopid: number) {
    const data = {
      pagemark,
      shopid
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
    return await httpRequest(this.urls.gettopicsku, data, false, false)
  }

  public async getDetail (skuid: number, type = 0, skiid: number | string = '') {
    const data = {
      skuid,
      type,
      skiid
    }
    return await httpRequest(this.urls.productDetail, data, false)
  }

  public async getBrandList () {
    const data = {
    }
    return await httpRequest(this.urls.getBrandList, data, false)
  }

  public async getSearchKeys () {
    const data = {
    }
    return await httpRequest(this.urls.getSearchKeys, data, false)
  }

  public async getSpikeHome (shopid: number) {
    const data = {
      shopid
    }
    return await httpRequest(this.urls.getSpikeHome, data, false)
  }

  public async getSpikeList (shopid: number) {
    const data = {
      shopid
    }
    return await httpRequest(this.urls.getSpikeList, data, false)
  }

  public async getGroupList (shopid: number) {
    const data = {
      shopid
    }
    return await httpRequest(this.urls.getGroupList, data, false)
  }

  public async getGroupHome (shopid: number) {
    const data = {
      shopid
    }
    return await httpRequest(this.urls.getGroupHome, data, false)
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
    let data
    try {
      const location = await Taro.getLocation({})
      data = {
        longitude: location.longitude,
        latitude: location.latitude
      }
    } catch (e) {
      await new Promise((resolve, reject) => {
        Taro.showModal({
          title: '请打开地理位置获取权限来获取店铺信息',
          success: async function (res) {
            if (res.confirm) {
              await Taro.openSetting({
                complete: async () => {
                  let location
                  try {
                    location = await Taro.getLocation({})
                    data = {
                      longitude: location.longitude,
                      latitude: location.latitude
                    }
                  } catch (error) {
                    data = {
                      longitude: 0,
                      latitude: 0
                    }
                  }
                  resolve()
                }
              })
            } else if (res.cancel) {
              data = {
                longitude: 0,
                latitude: 0
              }
              resolve()
            }
          }
        })
      })
    }
    return await httpRequest(this.urls.getShop, data, false, false)
  }

  public async getShopList () {
    let data
    try {
      const location = await Taro.getLocation({})
      data = {
        longitude: location.longitude,
        latitude: location.latitude
      }
    } catch (e) {
      await new Promise((resolve, reject) => {
        Taro.showModal({
          title: '请打开地理位置获取权限来获取店铺信息',
          success: async function (res) {
            if (res.confirm) {
              await Taro.openSetting({
                complete: async () => {
                  let location
                  try {
                    location = await Taro.getLocation({})
                    data = {
                      longitude: location.longitude,
                      latitude: location.latitude
                    }
                  } catch (error) {
                    data = {
                      longitude: 0,
                      latitude: 0
                    }
                  }
                  resolve()
                }
              })
            } else if (res.cancel) {
              data = {
                longitude: 0,
                latitude: 0
              }
              resolve()
            }
          }
        })
      })
    }
    return await httpRequest(this.urls.getShopList, data, false)
  }

  public async getSkuList (shopid: number) {
    const data = {
      shopid
    }
    return await httpRequest(this.urls.getSkuList, data, false)
  }

  public async getFullCutList (shopid: number) {
    const data = {
      shopid
    }
    return await httpRequest(this.urls.getFullCutList, data, false)
  }

  public async getFullCutDetailImg (id: number) {
    const data = {
      id
    }
    return await httpRequest(this.urls.getFullCutDetailImg, data, false)
  }

  public async getFullCutDetailList (shopid: number, actid: number, page: number, size: number) {
    const data = {
      shopid,
      actid,
      page,
      size
    }
    return await httpRequest(this.urls.getFullCutDetailList, data, false)
  }

  public async getHotPro (shopid: number, page: number, size: number) {
    const data = {
      shopid,
      page,
      size
    }
    return await httpRequest(this.urls.getHotPro, data, false)
  }

  public async getAttr (sid: number) {
    const data = {
      sid
    }
    return await httpRequest(this.urls.getAttr, data, false)
  }

  public async getGroupImg () {
    const data = {
    }
    return await httpRequest(this.urls.getGroupImg, data, false)
  }

  // @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  public async search (field: number, shopid: number, sort: number, keys: string, brand: number | string, index: number, size: number) {
    const data = {
      shopid,
      field,
      sort,
      keys,
      brand,
      index,
      size
    }
    return await httpRequest(this.urls.search, data)
  }

  public async getSortSku (shopid = '', classid: number, index: number, size: number, field: number, sort: number) {
    const data = {
      shopid,
      classid,
      index,
      size,
      field,
      sort
    }
    return await httpRequest(this.urls.getSortSku, data)
  }

  @throttleFunc(1000)
  public async collect (sid: number) {
    const data = {
      sid
    }
    return await httpRequest(this.urls.collect, data)
  }

  @throttleFunc(1000)
  public async getPointItem (index: number, size: number) {
    const data = {
      index,
      size
    }
    return await httpRequest(this.urls.getPointItem, data)
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
