import AccountVerification from '../../../utils/accountVerification'
import { noEmpty, throttleFunc } from '../../../utils/decorator'

class Account extends AccountVerification {
  constructor() {
    super()
  }

  @noEmpty(() => console.log('can not be empty'))
  @throttleFunc(2000)
  public async loginWithPassword (account: string, password: string) {
    console.log(account, password)
  }
}

const account = new Account()

export default account
