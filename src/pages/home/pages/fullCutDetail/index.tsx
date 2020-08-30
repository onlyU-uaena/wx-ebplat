import Taro, { useState, useEffect, useRouter, useReachBottom } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Image, View } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import commodity from '../../utils/commodity'
import { selectShopState } from '@redux/reducers/selector'
import HeightView from '../../../../components/HeightView'
import FreshList, { FreshListInterface } from '../../../../components/FreshList'

interface Props {

}

const FullCutDetail: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const shopState = useSelector(selectShopState)
  const [page, setPage] = useState<number>(1)
  const [list, setList] = useState([])
  const [img, setImg] = useState<string>('')
  const [freshList, setFreshList] = useState<FreshListInterface>()
  const [ActId, setActId] = useState<number>(0)

  useEffect(() => {
    const actid = JSON.parse(router.params.props).actId
    console.log(actid)
    setActId(actid)
    getFullCutDetailImg(actid)
    // getFullCutDetailList(actid)
  }, [])

  useReachBottom(() => {
    if (freshList)
      freshList.nextPage()
  })

  const getFullCutDetailImg = async (id: number) => {
    const {data} = await commodity.getFullCutDetailImg(id)
    setImg(data)
  }

  // const getFullCutDetailList = async (id: number) => {
  //   const {data} = await commodity.getFullCutDetailList(shopState.shopData.shopid, id, page, 14)
  //   if (data.length) {
  //     setPage(page + 1)
  //     setList(list.concat(data))
  //   }
  // }

  return (
    <View>
      <TabBar title='满减活动' />
      <Image src={img.imgurl}
             style={{
               width: '100%',
               height: '150px'
             }}
      />
      <HeightView />
      <View className='normalMarginLeft normalMarginRight'>
        {ActId && <FreshList onRef={setFreshList} shopid={shopState.shopData.shopid}
                    dispatchListFunc={async (page: number, size: number) => {
                      return await commodity.getFullCutDetailList(shopState.shopData.shopid, ActId, page, size)
                    }}
        />}
      </View>
    </View>
  )
}

export default FullCutDetail
