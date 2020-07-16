import AccountVerification from '../../../utils/accountVerification'
import { noEmpty, throttleFunc } from '@utils/decorator'
import Taro from '@tarojs/taro'
import httpRequest from '@utils/request'

class Account extends AccountVerification {
  constructor() {
    super()
  }

  private urls = {
    loginWithPassword: '/api/app/userinfo/login',
    register: '/api/app/userinfo/register',
    loginWithPhoneNumber: '/api/app/userinfo/loginsms',
    getSmsCode: '/api/app/sms/send',
    getUserData: '/api/app/userinfo/personalInformation'
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  @throttleFunc(1000)
  public async loginWithPassword (account: string, password: string) {
    const data = {
      name: account,
      pwd: password
    }
    return await httpRequest(this.urls.loginWithPassword, data)
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  @throttleFunc(1000)
  public async loginWithPhoneNumber (phoneNum: string, sms: string) {
    const data = {
      mobile: phoneNum,
      smscode: sms
    }
    return await httpRequest(this.urls.loginWithPhoneNumber, data)
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  @throttleFunc(1000)
  public async registerWithPhoneNumber (phoneNum: string, sms: string, password: string) {
    const data = {
      mobile: phoneNum,
      sms: sms,
      password: password
    }
    return await httpRequest(this.urls.register, data)
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  @throttleFunc(1000)
  public async getSmsCode (phoneNum: string, type: string) {
    const data = {
      ph: phoneNum,
      smsType: type,
    }
    return await httpRequest(this.urls.getSmsCode, data)
  }

  @noEmpty(() => Taro.showToast({title: '请勿提交空值', icon: 'none'}))
  @throttleFunc(1000)
  public async getUserData () {
    return await httpRequest(this.urls.getUserData)
  }
}

const account = new Account()

export default account
