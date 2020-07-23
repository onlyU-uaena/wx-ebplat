import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Picker, Text, View } from '@tarojs/components'
import './index.scss'
import { AtTextarea, AtInput, AtListItem, AtButton } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import address from '../../../mine/utils/address'
import InputCard from '../../../../components/InputCard'
import HeightView from '../../../../components/HeightView'
import { delayBack } from '@utils/route'
import { getLatitude } from '@utils/getLocation'

interface Props {
}

interface PickRes {
  code: string[]
  postcode: string
  value: string[]
}

const ModifyAddress: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const props = JSON.parse(router.params.props || '{}')

  useEffect(() => {
    console.log(router.params)
  }, [router.params])

  const [name, setName] = useState<string>(props.name)
  const [addressId, setAddressId] = useState<number>(props.id)
  const [phoneNum, setPhoneNum] = useState<string>(props.phoneNum)
  const [addressDetail, setAddress] = useState<string>(props.addressDetail)
  const [defaultAdd, setDefaultAdd] = useState<string>(String(props.defaultAdd))
  const [origin, setOrigin] = useState<PickRes>(props.origin)

  const submitAddress = async () => {
    const location = await getLatitude(origin.value[2] + addressDetail)
    const data = location.geocodes[0].location.split(',')
    console.log(data)
    const res = await address.modifyAddress(addressId, name, phoneNum, origin.code[0], origin.code[1], origin.code[2], origin.value[0], origin.value[1], origin.value[2], addressDetail, defaultAdd, data[1], data[0])
    if (!res.code) {
      Taro.showToast({
        title: res.desc
      })
      delayBack()
    }
  }

  return (
    <View>
      <TabBar title='编辑地址' />
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
          <InputCard title='所在地区' rightTitle={origin ? origin.value.toString() : ''} link />
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
          switchIsCheck={defaultAdd === '1'}
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

export default ModifyAddress
