import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import TabBar from '../../components/TabBar'
import { AtAvatar } from 'taro-ui'
import CustomIcon from '../../components/CustomIcon'
import { firstIconList, secondIconList, thirdIconList } from './data'
import { navTo } from '@utils/route'
import { selectAuthState } from '@redux/reducers/selector'
import account from './utils/login'
import { loginIn, loginOut } from '@redux/actions'

interface Props {

}

const Mine: Taro.FC<Props> = () => {
  const authState = useSelector(selectAuthState)
  const dispatch = useDispatch()

  useEffect(() => {
    const autoLogin = async () => {
      const { code, data } = await account.getUserData()
      if (!code) {
        dispatch(loginIn(data))
      } else {
        dispatch(loginOut())
      }
    }

    autoLogin()
  }, [dispatch])

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
        <View className='avatar'>
          <AtAvatar size='large' circle image={authState.userData.imgurl} />
        </View>
        <View className='commonColumnFlex normalMarginLeft'
              style={{
                justifyContent: 'space-between'
              }}
        >
          <Text className='whiteText'>{authState.userData.nickname || '点击登录'}</Text>
          <Text className='whiteText'>{authState.userData.nickname && '欢迎回来'}</Text>
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
      <View className='personPoint commonRowFlex' style={{
        backgroundColor: 'white'
      }}
      >
        <View className='commonColumnFlex flexCenter' style={{
          flex: 1
        }}
        >
          <Text className='orangeText'>1</Text>
          <Text className='mediumText grayText'>积分</Text>
        </View>
        <View className='commonColumnFlex flexCenter' style={{
          flex: 1
        }}
        >
          <Text className='orangeText'>1</Text>
          <Text className='mediumText grayText'>优惠券</Text>
        </View>
      </View>
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
          <View className='commonRowFlex flexCenter'>
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
            <View className='commonColumnFlex flexCenter' style={{flex: 1}} key={index}>
              <CustomIcon name={item.iconName} size={25} color='rgb(234, 114 ,49)' />
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
            <View className='commonColumnFlex flexCenter' style={{flex: 1}} key={index}>
              <CustomIcon name={item.iconName} size={25} color={item.color || 'rgb(234, 114 ,49)'} />
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
            <View className='commonColumnFlex flexCenter' style={{flex: 1}} key={index}>
              <CustomIcon name={item.iconName} size={25} color={item.color || 'rgb(234, 114 ,49)'} />
              <Text className='slightlySmallText smallMarginTop grayText'>{item.title}</Text>
            </View>
          ))}
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
