import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton, AtCheckbox, AtImagePicker, AtRate, AtTextarea } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import ReadCommodity from '../../../../components/ReadCommodity'
import HeightView from '../../../../components/HeightView'
import { baseUrl } from '@utils/request'
import order from '../../utils/order'
import { selectShopState } from '@redux/reducers/selector'
import { delayBack } from '@utils/route'

interface Props {

}

const checkboxOption = [{
  value: 'showName',
  label: '匿名评价'
}]

const EvaluationOrder: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const shopState = useSelector(selectShopState)
  const [itemDetail, setItemDetail] = useState()
  const [comment, setComment] = useState([])
  const [checkedList, setCheckedList] = useState([])
  const [gooddescription, setGooddescription] = useState(5)
  const [sellerattitude, setSellerattitude] = useState(5)
  const [logisticsspeed, setLogisticsspeed] = useState(5)

  const changeText = (index, content) => {
    const newList = comment.concat()
    newList[index].content = content
    setComment(newList)
  }

  const changeImg = (index, e) => {
    const newList = comment.concat()
    newList[index].files = e
    setComment(newList)
  }

  const changeImgUrl = (index, e) => {
    const newList = comment.concat()
    newList[index].commimg = e
    setComment(newList)
  }

  const changeStar = (index, e) => {
    console.log(e)
    const newList = comment.concat()
    newList[index].star = e
    setComment(newList)
  }

  const confirmComment = async () => {
    const list = comment.map(item => {
      return {
        ...item,
        showname: checkedList.length ? 1 : 0
      }
    })

    const {code} = await order.toComment(itemDetail.id, shopState.shopData.shopid, list, gooddescription, sellerattitude, logisticsspeed)
    if (code === 0) {
      Taro.showToast({
        title: '评论成功'
      })
      delayBack(1, 1000)
    }
  }

  const uploadFile = (e, index, type) => {
    let urls = []
    changeImg(index, e)
    let urlLength = 0
    if (type === 'add') {
      Taro.showLoading({
        title: '正在上传图片',
        mask: true
      })
      e.map((item) => {
        Taro.uploadFile({
          url: baseUrl + '/img/upload',
          filePath: item.url,
          name: 'file',
          formData: {
            'token': Taro.getStorageSync('token'),
            'relationtype': 0,
            'ch': '3'
          },
          success: (res) => {
            urls = urls.concat(JSON.parse(res.data).data)
            urlLength++
            if (urlLength === e.length) {
              Taro.hideLoading()
              console.log(urls)
              changeImgUrl(index, urls)
            }
          }
        })
      })
    }
    console.log(e)
  }

  useEffect(() => {
    const detail = JSON.parse(router.params.props).item
    setItemDetail(detail)
    const list = []
    for (const item of detail.lsitdetais) {
      console.log(item)
      list.push({
        orderdetaileid: item.id,
        type: 1,
        spuid: item.skuid,
        star: 5,
        title: '',
        content: '',
        commimg: '',
        files: []
      })
    }
    setComment(list)
    console.log(list, detail)
  }, [])

  return (
    <View>
      <TabBar title='评价订单' />
      <View className='normalMargin'
            style={{
              backgroundColor: 'white'
            }}
      >
        {comment.length && itemDetail && itemDetail.lsitdetais.map((shopItem, shopIndex) => (
          <View key={shopIndex}>
            <ReadCommodity key={shopIndex} imgUrl={shopItem.productimg} title={shopItem.productname} price={shopItem.proprice} num={shopItem.productcount} />
            <View className='normalMarginLeft normalMarginRight'>
              <AtTextarea
                onChange={(e) => changeText(shopIndex, e)}
                maxLength={200}
                placeholder='请填入您的评价'
                value={comment[shopIndex].content}
              />
            </View>
            <HeightView />
            <View className='normalMarginLeft normalMarginRight commonRowFlex'
                  style={{
                    justifyContent: 'flex-end'
                  }}
            >
              <AtRate value={comment[shopIndex].star} onChange={(e) => changeStar(shopIndex, e)} />
            </View>
            <HeightView />
            <View className='normalMarginBottom smallMarginLeft smallMarginRight'>
              <AtImagePicker
                files={comment[shopIndex].files}
                count={9}
                onChange={(e, type) => uploadFile(e, shopIndex, type)}
              />
            </View>
          </View>
        ))}
      </View>
      <View className='normalMargin normalPadding'
            style={{
              backgroundColor: 'white'
            }}
      >
        <Text className='mediumText'>物流评价</Text>
        <HeightView />
        <View className='commonRowFlex flexCenter'
              style={{
                justifyContent: 'space-between'
              }}
        >
          <Text className='grayText slightlySmallText'>商品描述相符度</Text>
          <View className='smallMarginLeft'>
            <AtRate value={gooddescription} onChange={setGooddescription} />
          </View>
        </View>
        <HeightView />
        <View className='commonRowFlex flexCenter'
              style={{
                justifyContent: 'space-between'
              }}
        >
          <Text className='grayText slightlySmallText'>卖家服务态度</Text>
          <View className='smallMarginLeft'>
            <AtRate value={sellerattitude} onChange={setSellerattitude} />
          </View>
        </View>
        <HeightView />
        <View className='commonRowFlex flexCenter'
              style={{
                justifyContent: 'space-between'
              }}
        >
          <Text className='grayText slightlySmallText'>物流发货速度</Text>
          <View className='smallMarginLeft'>
            <AtRate value={logisticsspeed} onChange={setLogisticsspeed} />
          </View>
        </View>
      </View>
      <AtCheckbox
        options={checkboxOption}
        selectedList={checkedList}
        onChange={setCheckedList}
      />
      <HeightView high='large' />
      <HeightView high='large' />
      <View className='bottomGroup'>
        <AtButton full type='primary' onClick={() => confirmComment()}>确定</AtButton>
      </View>
    </View>
  )
}

export default EvaluationOrder
