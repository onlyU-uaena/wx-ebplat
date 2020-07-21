import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton, AtInput, AtListItem, AtRadio } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import HeightView from '../../../../components/HeightView'
import { selectShopState } from '@redux/reducers/selector'
import { navTo } from '@utils/route'
import ReadCommodity from '../../../../components/ReadCommodity'
import InputCard from '../../../../components/InputCard'

interface Props {

}

const tabList = ['配送', '自提']

const ConfirmOrder: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const shopState = useSelector(selectShopState)

  const [currentTab, setCurrentTab] = useState<number>(0)
  const [discount, setDiscount] = useState<number>(0)
  const [remark, setRemark] = useState<string>('')

  return (
    <View>
      <TabBar title='确认订单' />
      {/*选择自提*/}
      <View className='commonRowFlex' style={{
        justifyContent: 'space-around',
        backgroundColor: 'white',
        padding: '8px 0'
      }}
      >
        {tabList.map((item, index) => (
          <Text className={currentTab === index ? 'tabText mediumText' : 'mediumText'} onClick={() => setCurrentTab(index)} key={index}>{item}</Text>
        ))}
      </View>
      <HeightView />
      {/*选择地址*/}
      {currentTab === 0 ? (
        <View style={{
          backgroundColor: 'white'
        }}
        >
          {shopState.address.origin ? (
            <AtListItem
              title={`${shopState.address.origin.value}${shopState.address.addressDetail}`}
              note={`${shopState.address.name} ${shopState.address.phoneNum}`}
              onClick={() => navTo('home', 'chooseAddress', {choose: true})}
              arrow='right'
              iconInfo={{ size: 22, color: '#C1C1C1', value: 'map-pin'}}
            />
          ) : (
            <AtListItem
              title='请选择收货地址'
              arrow='right'
              onClick={() => navTo('home', 'chooseAddress', {choose: true})}
              iconInfo={{ size: 22, color: '#C1C1C1', value: 'map-pin'}}
            />
          )}
        </View>
      ) : (
        <View style={{
          backgroundColor: 'white'
        }}
        >
          <AtListItem
            title={`${shopState.shopData.shopname} ${shopState.shopData.principalMobile}`}
            note={shopState.shopData.shopaddress}
            arrow='right'
            iconInfo={{ size: 22, color: '#C1C1C1', value: 'map-pin'}}
          />
        </View>
      )}
      <HeightView />
      <ReadCommodity imgUrl='' title='珊瑚色' desc='就啊上课还是打卡好的' price='30.00' num={2} />
      <View style={{
        backgroundColor: 'white'
      }}
      >
        <AtListItem title='商品金额' extraText='$30.00' />
        <AtListItem title='配送费' extraText='$30.00' />
      </View>
        <HeightView />
      <View style={{
        backgroundColor: 'white'
      }}
      >
        <InputCard title='优惠券' rightTitle='暂无可用' />
        <InputCard title='积分抵扣' rightTitle='暂未开放' />
        <AtInput name='remark' title='备注' placeholder='请输入备注' onChange={(e) => setRemark(String(e))} />
        <InputCard title=''
                   link={false}
                   renderRight={() => <View>
          <Text className='slightlySmallText'>
            小计
          </Text>
          <Text className='mediumText redText normalMarginLeft'>
            ¥12.00
          </Text>
        </View>}
        />
      </View>
      <View className='commonRowFlex flexCenter' style={{
        position: 'fixed',
        width: '100%',
        bottom: 0,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: '8px 16px'
      }}
      >
        <View>
          <Text className='mediumText'>
            合计
          </Text>
          <Text className='mediumText redText smallMarginLeft'>
            ¥12.00
          </Text>
        </View>
        <AtButton customStyle={{
          borderRadius: '30px',
          padding: '0 32px'
        }} type='primary'
        >去支付</AtButton>
      </View>
    </View>
  )
}

export default ConfirmOrder
