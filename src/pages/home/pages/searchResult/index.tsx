import Taro, { useState, useEffect, useReachBottom, useRouter } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtTabs, AtTabsPane } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import CusSearchBar from '../../../../components/CusSearchBar'
import CustomIcon from '../../../../components/CustomIcon'
import colors from '../../../../common/styles/color'
import HeightView from '../../../../components/HeightView'
import FreshList, { FreshListInterface } from '../../../../components/FreshList'
import commodity from '../../utils/commodity'
import { GetTopicSku } from '../../utils/interface'
import { selectShopState } from '@redux/reducers/selector'
import CardCommodity from '../../../../components/CardCommodity'

interface Props {

}

const SearchResult: Taro.FC<Props> = () => {
  const [safeTop, setSafeTop] = useState<number>(0)

  useEffect(() => {
    const { safeArea } = Taro.getSystemInfoSync()
    setSafeTop(safeArea.top)
  }, [])

  const shopState = useSelector(selectShopState)
  const dispatch = useDispatch()
  const router = useRouter()

  const [freshList, setFreshList] = useState<FreshListInterface>()
  const [searchBar, setSearchBar] = useState()
  const [searchRes, setSearchRes] = useState<GetTopicSku[]>([])
  const [currentTab, setCurrentTab] = useState<number>(0)
  const [searchStr, setSearchStr] = useState('')
  const [sort, setSort] = useState<boolean>(true)

  useReachBottom(() => {
    if (freshList)
      freshList.nextPage()
  })

  const reSearch = (index: number) => {
    if (index === 0)
      searchBar.search()
    else if (index === 1)
      searchBar.search(1, 1)
    else if (index === 2) {
      searchBar.search(sort ? 2 : 1, 2)
      setSort(!sort)
    } else if (index === 3) {

    }
  }

  useEffect(() => {
    console.log(JSON.parse(router.params.props).value)
    setSearchStr(JSON.parse(router.params.props).value)
    setSearchRes(JSON.parse(router.params.props).data)
  }, [])

  return (
    <View>
      <TabBar title='搜索结果' />
      {/*搜索栏*/}
      <View className='commonRowFlex' style={{
        backgroundColor: 'white',
        position: 'fixed',
        width: '100%',
        height: '42px',
        zIndex: 999,
        top: `${safeTop + 40}px`
      }}
      >
        <View style={{flex: 1}}>
          <CusSearchBar onRef={setSearchBar} searchStr={searchStr} onChangeResult={setSearchRes} />
        </View>
        <View className='commonRowFlex flexCenter normalMarginLeft normalMarginRight'
              onClick={() => Taro.switchTab({url: '/pages/shoppingCart/index'})}
        >
          <CustomIcon name='shop'
                      onClick={() => Taro.switchTab({url: '/pages/shoppingCart/index'})}
                      color='gray'
                      size={25}
          />
        </View>
      </View>
      <View style={{
        height: '73px'
      }}
      />
      <View className='commonRowFlex'
            style={{
              backgroundColor: 'white',
              position: 'fixed',
              width: '100%',
              height: '31px',
              zIndex: 999,
              top: `${safeTop + 40 + 42}px`
            }}
      >
        <View className='commonRowFlex flexCenter tabs'
              onClick={() => {
                setCurrentTab(0)
                reSearch(0)
              }}
        >
          <Text className={(currentTab === 0) ? 'redText slightlySmallText tabsText' : 'slightlySmallText text'}>综合推荐</Text>
        </View>
        <View className='commonRowFlex flexCenter tabs'
              onClick={() => {
                setCurrentTab(1)
                reSearch(1)
              }}
        >
          <Text className={(currentTab === 1 ? 'redText slightlySmallText tabsText' : 'slightlySmallText text')}>销量</Text>
        </View>
        <View className='commonRowFlex flexCenter tabs'
              style={{
                position: 'relative'
              }}
              onClick={() => {
                setCurrentTab(2)
                reSearch(2)
              }}
        >
          <Text className={(currentTab === 2) ? 'redText slightlySmallText tabsText' : 'slightlySmallText text'}>价格</Text>
          <View className={sort ? 'triangleBottom' : 'triangleTop'} />
        </View>
        <View className='commonRowFlex flexCenter tabs'
              onClick={() => {
                setCurrentTab(3)
                reSearch(3)
              }}
        >
          <Text className={(currentTab === 3) ? 'redText slightlySmallText tabsText' : 'slightlySmallText text'}>筛选</Text>
        </View>
      </View>
      {/*搜索结果*/}
      {(searchRes && searchRes.length) ? (
        <View>
          <View className='normalPaddingLeft normalPaddingRight' style={{
            backgroundColor: 'white'
          }}
          >
            <View>
              {searchRes && searchRes.map((item, index) => (
                <CardCommodity key={index} proId={item.id} hurdle imgUrl={item.imgurl} title={item.name} desc={item.num || item.subtitle} price={item.price} oldPrice={item.oldPrice || ''} />
              ))}
            </View>
          </View>
          <Text className='normalMarginTop normalMarginBottom' style={{
            display: 'block',
            fontSize: '20px',
            textAlign: 'center'
          }}
          >
            为您推荐
          </Text>
          <View className='normalMarginLeft normalMarginRight'>
            <FreshList onRef={setFreshList} dispatchListFunc={async (page: number, size: number) => {
              return await commodity.getTopicSku('', Number(shopState.shopData.shopid), page, size)
            }}
            />
          </View>
        </View>
      ) : (
        <View>
          <View className='commonRowFlex' style={{
            backgroundColor: 'white',
            justifyContent: 'center'
          }}
          >
            <View style={{
              margin: '50px 0'
            }} className='commonColumnFlex flexCenter'
            >
              <CustomIcon name='search' color={colors.lightGray} size={50} />
              <HeightView high='large' />
              <Text className='grayText slightlySmallText'>抱歉 没有找到对应商品</Text>
              <Text className='grayText slightlySmallText'>为您推荐热销商品</Text>
            </View>
          </View>
          <Text className='normalMarginTop normalMarginBottom' style={{
            display: 'block',
            fontSize: '20px',
            textAlign: 'center'
          }}
          >
            为您推荐
          </Text>
          <View className='normalMarginLeft normalMarginRight'>
            <FreshList onRef={setFreshList} dispatchListFunc={async (page: number, size: number) => {
              return await commodity.getTopicSku('', Number(shopState.shopData.shopid), page, size)
            }}
            />
          </View>
        </View>
      )}
    </View>
  )
}

export default SearchResult
