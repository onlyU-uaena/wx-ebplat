import { noEmpty, throttleFunc } from '@utils/decorator'
import Taro from '@tarojs/taro'
import httpRequest from '@utils/request'

class Point {
  private urls = {
    getPointRule: 'api/app/checkin/pointsrule',
    swapItem: 'api/app/pointspro/addpointgoodorder'
  }

  public async getPointRule () {
    const data = {
    }
    return await httpRequest(this.urls.getPointRule, data)
  }

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
