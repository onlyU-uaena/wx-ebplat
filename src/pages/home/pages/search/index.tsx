import Taro, { useState, useEffect, useRouter, useDidShow } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton, AtTag } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import CusSearchBar from '../../../../components/CusSearchBar'
import CustomIcon from '../../../../components/CustomIcon'
import { GetTopicSku } from '../../utils/interface'
import { navTo } from '@utils/route'
import commodity from '../../utils/commodity'
import { selectShopState } from '@redux/reducers/selector'

interface Props {

}

const Search: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const shopState = useSelector(selectShopState)
  const [historyList, setHistoryList] = useState([])

  const onSearchResult = (data, value) => {
    navTo('home', 'searchResult', {data, value})
  }

  const clearHistory = () => {
    Taro.setStorageSync('historySearch', [])
    setHistoryList([])
  }

  useDidShow(() => {
    const list = Taro.getStorageSync('historySearch') || []
    setHistoryList(list.slice(0, 10))
  })

  const historySearch = async (value) => {
    const {code, data} = await commodity.search(0, shopState.shopData.shopid, 1, value, 1, 10000)
    if (code === 0)
      navTo('home', 'searchResult', {data, value})
  }

  return (
    <View>
      <TabBar title='搜索' />
      <CusSearchBar showActionButton focus onChangeResult={onSearchResult} />
      {/*热门搜索*/}
      <View className='normalMargin'>
        <Text className='grayText'>热门搜索</Text>
        <View className='normalMarginTop'>
          {/*<AtTag active>标签</AtTag>*/}
        </View>
      </View>
      {/*历史搜索*/}
      <View className='normalMargin'>
        <View className='commonRowFlex' style={{
          justifyContent: 'space-between'
        }}
        >
          <Text className='grayText'>历史搜索</Text>
          <CustomIcon onClick={() => clearHistory()} name='rubbish' color='gray' size={20} />
        </View>
        <View className='normalMarginTop'>
          {historyList.map(item => (
            <AtTag customStyle={{
                     marginRight: '4px',
                     marginTop: '4px'
                   }}
                   key={item}
                   active
                   onClick={() => historySearch(item)}
            >{item}</AtTag>
          ))}
        </View>
      </View>
    </View>
  )
}

export default Search
