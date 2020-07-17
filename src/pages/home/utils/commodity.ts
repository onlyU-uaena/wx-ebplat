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
    search: '/api/app/pro/checkgoodsName'
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  public async getAdv (pagemark: number) {
    const data = {
      pagemark: pagemark
    }
    return await httpRequest(this.urls.getAdv, data)
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  @throttleFunc(1000)
  public async search (goodsname: string, shopid: string = '') {
    const data = {
      shopid, goodsname
    }
    return await httpRequest(this.urls.search, data)
  }

}

const commodity = new Commodity()

export default commodity
