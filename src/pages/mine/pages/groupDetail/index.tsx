import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Image, Text, View } from '@tarojs/components'
import './index.scss'
import { AtAvatar, AtButton, AtCountdown, AtIcon, AtTag } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import HeightView from '../../../../components/HeightView'
import colors from '../../../../common/styles/color'
import order from '../../utils/order'
import { navTo } from '@utils/route'
import LimitStr from '@utils/stringLimit'
import { selectAuthState, selectShopState } from '@redux/reducers/selector'
import { getCount } from '../../../home/utils/count'
import useShareAppMessage = Taro.useShareAppMessage

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
  const [intoOuter, setMode] = useState(false)
  const [countDown, setCountDown] = useState()
  const [helpMode, setHelpMode] = useState(true)

  useEffect(() => {
    const ugnum = JSON.parse(router.params.props).ugnum
    const outer = JSON.parse(router.params.props).outer
    setHelpMode(outer)
    getDetail(ugnum)
  }, [])

  const toOrder = async () => {

    // const res = await order.getFreight(proDetail.shopid, buyNum, buyNum * proDetail.price)

    const data = {
      shopid: detail.shopid,
      totalMoney: detail.price,
      freightMoney: 0,
      activityId: 0,
      gnum: detail.ugnum,
      gid: detail.gid,
      skuID: [{
        skuid: detail.proid,
        title: detail.proname,
        imgurl: detail.proimg,
        subtitle: '',
        proCount: 1,
        price: detail.price,
        packageid: 0,
        unitid: 0,
        marketid: 0,
        spikeid: 0,
        type: 0,
        isgrp: true,
        skugrp: {id: detail.gid},
        packings: 0
      }]
    }

    navTo('home', 'confirmOrder', data)
  }

  useShareAppMessage(() => {
    console.log(`/pages/mine/pages/groupDetail/index?props=${JSON.stringify({
      outer: true,
      ugnum: detail.ugnum
    })}`)
    return {
      title: '好友助力拼团',
      path: `/pages/mine/pages/groupDetail/index?props=${JSON.stringify({
        outer: true,
        ugnum: detail.ugnum
      })}`
    }
  })

  const getDetail = async (gnum: number) => {
    const res = await order.myGroupDetail(gnum)
    setDetail(res.data)
    if (authState.userData.id === res.data.users[0].id)
      setMode(false)
    else
      setMode(true)
    const time = getCount(res.data.endtime, res.data.paytime || res.startTime)
    setCountDown(time)
  }

  return (
    <View>
      <TabBar title='拼团详情' />
      {detail && (
        <View>
          <View className='commonRowFlex normalPadding radius normalMargin'
                onClick={() => navTo('home', 'productDetails', {id: detail.proid})}
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
              <View>
                {detail.status === 1 && (<AtIcon value='check-circle' size='25' color={colors.green} />)}
                {detail.status === 0 && (<AtIcon value='clock' size='25' color={colors.themeRed} />)}
                {detail.status === 2 && (<AtIcon value='close-circle' size='25' color={colors.themeColor} />)}
                <Text className='normalMarginLeft'>{listStatus[detail.status]}</Text>
                <HeightView />
                {detail.status === 0 && (
                  <View className='commonColumnFlex flexCenter'>
                    <Text className='redText slightlySmallText'>距结束</Text>
                    <HeightView />
                    {countDown && (
                      <AtCountdown
                        isShowDay
                        format={{
                          day: '天',
                          hours: ':',
                          minutes: ':',
                          seconds: '' }}
                        day={countDown.day}
                        hours={countDown.hour}
                        minutes={countDown.min}
                        seconds={countDown.sec}
                      />
                    )}
                  </View>
                )}
              </View>
              <HeightView high='large' />
              <View className='commonRowFlex'
                    style={{
                      width: '100%',
                      flexWrap: 'wrap'
                    }}
              >
                {detail.users.map((item, index) => (
                  <View className='commonColumnFlex flexCenter'
                        onClick={() => navTo('home', 'productDetails', {id: detail.proid})}
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
                      {(index === 0) && (
                        <AtTag size='small'
                               active
                               type='primary'
                        >团长</AtTag>
                      )}
                    </View>
                    <Text className='slightlySmallText'>{item.nickname}</Text>
                  </View>
                ))}
              </View>
              <HeightView high='large' />
              <View style={{
                width: '70%'
              }}
              >
                {detail && detail.status === 1 && (
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
                {(detail && detail.status === 0) && (
                  <View>
                    <AtButton circle
                              openType={intoOuter ? '' : 'share'}
                              onClick={() => {
                                if (intoOuter)
                                  toOrder()
                              }}
                              customStyle={{
                                borderColor: colors.themeRed,
                                color: colors.themeRed
                              }}
                    >{intoOuter ? '参与拼团' : '邀请好友参与拼团'}
                    </AtButton>
                    <HeightView />
                  </View>
                )}
                {detail && detail.status === 2 && (
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
                {!helpMode && detail && detail.orderid && <AtButton circle
                           onClick={() => navTo('mine', 'orderDetail', {id: detail.orderid})}
                           customStyle={{
                             borderColor: colors.themeRed,
                             color: colors.themeRed
                           }}
                >查看订单详情</AtButton>}
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
