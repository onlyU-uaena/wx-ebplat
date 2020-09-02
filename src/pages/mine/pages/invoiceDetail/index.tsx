import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import HeightView from '../../../../components/HeightView'
import useRouter = Taro.useRouter
import invoice from '../../utils/invoice'

interface Props {

}

const InvoiceDetail: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [detail, setDetail] = useState()

  const getDetail = async (id) => {
    const {data} = await invoice.getDetail(id)
    setDetail(data)
  }

  useEffect(() => {
    const id = JSON.parse(router.params.props).id
    getDetail(id)
  }, [])

  return (
    <View>
      <TabBar title='发票详情' />
      {detail && (
        <View>
          <View className='normalPadding'
                style={{
                  backgroundColor: 'white'
                }}
          >
            <View className='commonRowFlex flexCenter'
                  style={{
                    justifyContent: 'space-between'
                  }}
            >
              <Text className='mediumText boldText'>电子发票</Text>
              <Text className='mediumText orangeText'>已开票</Text>
            </View>
            <HeightView />
            <View className='normalPadding'
                  style={{
                    border: '1px solid rgb(238, 238, 238)'
                  }}
            >
              {detail.titletype === 1 ? (
                <View>
                  <View className='commonRowFlex flexCenter'
                        style={{
                          justifyContent: 'space-between'
                        }}
                  >
                    <Text className='mediumText'>公司名称</Text>
                    <Text className='mediumText'>已开票</Text>
                  </View>
                  <HeightView />
                  <View className='commonRowFlex flexCenter'
                        style={{
                          justifyContent: 'space-between'
                        }}
                  >
                    <Text className='mediumText'>税号</Text>
                    <Text className='mediumText'>已开票</Text>
                  </View>
                  <HeightView />
                </View>
              ) : null}
              <View className='commonRowFlex flexCenter'
                    style={{
                      justifyContent: 'space-between'
                    }}
              >
                <Text className='mediumText'>发票金额</Text>
                <Text className='mediumText redText'>¥{detail.money}</Text>
              </View>
              <HeightView />
              <View className='commonRowFlex flexCenter'
                    style={{
                      justifyContent: 'space-between'
                    }}
              >
                <Text className='mediumText'>申请时间</Text>
                <Text className='mediumText'>{detail.createtime}</Text>
              </View>
            </View>
          </View>
          <HeightView />
          <View className='normalPadding'
                style={{
                  backgroundColor: 'white'
                }}
          >
            <Text className='mediumText boldText'>个人信息</Text>
            <View className='commonRowFlex flexCenter normalPadding'
                  style={{
                    justifyContent: 'space-between'
                  }}
            >
              <Text className='mediumText'>邮箱</Text>
              <Text className='mediumText'>{detail.email}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

export default InvoiceDetail
