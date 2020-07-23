import { noEmpty, throttleFunc } from '@utils/decorator'
import Taro from '@tarojs/taro'
import httpRequest from '@utils/request'

class Address {
  private urls = {
    addAddress: '/api/app/receiver/addReceiverAddr',
    getPlaces: '/api/app/addr/getplaces',
    getAddress: '/api/app/receiver/selectAddrByUserId',
    modifyAddress: '/api/app/receiver/updateAddr',
    setDefault: '/api/app/receiver/updateAddrDefault',
    removeAddress: '/api/app/receiver/delReceiverAddr'
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  @throttleFunc(1000)
  public async addAddress (name: string, mobile: string, provinceCode: string, cityCode: string, areaCode: string, provinceName: string, cityName: string, areaName: string, address: string, isDefault: string, latitude: string, longitude: string) {
    const data = {
      name,
      mobile,
      areaCode,
      provinceCode,
      provinceName,
      cityCode,
      cityName,
      address,
      areaName,
      isDefault,
      latitude,
      longitude
    }
    return await httpRequest(this.urls.addAddress, data)
  }

  public async getPlaces () {
    return await httpRequest(this.urls.getPlaces, {})
  }

  public async getAddress () {
    return await httpRequest(this.urls.getAddress, {})
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  @throttleFunc(1000)
  public async setDefault (id: number) {
    const data = {
      id
    }
    return await httpRequest(this.urls.setDefault, data)
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  @throttleFunc(1000)
  public async removeAddress (id: number) {
    const data = {
      id
    }
    return await httpRequest(this.urls.removeAddress, data)
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  @throttleFunc(1000)
  public async modifyAddress (id: number, name: string, mobile: string, provinceCode: string, cityCode: string, areaCode: string, provinceName: string, cityName: string, areaName: string, address: string, isDefault: string, latitude: string, longitude: string) {
    const data = {
      name,
      id,
      mobile,
      areaCode,
      provinceCode,
      provinceName,
      cityCode,
      cityName,
      address,
      areaName,
      isDefault,
      latitude,
      longitude
    }
    return await httpRequest(this.urls.modifyAddress, data)
  }
}

const address = new Address()

export default address
