import Taro, { useState, useEffect, useReachBottom, useRouter } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import CusSearchBar from '../../../../components/CusSearchBar'
import CustomIcon from '../../../../components/CustomIcon'
import colors from '../../../../common/styles/color'
import HeightView from '../../../../components/HeightView'
import FreshList, { FreshListInterface } from '../../../../components/FreshList'
import { commodityList } from '../../mock'
import commodity from '../../utils/commodity'
import { GetTopicSku } from '../../utils/interface'
import { selectShopState } from '@redux/reducers/selector'
import CardCommodity from '../../../../components/CardCommodity'

interface Props {

}

const SearchResult: Taro.FC<Props> = () => {
  const shopState = useSelector(selectShopState)
  const dispatch = useDispatch()
  const router = useRouter()

  const [freshList, setFreshList] = useState<FreshListInterface>()
  const [searchRes, setSearchRes] = useState<GetTopicSku[]>([])

  useReachBottom(() => {
    if (freshList)
      freshList.nextPage()
  })

  useEffect(() => {
    setSearchRes(JSON.parse(router.params.props))
  }, [router.params.props])

  return (
    <View>
      <TabBar title='搜索结果' />
      {/*搜索栏*/}
      <View className='commonRowFlex' style={{
        backgroundColor: 'white'
      }}
      >
        <View style={{flex: 1}}>
          <CusSearchBar onChangeResult={setSearchRes} />
        </View>
        <View className='commonRowFlex flexCenter normalMarginLeft normalMarginRight'>
          <CustomIcon name='shop' color='gray' size={25} />
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
