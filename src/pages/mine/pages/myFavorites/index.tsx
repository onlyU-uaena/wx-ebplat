import Taro, { useState, useEffect, useDidShow } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Image, Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton, AtCheckbox, AtInputNumber } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import user from '../../utils/user'
import LimitStr from '@utils/stringLimit'
import CustomIcon from '../../../../components/CustomIcon'
import shopCart from '../../../shoppingCart/utils/shopCart'
import { selectShopState } from '@redux/reducers/selector'
import { navTo } from '@utils/route'
import colors from '../../../../common/styles/color'

import useReachBottom = Taro.useReachBottom
import EmptyPage from '../../../../components/EmptyPage'

interface Props {

}

const MyFavorites: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const shopState = useSelector(selectShopState)
  const [page, setPage] = useState<number>(1)
  const [modifyMode, setModifyMode] = useState<boolean>(false)
  const [itemList, setItemList] = useState([])
  const [selectList, setSelectList] = useState([])
  const [allSelect, setAllSelect] = useState([])

  const addToCart = async (item) => {
    console.log(item)
    const res = await shopCart.addCart(shopState.shopData.shopid, item.spuid, 1, 0, 0)
    if (!res.code) {
      await Taro.showToast({
        title: '加入购物车成功'
      })
    }
  }

  const toDetail = (id: number, status: number) => {
    if ((status === 1) || (status === 3))
      navTo('home', 'productDetails', {id: id})
    else Taro.showToast({
      title: '此商品已停售/停购'
    })
  }

  useDidShow(() => {
    getMyCollect()
  })

  const selectAll = (e) => {
    console.log(e)
    if (e.length) {
      const allList = itemList.map(item => item.id)
      setSelectList(allList)
      setAllSelect(['all'])
    } else {
      setSelectList([])
      setAllSelect([])
    }
  }

  useReachBottom(async () => {
    const {data} = await user.getCollect(page + 1, 14)
    if (data.length) {
      setPage(page + 1)
      setItemList(itemList.concat(data))
    }

  })

  const toggleCheck = (e) => {
    if (e.length === itemList.length) {
      setAllSelect(['all'])
    } else {
      setAllSelect([])
    }
    setSelectList(e)
  }

  const getMyCollect = async () => {
    const {data} = await user.getCollect(page, 14)
    setItemList(data)
  }

  const deleteCollect = async () => {
    if (!selectList.length)
      return
    const {code} = await user.deleteCollect(selectList.toString())
    if (code === 0) {
      Taro.showToast({
        title: '删除成功'
      })
      const {data} = await user.getCollect(1, 14)
      setItemList(data)
      setModifyMode(false)
      setPage(1)
    }
  }

  return (
    <View>
      <TabBar title='我的收藏' />
      {itemList.length && (
        <Text className='smallMargin mediumText'
              onClick={() => setModifyMode(!modifyMode)}
              style={{
                display: 'block',
                textAlign: 'right',
                color: colors.themeColor
              }}
        >
          {modifyMode ? '返回' : '编辑'}
        </Text>
      )}
      {itemList.length ? itemList.map((shopItem, shopIndex) => (
        <View key={shopIndex} className='commonRowFlex flexCenter borderBottom' style={{
          backgroundColor: 'white'
        }}
        >
          {modifyMode && (
            <AtCheckbox onChange={(e) => toggleCheck(e)}
                        options={[{
                          value: shopItem.id,
                          label: ''
                        }]}
                        selectedList={selectList}
            />
          )}
          <View className='commonRowFlex normalPadding'
                style={{flex: 1}}
                onClick={() => toDetail(shopItem.spuid, shopItem.status)}
          >
            <Image src={shopItem.spuimgurl}
                   className='displayImg'
            />
            <View className='commonColumnFlex'
                  style={{
                    justifyContent: 'space-between',
                    flex: 1
                  }}
            >
              <View className='commonRowFlex flexCenter' style={{
                justifyContent: 'space-between'
              }}
              >
                <Text style={{fontSize: '14px'}}>{LimitStr(shopItem.spuname, 15)}</Text>
                {/*<Text className='slightlySmallText redText'>库存紧张</Text>*/}
              </View>
              <View className='commonRowFlex flexCenter' style={{
                justifyContent: 'space-between'
              }}
              >
                <View>
                  <Text className='redText slightlySmallText'>¥{shopItem.price}</Text>
                  {/*<Text className='grayText throughLineText slightlySmallText smallMarginLeft'>¥{shopItem.oldprice}</Text>*/}
                </View>
                <CustomIcon name='add' onClick={() => addToCart(shopItem)} color='rgb(239, 154, 151)' size={25} />
              </View>
            </View>
          </View>
        </View>
      )) : (
        <EmptyPage title='暂无收藏' />
      )}
      {modifyMode && (
        <View className='bottomGroup commonRowFlex'
              style={{
                backgroundColor: 'white'
              }}
        >
          <View className='commonRowFlex flexCenter normalMarginTop normalMarginBottom'
                style={{
                  flex: 1,
                  justifyContent: 'center'
                }}
          >
            <AtCheckbox onChange={(e) => selectAll(e)}
                        options={[{
                          value: 'all',
                          label: ''
                        }]}
                        selectedList={allSelect}
            />
            <Text className='mediumText'>全选</Text>
          </View>
          <View className='commonRowFlex flexCenter normalPaddingTop normalPaddingBottom gradientTheme'
                onClick={() => deleteCollect()}
                style={{
                  flex: 1,
                  justifyContent: 'center'
                }}
          >
            <Text className='mediumText whiteText'>删除</Text>
          </View>
        </View>
      )}
    </View>
  )
}

export default MyFavorites
