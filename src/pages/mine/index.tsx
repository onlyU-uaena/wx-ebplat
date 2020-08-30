import Taro, { useState, useEffect, useDidShow } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Button, Text, View } from '@tarojs/components'
import './index.scss'
import TabBar from '../../components/TabBar'
import { AtAvatar } from 'taro-ui'
import CustomIcon from '../../components/CustomIcon'
import { firstIconList, secondIconList, thirdIconList } from './data'
import { navTo } from '@utils/route'
import { selectAuthState } from '@redux/reducers/selector'
import account from './utils/login'
import { loginIn, loginOut } from '@redux/actions'
import user from './utils/user'
import store from '@redux/store'

interface Props {

}

const Mine: Taro.FC<Props> = () => {
  const authState = useSelector(selectAuthState)
  const [assets, setAssets] = useState()
  const [couponCount, setCouponCount] = useState()

  const getAssets = async () => {
    const {data} = await user.queryassets()
    const couponRes = await user.getCouponCount()
    setAssets(data)
    setCouponCount(couponRes.data)
  }

  const autoLogin = async () => {
    if (!Taro.getStorageSync('token'))
      return
    const { code, data } = await account.getUserData()
    if (!code) {
      store.dispatch(loginIn(data))
    } else {
      store.dispatch(loginOut())
    }
  }

  useEffect(() => {
    if (authState.loginStatus)
      getAssets()
  }, [authState.loginStatus])

  useDidShow(() => {
    autoLogin
  })

  return (
    <View>
      <TabBar title='我的' hideContent />
      <View className='topBackground gradientTheme' />
      {/*个人*/}
      <View className='person commonRowFlex'
            onClick={authState.loginStatus ? () => navTo('mine', 'profile') : () => navTo('mine', 'login')}
            style={{
              position: 'relative'
            }}
      >
        <View
          onClick={() => navTo('mine', 'myMessage')}
          style={{
            position: 'absolute',
            bottom: '-20px',
            right: 0

          }}
        >
          <CustomIcon name='ring'
                      color='white'
                      size={25}
                      showDot={authState.haveMessage}
                      onClick={() => navTo('mine', 'myMessage')}
          />
        </View>
        <View className='avatar'>
          <AtAvatar size='large' circle image={authState.userData.imgurl || 'https://pic3.zhimg.com/80/v2-6afa72220d29f045c15217aa6b275808_1440w.jpg?source=1940ef5c'} />
        </View>
        <View className='commonColumnFlex normalMarginLeft'
              style={{
                justifyContent: 'space-between'
              }}
        >
          <Text className='whiteText'>{authState.userData.nickname || '点击登录'}</Text>
          <Text className='whiteText'>{authState.userData.nickname ? '欢迎回来' : '登录后可享更多特权'}</Text>
        </View>
        <View style={{
          position: 'absolute',
          right: '0px',
          top: '22px',
          transform: 'rotateY(180deg)'
        }}
        >
          <CustomIcon color='white' name='back' />
        </View>
      </View>
      {/*个人积分*/}
      {authState.loginStatus && (
        <View className='personPoint commonRowFlex' style={{
          backgroundColor: 'white'
        }}
        >
          <View className='commonColumnFlex flexCenter'
                onClick={() => navTo('mine', 'pointShop')}
                style={{
                  flex: 1
                }}
          >
            <Text className='orangeText'>{authState.userData.points || 0}</Text>
            <Text className='mediumText grayText'>积分</Text>
          </View>
          <View className='commonColumnFlex flexCenter'
                onClick={() => navTo('mine', 'coupon')}
                style={{
                  flex: 1
                }}
          >
            <Text className='orangeText'>{couponCount || 0}</Text>
            <Text className='mediumText grayText'>优惠券</Text>
          </View>
        </View>
      )}
      {/*全部订单*/}
      <View className='smallMarginTop normalPadding borderBottom' style={{
        backgroundColor: 'white'
      }}
      >
        <View className='commonRowFlex' style={{
          justifyContent: 'space-between'
        }}
        >
          <View className='commonRowFlex flexCenter'>
            <CustomIcon name='order' color='black' />
            <Text className='mediumText smallMarginLeft'>全部订单</Text>
          </View>
          <View onClick={() => navTo('mine', 'myOrder', {tab: -1})} className='commonRowFlex flexCenter'>
            <Text className='slightlySmallText grayText'>查看全部订单</Text>
            <View className='smallMarginLeft horMirror'>
              <CustomIcon name='back' color='gray' />
            </View>
          </View>
        </View>
      </View>
      {/*图标列表*/}
      <View style={{
        padding: '32px 0',
        backgroundColor: 'white'
      }}
      >
        <View className='commonRowFlex flexCenter' style={{
          justifyContent: 'space-between'
        }}
        >
          {firstIconList.map((item, index) => (
            <View onClick={() => navTo('mine', 'myOrder', {tab: index})} className='commonColumnFlex flexCenter' style={{flex: 1}} key={index}>
              <CustomIcon onClick={() => navTo('mine', 'myOrder', {tab: index})} name={item.iconName} size={25} color='rgb(234, 114 ,49)' />
              <Text className='slightlySmallText smallMarginTop grayText'>{item.title}</Text>
            </View>
          ))}
        </View>
      </View>
      <View className='smallMarginTop' style={{
        padding: '32px 0',
        backgroundColor: 'white'
      }}
      >
        <View className='commonRowFlex flexCenter' style={{
          justifyContent: 'space-between'
        }}
        >
          {secondIconList.map((item, index) => (
            <View className='commonColumnFlex flexCenter'
                  style={{flex: 1}} key={index}
                  onClick={() => navTo(item.nav.index, item.nav.name)}
            >
              <CustomIcon name={item.iconName}
                          size={25}
                          onClick={() => navTo(item.nav.index, item.nav.name)}
                          color={item.color || 'rgb(234, 114 ,49)'}
              />
              <Text className='slightlySmallText smallMarginTop grayText'>{item.title}</Text>
            </View>
          ))}
        </View>
      </View>
      <View className='smallMarginTop' style={{
        padding: '32px 0',
        backgroundColor: 'white'
      }}
      >
        <View className='commonRowFlex flexCenter' style={{
          justifyContent: 'space-between'
        }}
        >
          {thirdIconList.map((item, index) => (
            <View className='commonColumnFlex flexCenter'
                  style={{flex: 1}}
                  key={index}
                  onClick={() => navTo(item.nav.index, item.nav.name)}
            >
              <CustomIcon name={item.iconName}
                          size={25}
                          color={item.color || 'rgb(234, 114 ,49)'}
                          onClick={() => navTo(item.nav.index, item.nav.name)}
              />
              <Text className='slightlySmallText smallMarginTop grayText'>{item.title}</Text>
            </View>
          ))}
          <Button plain openType={authState.loginStatus ? 'contact' : ''} className='commonColumnFlex flexCenter'
                style={{
                  flex: 1,
                  paddingLeft: 0,
                  paddingRight: 0,
                  lineHeight: 'initial',
                  border: 'none'
                }}
                key={44}
                onClick={() => {
                  if (!authState.loginStatus)
                    navTo('mine', 'login')
                }}
          >
            <CustomIcon name='customerService'
                        size={25}
                        color='rgb(234, 114 ,49)'
                        onClick={() => {
                          if (!authState.loginStatus)
                            navTo('mine', 'login')
                        }}
            />
            <Text className='slightlySmallText smallMarginTop grayText'>在线客服</Text>
          </Button>
        </View>
      </View>
      <View className='normalMargin'>
        <Text className='grayText mediumText' style={{
          display: 'block',
          textAlign: 'center'
        }}
        >
          客服电话: 400-1234-5678
        </Text>
      </View>
    </View>
  )
}

export default Mine
