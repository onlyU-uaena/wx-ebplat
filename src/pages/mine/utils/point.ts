import { noEmpty, throttleFunc } from '@utils/decorator'
import Taro from '@tarojs/taro'
import httpRequest from '@utils/request'

class Point {
  private urls = {
    getPointRule: 'api/app/checkin/pointsrule',
    swapItem: 'api/app/pointspro/addpointgoodorder',
    getSwapOrder: 'api/app/pointspro/getptorderlist',
    getGoodDetail: '/api/app/pointspro/getgoodinfo'
  }

  public async getPointRule () {
    const data = {
    }
    return await httpRequest(this.urls.getPointRule, data)
  }

  public async getGoodDetail (gid: string) {
    const data = {
      gid
    }
    return await httpRequest(this.urls.getGoodDetail, data)
  }

  public async getSwapOrder (pageindex: number, pagesize: number) {
    const data = {
      pageindex,
      pagesize
    }
    return await httpRequest(this.urls.getSwapOrder, data)
  }

  @throttleFunc(1000)
  public async swapItem (gid: number, gcount: number, gpoints: number, addrid: number, remark: string, distributiontype: number, zttime: string, sdtime: string) {
    const data = {
      gid,
      gcount,
      gpoints,
      addrid,
      remark,
      distributiontype,
      zttime,
      sdtime
    }
    return await httpRequest(this.urls.swapItem, data)
  }
}

const point = new Point()

export default point
