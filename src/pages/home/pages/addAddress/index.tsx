import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Picker, Text, View } from '@tarojs/components'
import './index.scss'
import { AtTextarea, AtInput, AtListItem, AtButton } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import address from '../../../mine/utils/address'
import InputCard from '../../../../components/InputCard'
import HeightView from '../../../../components/HeightView'
import { delayBack } from '@utils/route'

interface Props {

}

interface PickRes {
  code: string[]
  postcode: string
  value: string[]
}

const AddAddress: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState<string>('')
  const [phoneNum, setPhoneNum] = useState<string>('')
  const [addressDetail, setAddress] = useState<string>('')
  const [defaultAdd, setDefaultAdd] = useState<string>('')
  const [origin, setOrigin] = useState<PickRes>({
    value: [],
    code: [],
    postcode: ''
  })

  const submitAddress = async () => {
    const res = await address.addAddress(name, phoneNum, origin.code[0], origin.code[1], origin.code[2], origin.value[0], origin.value[1], origin.value[2], addressDetail, defaultAdd)
    if (!res.code) {
      Taro.showToast({
        title: res.desc
      })
      delayBack()
    }
  }

  return (
    <View>
      <TabBar title='添加地址' />
      <View className='normalPaddingBottom' style={{
        backgroundColor: 'white'
      }}
      >
        <AtInput
          name='收货人'
          title='收货人'
          type='text'
          placeholder='请输入收货人姓名'
          value={name}
          onChange={(e) => setName(String(e))}
        />
        <AtInput
          name='手机号码'
          title='手机号码'
          type='text'
          placeholder='请输入手机号码'
          value={phoneNum}
          onChange={(e) => setPhoneNum(String(e))}
        />
        <Picker mode='region' onChange={(e) => setOrigin(e.detail as PickRes)} value={origin.value || []}>
          <InputCard title='所在地区' rightTitle={origin.postcode ? origin.value.toString() : '请选择'} link />
        </Picker>
        <View className='normalMargin'>
          <Text>详细地址</Text>
          <HeightView />
          <AtTextarea
            value={addressDetail}
            onChange={(e) => setAddress(String(e))}
            maxLength={50}
            placeholder='请输入详细地址'
          />
        </View>
      </View>
      <HeightView />
      <View style={{
        backgroundColor: 'white'
      }}
      >
        <AtListItem
          title='设为默认地址'
          isSwitch
          onSwitchChange={e => setDefaultAdd(e.detail.value ? '1' : '0')}
        />
      </View>
      <HeightView />
      <View className='normalPadding' style={{
        backgroundColor: 'white'
      }}
      >
        <AtButton onClick={() => submitAddress()} type='primary'>保存</AtButton>
      </View>
    </View>
  )
}

export default AddAddress
