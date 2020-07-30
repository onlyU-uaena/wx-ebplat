import Taro, {showActionSheet} from '@tarojs/taro'
import shopCart from '../../shoppingCart/utils/shopCart'
import order from './order'

export const toDeleteOrder = async (id) => {
  return new Promise((resolve, reject) =>
    Taro.showModal({
      title: '删除订单',
      content: '确认删除选中的订单?',
      success: async function (res) {
        if (res.confirm) {
          const deleteRes = await order.deleteOrder(id)
          if (deleteRes.code === 0) {
            Taro.showToast({
              title: '删除订单成功',
              icon: 'none'
            })
            resolve()
          }
        } else if (res.cancel) {
          reject()
        }
      }
    })
  )
}

export const toConfirmOrder = async (id) => {
  return new Promise((resolve, reject) =>
    Taro.showModal({
      title: '确认收货',
      content: '确认签收吗?',
      success: async function (res) {
        if (res.confirm) {
          const deleteRes = await order.confirmOrder(id)
          if (deleteRes.code === 0) {
            Taro.showToast({
              title: '收货成功'
            })
            resolve()
          }
        } else if (res.cancel) {
          reject()
        }
      }
    })
  )
}

export const toCancelOrder = async (id, status) => {
  return new Promise((resolve, reject) => {
    const itemList = [
      '信息填写错误，重新购买',
      '选错商品了',
      '商品未按约定时间配货',
      '商品缺货无法发货',
      '其他'
    ]
    Taro.showActionSheet({
      itemList: itemList,
      success: async function (res: any) {
        const deleteRes = await order.cancelOrder(id, itemList[res.tapIndex], status)
        if (deleteRes.code === 0) {
          Taro.showToast({
            title: '取消订单成功',
            icon: 'none'
          })
          resolve()
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
        reject()
      }
    })
    }
  )
}
