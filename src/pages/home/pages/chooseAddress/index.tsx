import Taro, { useState, useRouter, useDidShow } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton, AtTag, AtSwipeAction } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import address from '../../../mine/utils/address'
import { navTo } from '@utils/route'
import CustomIcon from '../../../../components/CustomIcon'
import colors from '../../../../common/styles/color'
import { setAddress } from '@redux/actions'

interface Props {

}

const ChooseAddress: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [addressList, setAddressList] = useState()

  const getAddress = async () => {
    const {data} = await address.getAddress()
    setAddressList(data)
  }

  const chooseAddress = (item) => {
    const addr = {
      name: item.name,
      id: item.id,
      phoneNum: item.mobile,
      defaultAdd: item.isdefault,
      addressDetail: item.address,
      origin: {
        value: [item.provincename, item.cityname, item.areaname],
        code: [item.provincecode, item.citycode, item.areacode],
        postcode: ''
      }
    }
    dispatch(setAddress(addr))
    if (JSON.parse(router.params.props).choose) {
      Taro.navigateBack()
    }
  }

  const toModify = (item) => {
    navTo('home', 'modifyAddress', {
      name: item.name,
      id: item.id,
      phoneNum: item.mobile,
      defaultAdd: item.isdefault,
      addressDetail: item.address,
      origin: {
        value: [item.provincename, item.cityname, item.areaname],
        code: [item.provincecode, item.citycode, item.areacode],
        postcode: ''
      }
    })
  }

  const clickSwipe = async (index: number, id: number) => {
    if (index === 1) {
      const data = await address.removeAddress(id)
      if (!data.code) {
        await getAddress()
        await Taro.showToast({
          title: '删除成功'
        })
      }
    } else {
      const data = await address.setDefault(id)
      if (!data.code) {
        await getAddress()
        await Taro.showToast({
          title: '设为默认成功'
        })
      }
    }
  }

  useDidShow(() => {
    getAddress()
  })

  return (
    <View>
      <TabBar title='我的地址' />
      {addressList &&
        addressList.map((item, index) => (
          <AtSwipeAction onClick={(e, clickIndex) => clickSwipe(clickIndex, item.id)} autoClose key={index} options={[
            {
              text: '设为默认',
              style: {
                backgroundColor: colors.background,
                color: 'black'
              }
            },
            {
              text: '删除',
              style: {
                backgroundColor: colors.themeColor
              }
            }
          ]}
          >
            <View onClick={() => chooseAddress(item)} className='commonColumnFlex normalPadding borderBottom'>
              <View className='commonRowFlex flexCenter'>
                <Text className='normalMarginRight'>{item.name}  {item.mobile}</Text>
                {item.isdefault && <AtTag size='small' active circle type='primary'>默认</AtTag>}
              </View>
              <View className='commonRowFlex flexCenter'
                    style={{
                      justifyContent: 'space-between'
                    }}
              >
                <Text className='slightlySmallText grayText'>{item.provincename}{item.cityname}{item.areaname}{item.address}</Text>
                <View onClick={event => event.stopPropagation()}>
                  <CustomIcon onClick={() => toModify(item)} name='modifyAdd' color='gray' size={30} />
                </View>
              </View>
            </View>
          </AtSwipeAction>
        ))
      }
      <View onClick={() => navTo('home', 'addAddress')} className='commonRowFlex gradientTheme flexCenter normalPadding' style={{
        justifyContent: 'center',
        position: 'fixed',
        width: '100%',
        bottom: 0
      }}
      >
        <Text className='whiteText mediumText'>+ 添加地址</Text>
      </View>
    </View>
  )
}

export default ChooseAddress
