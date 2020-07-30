import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Image, Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton, AtCheckbox, AtInputNumber } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import user from '../../utils/user'

interface Props {

}

const MyFavorites: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState<number>(1)
  const [itemList, setItemList] = useState()
  const [selectList, setSelectList] = useState([])

  useEffect(() => {
    getMyCollect()
  }, [])

  const selectAll = () => {

  }

  const getMyCollect = async () => {
    const {data} = await user.getCollect(page, 14)
    setItemList(data)
  }

  return (
    <View>
      <TabBar title='我的收藏' />
      {itemList && itemList.map((shopItem, shopIndex) => (
        <View key={shopIndex} className='commonRowFlex flexCenter borderBottom' style={{
          backgroundColor: 'white'
        }}
        >
          <AtCheckbox onChange={(e) => setSelectList(e)}
                      options={[{
                        value: shopItem.shopcartproid,
                        label: ''
                      }]}
                      selectedList={selectList}
          />
          <View className='commonRowFlex normalPadding' style={{flex: 1}}>
            <Image src={shopItem.img}
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
                <Text className='slightlySmallText'>{shopItem.name}</Text>
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
                <AtInputNumber type='number' value={shopItem.count} max={shopItem.stock} min={1} onChange={(e) => changeNum(shopItem.shopcartproid, e)} />
              </View>
            </View>
          </View>
        </View>
      ))}
      <View>
        <View className='commonRowFlex flexCenter'>
          <AtCheckbox onChange={(e) => selectAll()}
                      options={[{
                        value: 'all',
                        label: ''
                      }]}
                      selectedList={['all']}
          />
          <Text className='slightlySmallText'>全选</Text>
        </View>
      </View>
    </View>
  )
}

export default MyFavorites
