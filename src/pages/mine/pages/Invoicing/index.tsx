import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View, RadioGroup, Radio } from '@tarojs/components'
import './index.scss'
import { AtButton, AtInput } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import HeightView from '../../../../components/HeightView'
import colors from '../../../../common/styles/color'
import invoice from '../../utils/invoice'
import { delayBack } from '@utils/route'

interface Props {

}

const Invoicing: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [titleType, setTitleType] = useState<string>('0')
  const [content, setContent] = useState<string>('商品明细')
  const [email, setEmail] = useState<any>('')
  const [companyName, setCompanyName] = useState<any>('')
  const [num, setNum] = useState<any>('')
  const [money, setMoney] = useState<number>(0)
  const [ids, setIds] = useState<string>('')

  useEffect(() => {
    const orderMoney = JSON.parse(router.params.props).money
    const orderIds = JSON.parse(router.params.props).ids
    setIds(orderIds)
    setMoney(orderMoney)
  }, [])

  const addInvoice = async () => {
    if (!email)
      return Taro.showToast({
        title: '请填写邮箱',
        icon: 'none'
      })
    const {code} = await invoice.addInvoice(titleType, content, email, companyName, num, money, ids)
    if (code === 0) {
      Taro.showToast({
        title: '开票成功'
      })
      delayBack()
    }
  }

  return (
    <View>
      <TabBar title='开发票' />
      <View className='normalPadding'
            style={{
              backgroundColor: 'white'
            }}
      >
        <Text className='mediumText boldText'>发票抬头</Text>
        <HeightView />
        <View>
          <RadioGroup onChange={(e) => setTitleType(e.detail.value)}>
            <Radio value='0' checked={titleType === '0'} color={colors.themeColor}><Text className='slightlySmallText'>个人</Text></Radio>
            <Radio className='normalMarginLeft' value='1' checked={titleType === '1'} color={colors.themeColor}><Text className='slightlySmallText'>公司</Text></Radio>
          </RadioGroup>
        </View>
        {titleType === '1' && (
          <View>
            <HeightView />
            <AtInput name='companyName' placeholder='请填写公司名称' onChange={setCompanyName} value={companyName} />
            <AtInput name='num' placeholder='请填写纳税人的识别号' onChange={setNum} value={num} />
          </View>
        )}
      </View>
      <HeightView />
      <View className='normalPadding'
            style={{
              backgroundColor: 'white'
            }}
      >
        <Text className='mediumText boldText'>发票内容</Text>
        <HeightView />
        <View>
          <RadioGroup onChange={(e) => setContent(e.detail.value)}>
            <Radio value='商品明细' checked={content === '商品明细'} color={colors.themeColor}><Text className='slightlySmallText'>商品明细</Text></Radio>
            <Radio className='normalMarginLeft' value='商品类别' checked={content === '商品类别'} color={colors.themeColor}><Text className='slightlySmallText'>商品类别</Text></Radio>
          </RadioGroup>
        </View>
      </View>
      <HeightView />
      <View className='normalPadding commonRowFlex flexCenter'
            style={{
              backgroundColor: 'white',
              justifyContent: 'space-between'
            }}
      >
        <Text className='mediumText boldText'>总金额</Text>
        <Text className='mediumText boldText'>¥{money}</Text>
      </View>
      <HeightView />
      <View className='normalPadding'
            style={{
              backgroundColor: 'white'
            }}
      >
        <Text className='mediumText boldText'>个人信息</Text>
        <AtInput name='email' title='邮箱' placeholder='必填' onChange={setEmail} value={email} />
      </View>
      <HeightView />
      <View className='normalMargin'>
        <AtButton type='primary'
                  onClick={() => addInvoice()}
                  circle
        >
          确认
        </AtButton>
      </View>
    </View>
  )
}

export default Invoicing
