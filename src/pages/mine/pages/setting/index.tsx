import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtAvatar, AtButton, AtListItem } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import colors from '../../../../common/styles/color'
import HeightView from '../../../../components/HeightView'
import { loginOut } from '@redux/actions'
import { delayBack } from '@utils/route'

interface Props {

}

const Setting: Taro.FC<Props> = () => {
  const dispatch = useDispatch()

  const toLogOut = () => {
    dispatch(loginOut())
    Taro.setStorageSync('token', '')
    Taro.showToast({
      title: '退出登录成功',
      icon: 'none'
    })
    delayBack(1, 500)
  }

  return (
    <View>
      <TabBar title='设置' />
      <View className='commonColumnFlex flexCenter' style={{
        justifyContent: 'center',
        margin: '32px 0'
      }}
      >
        <AtAvatar size='large' image='' />
        <Text className='slightlySmallText grayText smallMarginTop'>当前版本 1.1.1</Text>
      </View>
      <View style={{
        backgroundColor: 'white'
      }}
      >
        <AtListItem iconInfo={{
          size: 20,
          color: colors.themeColor,
          value: 'lock',
          prefixClass: 'fa'
        }}
                    title='修改密码'
                    arrow='right'
        />
        <AtListItem iconInfo={{
          size: 20,
          color: colors.themeColor,
          value: 'key',
          prefixClass: 'fa'
        }}
                    title='支付密码'
                    arrow='right'
        /><AtListItem iconInfo={{
        size: 20,
        color: colors.themeColor,
        value: 'invoice',
        prefixClass: 'fa'
      }}
                      title='发票管理'
                      arrow='right'
        />
      </View>
      <HeightView />
      <View style={{
        backgroundColor: 'white'
      }}
      >
        <AtListItem iconInfo={{
                      size: 20,
                      color: colors.themeColor,
                      value: 'warn',
                      prefixClass: 'fa'
                    }}
                    title='关于我们'
                    arrow='right'
        />
        <AtListItem iconInfo={{
                      size: 20,
                      color: colors.themeColor,
                      value: 'question',
                      prefixClass: 'fa'
                    }}
                    title='帮助中心'
                    arrow='right'
        />
        <AtListItem iconInfo={{
                      size: 20,
                      color: colors.themeColor,
                      value: 'clean',
                      prefixClass: 'fa'
                    }}
                    title='清除缓存'
                    arrow='right'
        />
      </View>
      <View className='bottomGroup'>
        <AtButton onClick={() => toLogOut()} type='primary' full>退出登录</AtButton>
      </View>
    </View>
  )
}

export default Setting
