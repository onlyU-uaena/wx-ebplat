import { noEmpty, throttleFunc } from '@utils/decorator'
import Taro from '@tarojs/taro'
import httpRequest from '@utils/request'

class Point {
  private urls = {
    getPointRule: 'api/app/checkin/pointsrule'
  }

  public async getPointRule () {
    const data = {
    }
    return await httpRequest(this.urls.getPointRule, data)
  }
}

const point = new Point()

export default point
