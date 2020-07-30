import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Image, Text, View } from '@tarojs/components'
import './index.scss'
import { AtAvatar, AtButton, AtIcon, AtTag } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import HeightView from '../../../../components/HeightView'
import colors from '../../../../common/styles/color'
import order from '../../utils/order'
import { navTo } from '@utils/route'
import LimitStr from '@utils/stringLimit'
import { selectAuthState } from '@redux/reducers/selector'

interface Props {

}

const listStatus = {
  0:'团购进行中',
  1:'团购成功',
  2:'团购失败'
}

const GroupDetail: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const authState = useSelector(selectAuthState)
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
      {detail && (
        <View>
          <View className='commonRowFlex normalPadding radius normalMargin'
                style={{
                  justifyContent: 'space-between',
                  backgroundColor: 'white',
                  marginBottom: 0
                }}
          >
            <Image src={detail.proimg}
                   className='displayImg'
            />
            <View className='commonColumnFlex' style={{
              justifyContent: 'space-between',
              flex: 1
            }}
            >
              <View className='commonRowFlex flexCenter' style={{
                justifyContent: 'space-between'
              }}
              >
                <Text className='mediumText'>{LimitStr(detail.proname, 12)}</Text>
              </View>
              <View className='commonRowFlex flexCenter'>
                <Text className='mediumText redText'>¥{detail.price}</Text>
                <Text className='smallText grayText throughLineText smallMarginLeft'>¥{detail.oldprice}</Text>
              </View>
            </View>
          </View>
          <View className='normalMargin'>
            <View className='radius commonColumnFlex flexCenter normalPadding'
                  style={{
                    backgroundColor: 'white'
                  }}
            >
              {detail.status && (
                <View>
                  {detail.status === 1 && (<AtIcon value='check-circle' size='25' color={colors.green} />)}
                  {detail.status === 0 && (<AtIcon value='clock' size='25' color={colors.themeRed} />)}
                  {detail.status === 2 && (<AtIcon value='close-circle' size='25' color={colors.themeColor} />)}
                  <Text className='normalMarginLeft'>{listStatus[detail.status]}</Text>
                </View>
              )}
              <HeightView high='large' />
              <View className='commonRowFlex'
                    style={{
                      width: '100%',
                      flexWrap: 'wrap'
                    }}
              >
                {detail.users.map(item => (
                  <View className='commonColumnFlex flexCenter'
                        key={item.id}
                        style={{
                          position: 'relative',
                          width: '33%'
                        }}
                  >
                    <AtAvatar circle image={item.imgurl} size='large' />
                    <HeightView />
                    <View style={{
                      position: 'absolute',
                      bottom: '25px'
                    }}
                    >
                      {((item.id === authState.userData.id) && (item.islaunch)) && (
                        <AtTag size='small'
                               active
                               type='primary'
                        >团长</AtTag>
                      )}
                    </View>
                    <Text className='slightlySmallText'>{item.nickname || '好友'}</Text>
                  </View>
                ))}
              </View>
              <HeightView high='large' />
              <View style={{
                width: '70%'
              }}
              >
                {detail.status === 1 && (
                  <View>
                    <AtButton circle
                              onClick={() => navTo('home', 'groupHome')}
                              customStyle={{
                                borderColor: colors.themeRed,
                                color: colors.themeRed
                              }}
                    >查看更多优惠</AtButton>
                    <HeightView />
                  </View>
                )}
                {detail.status === 0 && (
                  <View>
                    <AtButton circle
                              openType='share'
                              customStyle={{
                                borderColor: colors.themeRed,
                                color: colors.themeRed
                              }}
                    >邀请好友参与拼团
                    </AtButton>
                    <HeightView />
                  </View>
                )}
                {detail.status === 2 && (
                  <View>
                    <AtButton circle
                              onClick={() => navTo('home', 'groupHome')}
                              customStyle={{
                                borderColor: colors.themeRed,
                                color: colors.themeRed
                              }}
                    >继续拼团
                    </AtButton>
                    <HeightView />
                  </View>
                )}
                <AtButton circle
                          onClick={() => navTo('mine', 'myOrder')}
                          customStyle={{
                            borderColor: colors.themeRed,
                            color: colors.themeRed
                          }}
                >查看订单详情</AtButton>
              </View>
            </View>
          </View>
          <View className='normalMargin radius normalPadding commonColumnFlex'
                style={{
                  marginTop: 0,
                  backgroundColor: 'white'
                }}
          >
            <Text className='mediumText'>
              活动规则
            </Text>
            <Text className='slightlySmallText grayText'>
              当您在规定时间内成功邀请{detail.gcount}位好友参团，则拼团成功，若拼团失败，系统会自动将金额原路返回
            </Text>
          </View>
        </View>
      )}
    </View>
  )
}

export default GroupDetail
