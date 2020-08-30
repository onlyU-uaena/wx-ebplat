import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton, AtListItem } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import commodity from '../../utils/commodity'
import { setShop, showShopName } from '@redux/actions'
import { delayBack } from '@utils/route'
import colors from '../../../../common/styles/color'
import { selectShopState } from '@redux/reducers/selector'

interface Props {

}

const ChooseShop: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const shopState = useSelector(selectShopState)
  const [list, setList] = useState()

  const getShopList = async () => {
    const {data} = await commodity.getShopList()
    setList(data)
  }

  useEffect(() => {
    getShopList()
  }, [])

  const choose = (item) => {
    dispatch(setShop(item, true))
    dispatch(showShopName())
    Taro.navigateBack()
  }

  return (
    <View>
      <TabBar title='选择店铺' />
      <View className='normalMargin'>
        <Text className='mediumText'>选择店铺</Text>
      </View>
      <View className='normalPaddingTop normalPaddingBottom'
            style={{
              backgroundColor: 'white'
            }}
      >
        {list && list.map(item => (
          <AtListItem key={item.juli}
                      onClick={() => choose(item)}
                      note={item.shopaddress}
                      title={item.shopname}
                      extraText={item.julidesc}
                      iconInfo={item.shopid === shopState.shopData.shopid ? {
                        size: 25, color: colors.themeColor, value: 'map-pin'
                      } : {
                        size: 25, color: 'gray', value: 'map-pin'
                      }}
          />
        ))}
      </View>
    </View>
  )
}

export default ChooseShop
