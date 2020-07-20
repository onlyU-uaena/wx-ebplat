import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton, AtTag } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import CusSearchBar from '../../../../components/CusSearchBar'
import CustomIcon from '../../../../components/CustomIcon'
import { GetTopicSku } from '../../utils/interface'
import { navTo } from '@utils/route'

interface Props {

}

const Search: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const onSearchResult = (data) => {
    navTo('home', 'searchResult', data)
  }

  useEffect(() => {
    console.log(router)
  }, [])

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
          <CustomIcon name='rubbish' color='gray' size={20} />
        </View>
        <View className='normalMarginTop'>
          {/*<AtTag active>标签</AtTag>*/}
        </View>
      </View>
    </View>
  )
}

export default Search
