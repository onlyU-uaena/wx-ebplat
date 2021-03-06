import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtAvatar, AtButton, AtListItem } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import colors from '../../../../common/styles/color'
import HeightView from '../../../../components/HeightView'
import { loginOut } from '@redux/actions'
import { delayBack, navTo } from '@utils/route'
import { selectAuthState } from '@redux/reducers/selector'

interface Props {

}

const Setting: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const authState = useSelector(selectAuthState)

  const toLogOut = () => {
    dispatch(loginOut())
    Taro.setStorageSync('token', '')
    Taro.setStorageSync('openid', '')
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
      {authState.loginStatus && (
        <View>
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
                        onClick={() => navTo('mine', 'changePassword')}
                        arrow='right'
            />
            {/*<AtListItem iconInfo={{*/}
            {/*  size: 20,*/}
            {/*  color: colors.themeColor,*/}
            {/*  value: 'key',*/}
            {/*  prefixClass: 'fa'*/}
            {/*}}*/}
            {/*            title='支付密码'*/}
            {/*            onClick={() => navTo('mine', 'payPwd')}*/}
            {/*            arrow='right'*/}
            {/*/>*/}
            <AtListItem iconInfo={{
            size: 20,
            color: colors.themeColor,
            value: 'invoice',
            prefixClass: 'fa'
          }}
                        title='发票管理'
                        onClick={() => navTo('mine', 'invoice')}
                        arrow='right'
            />
          </View>
          <HeightView />
        </View>
      )}
      <View style={{
        backgroundColor: 'white'
      }}
      >
        {/*<AtListItem iconInfo={{*/}
        {/*              size: 20,*/}
        {/*              color: colors.themeColor,*/}
        {/*              value: 'warn',*/}
        {/*              prefixClass: 'fa'*/}
        {/*            }}*/}
        {/*            title='关于我们'*/}
        {/*            arrow='right'*/}
        {/*/>*/}
        {/*<AtListItem iconInfo={{*/}
        {/*              size: 20,*/}
        {/*              color: colors.themeColor,*/}
        {/*              value: 'question',*/}
        {/*              prefixClass: 'fa'*/}
        {/*            }}*/}
        {/*            title='帮助中心'*/}
        {/*            arrow='right'*/}
        {/*/>*/}
        <AtListItem iconInfo={{
                      size: 20,
                      color: colors.themeColor,
                      value: 'clean',
                      prefixClass: 'fa'
                    }}
                    onClick={() => Taro.showToast({
                      title: '清除完成'
                    })}
                    title='清除缓存'
                    arrow='right'
        />
      </View>
      {authState.loginStatus && (
        <View className='bottomGroup'>
          <AtButton onClick={() => toLogOut()} type='primary' full>退出登录</AtButton>
        </View>
      )}
    </View>
  )
}

export default Setting
