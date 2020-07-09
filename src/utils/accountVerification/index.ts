import { noEmpty, throttleFunc } from '../decorator'

class AccountVerification {
  public async loginWithPassword (account: string, password: string) {
    throw new Error('need sub to achieve')
  }

  public async loginWithPhoneNumber (phoneNum: string, sms: string) {
      throw new Error('need sub to achieve')
  }

  public async registerWithPhoneNumber (phoneNum: string, sms: string, password: string) {
      throw new Error('need sub to achieve')
  }

  public async forgetPassword (phoneNum: string, sms: string, password: string) {
      throw new Error('need sub to achieve')
  }
}

export default AccountVerification
