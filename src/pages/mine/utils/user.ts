import { noEmpty, throttleFunc } from '@utils/decorator'
import Taro from '@tarojs/taro'
import httpRequest from '@utils/request'

class User {
  private urls = {
    changePassword: '/api/app/userinfo/findPwd',
    setPayPwd: '/api/app/userinfo/setpayPwd',
    updatePayPwd: '/api/app/userinfo/updpayPwd'
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
  public async setPayPwd (pwd: string, repwd: string) {
    const data = {
      pwd,
      repwd
    }
    return await httpRequest(this.urls.setPayPwd, data)
  }
}

const user = new User()

export default user
