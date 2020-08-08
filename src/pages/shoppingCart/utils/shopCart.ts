import { noEmpty, throttleFunc } from '@utils/decorator'
import Taro from '@tarojs/taro'
import httpRequest from '@utils/request'
import store from '@redux/store'
import { setCartNum } from '@redux/actions'

export const setCartBadge = async (shopid) => {
  if (!shopid) {
    return
  }
  const state = store.getState()
  const {data} = await shopCart.getCart(state.shopState.shopData.shopid || shopid)
  if (data.shops.length) {
    store.dispatch(setCartNum(data.shops[0].spuscd.length))
    Taro.setTabBarBadge({
      index: 2,
      text: `${data.shops[0].spuscd.length}`
    })
  } else {
    store.dispatch(setCartNum(0))
    Taro.removeTabBarBadge({
      index: 2
    })
  }
}

class ShopCart {

  private urls = {
    addCart: '/api/app/cart/addCart',
    getCart: '/api/app/cart/getCartList',
    changeSelect: '/api/app/cart/selCartList',
    changeNum: '/api/app/cart/changeCount',
    deleteItem: '/api/app/cart/deleCartSpuList'
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  @throttleFunc(1000)
  public async addCart (sid: number, proid: number, procount: number, type: number, addtype: number, actid: number | string = '') {
    const data = {
      sid,
      proid,
      procount,
      type,
      addtype,
      actid,
      latitude: '37.895693',
      longitude: '112.583698'
    }
    return await httpRequest(this.urls.addCart, data, true, true, true, 'GET', setCartBadge)
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  @throttleFunc(500)
  public async changeSelect (ids: number[], sels: string) {
    const data = {
      ids: ids.toString(),
      sels
    }
    return await httpRequest(this.urls.changeSelect, data)
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  @throttleFunc(500)
  public async changeNum (id: number, count: number) {
    const data = {
      id,
      count
    }
    return await httpRequest(this.urls.changeNum, data)
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  @throttleFunc(500)
  public async deleteItem (ids: number[]) {
    const data = {
      ids: ids.toString()
    }
    return await httpRequest(this.urls.deleteItem, data, true, true, true, 'GET', setCartBadge)
  }

  public async getCart (shopid) {
    const data = {
      shopid
    }
    return await httpRequest(this.urls.getCart, data)
  }
}

const shopCart = new ShopCart()

export default shopCart
