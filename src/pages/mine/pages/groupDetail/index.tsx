import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtAvatar, AtButton, AtIcon, AtTag } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import HeightView from '../../../../components/HeightView'
import colors from '../../../../common/styles/color'
import order from '../../utils/order'

interface Props {

}

const GroupDetail: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [detail, setDetail] = useState()

  useEffect(() => {
    const ugnum = JSON.parse(router.params.props).ugnum
    getDetail(ugnum)
  }, [])

  const getDetail = async (gnum: number) => {
    const {data} = await order.myGroupDetail(gnum)
    setDetail(data)
  }

  return (
    <View>
      <TabBar title='拼团详情' />
      <View className='normalMargin'>
        <View className='radius commonColumnFlex flexCenter normalPadding'
              style={{
                backgroundColor: 'white'
              }}
        >
          <View>
            <AtIcon value='check-circle' size='25' color={colors.green} />
            <Text className='normalMarginLeft'>恭喜你拼团成功</Text>
          </View>
          <HeightView high='large' />
          <View className='commonRowFlex'
                style={{
                  width: '100%',
                  justifyContent: 'space-around'
                }}
          >
            <View className='commonColumnFlex flexCenter'
                  style={{
                    position: 'relative'
                  }}
            >
              <AtAvatar circle size='large' />
              <HeightView />
              <View style={{
                position: 'absolute',
                bottom: '25px'
              }}
              >
                <AtTag size='small'
                       active
                       type='primary'
                >团长</AtTag>
              </View>
              <Text className='slightlySmallText'>测试</Text>
            </View>
            <View className='commonColumnFlex flexCenter'
                  style={{
                    position: 'relative'
                  }}
            >
              <AtAvatar circle size='large' />
              <HeightView />
              <View style={{
                position: 'absolute',
                bottom: '25px'
              }}
              >
                <AtTag size='small'
                       active
                       type='primary'
                >团长</AtTag>
              </View>
              <Text className='slightlySmallText'>测试</Text>
            </View>
            <View className='commonColumnFlex flexCenter'
                  style={{
                    position: 'relative'
                  }}
            >
              <AtAvatar circle size='large' />
              <HeightView />
              <View style={{
                position: 'absolute',
                bottom: '25px'
              }}
              >
                <AtTag size='small'
                       active
                       type='primary'
                >团长</AtTag>
              </View>
              <Text className='slightlySmallText'>测试</Text>
            </View>
          </View>
          <HeightView high='large' />
          <View style={{
            width: '70%'
          }}
          >
            <AtButton circle customStyle={{
              borderColor: colors.themeRed,
              color: colors.themeRed
            }}
            >查看更多优惠</AtButton>
            <HeightView />
            <AtButton  circle customStyle={{
              borderColor: colors.themeRed,
              color: colors.themeRed
            }}
            >查看订单详情</AtButton>
          </View>
        </View>
      </View>
    </View>
  )
}

export default GroupDetail
