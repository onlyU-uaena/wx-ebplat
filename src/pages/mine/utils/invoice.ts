import { noEmpty, throttleFunc } from '@utils/decorator'
import Taro from '@tarojs/taro'
import httpRequest from '@utils/request'

class Invoice {
  private urls = {
    addInvoice: '/api/app/invoice/add',
    getOrderList: '/api/app/invoice/getorderlist',
    getInvoiceList: '/api/app/invoice/getlist',
    getDetail: '/api/app/invoice/getdetail'
  }

  @throttleFunc(1000)
  public async addInvoice (titletype: string, content: string, email: string, companytitle: string, companynum: string, money: number, relatedids: string) {
    const data = {
      titletype,
      content,
      email,
      companytitle,
      companynum,
      money,
      relatedids
    }
    return await httpRequest(this.urls.addInvoice, data)
  }

  public async getOrderList (page: number, size: number) {
    const data = {
      page,
      size
    }
    return await httpRequest(this.urls.getOrderList, data)
  }

  public async getInvoiceList () {
    const data = {
    }
    return await httpRequest(this.urls.getInvoiceList, data)
  }

  public async getDetail (id: number) {
    const data = {
      id
    }
    return await httpRequest(this.urls.getDetail, data)
  }
}

const invoice = new Invoice()

export default invoice
