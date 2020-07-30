import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton, AtImagePicker, AtInput, AtListItem } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import ReadCommodity from '../../../../components/ReadCommodity'
import { delayBack, navTo } from '@utils/route'
import HeightView from '../../../../components/HeightView'
import InputCard from '../../../../components/InputCard'
import { baseUrl } from '@utils/request'
import order from '../../utils/order'

interface Props {

}

const Refund: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [itemDetail, setItemDetail] = useState()
  const [reason, setReason] = useState()
  const [about, setAbout] = useState<string>()
  const [files, setFiles] = useState()
  const [filesUrl, setFilesUrl] = useState([])

  const confirmToRefund = async () => {
    let skuStatus
    if ((itemDetail.status !== 9) || (itemDetail.status !== 10))
      skuStatus = 2
    else skuStatus = 1
    console.log(filesUrl.toString())
    const {data, code} = await order.toRefund(itemDetail.code, reason, skuStatus, filesUrl.toString())
    if (code === 0) {
      Taro.showToast({
        title: '退款提交成功',
        icon: 'none'
      })
      delayBack(1, 1000)
    }
  }

  const uploadFile = (e) => {
    let urls = []
    setFiles(e)
    Taro.showLoading({
      title: '正在上传图片',
      mask: true
    })
    let urlLength = 0
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
            setFilesUrl(urls)
          }
        }
      })
    })
    console.log(e)
  }

  useEffect(() => {
    const detail = JSON.parse(router.params.props).item
    setItemDetail(detail)
  }, [])

  return (
    <View>
      <TabBar title='退款' />
      {itemDetail && (
        <View>
          {itemDetail.lsitdetais.map((shopItem, shopIndex) => (
            <ReadCommodity key={shopIndex} imgUrl={shopItem.productimg} title={shopItem.productname} price={shopItem.proprice} num={shopItem.productcount} />
          ))}
          <HeightView />
          <View style={{
            backgroundColor: 'white'
          }}
          >
            <InputCard title='订单编号' rightTitle={itemDetail.code} />
            <AtInput title='退款原因' name='退款原因' placeholder='请填写退款原因' onChange={e => setReason(String(e))} />
            <InputCard title='退款金额' renderRight={() => (<Text className='mediumText redText'>{itemDetail.actualpay.toFixed(2)}</Text>)} />
            <AtInput title='退款说明' name='退款说明' placeholder='选填' onChange={e => setAbout(String(e))} />
          </View>
          <View className='normalPadding' style={{
            backgroundColor: 'white'
          }}
          >
            <Text>凭证</Text>
            <HeightView />
            <AtImagePicker
              files={files}
              onChange={uploadFile}
            />
          </View>
        </View>
      )}
      <View className='bottomGroup'>
        <AtButton full type='primary' onClick={() => confirmToRefund()}>确定</AtButton>
      </View>
    </View>
  )
}

export default Refund
