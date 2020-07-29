import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Image, Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton, AtTag } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import commodity from '../../utils/commodity'
import { selectShopState } from '@redux/reducers/selector'
import LimitStr from '@utils/stringLimit'
import colors from '../../../../common/styles/color'
import { navTo } from '@utils/route'
import CustomIcon from '../../../../components/CustomIcon'
import HeightView from '../../../../components/HeightView'

interface Props {

}

const GroupHome: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const shopState = useSelector(selectShopState)
  const [groupList, setGroupList] = useState()

  const getGroup = async () => {
    const {data} = await commodity.getGroupList(shopState.shopData.shopid || 10)
    setGroupList(data)
  }

  useEffect(() => {
    getGroup()
  }, [])

  useEffect(() => {

  }, [])

  return (
    <View>
      <TabBar title='拼团' />
      <Image src='http://www.gx8899.com/uploads/allimg/160825/3-160R5093948-52.jpg'
             style={{
               height: '140px',
               width: '100%'
             }}
      >
      </Image>
      <View className='normalPadding'>
        <View className='cusSearchBar flexCenter commonRowFlex'
              onClick={() => navTo('home', 'search')}
        >
          <CustomIcon
            name='search'
            size={25}
            color='gray'
            style={{
              margin: '0 12px'
            }}
          />
          <Text
            className='mediumText'
            style={{
              color: 'gray'
            }}
          >
            请输入关键字搜索
          </Text>
        </View>
        <HeightView high='normal' />
        <View className='radius'
              style={{
                backgroundColor: 'white'
              }}
        >
          {groupList && groupList.map(item => (
            <View key={item.actid} className='commonRowFlex normalPadding'
                  onClick={() => navTo('home', 'productDetails', {id: item.skuid, actid: item.actid, showGroup: true})}
                  style={{
                    justifyContent: 'space-between'
                  }}
            >
              <Image src={item.imgurl}
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
                  <Text className='mediumText'>{LimitStr(item.skuname, 12)}</Text>
                </View>
                <View className='commonRowFlex'
                      style={{
                        justifyContent: 'space-between'
                      }}
                >
                  <View className='commonColumnFlex'
                        style={{
                          justifyContent: 'space-between'
                        }}
                  >
                    <AtTag customStyle={{
                      backgroundColor: colors.themeRed,
                      color: 'white'
                    }}
                           circle
                           size='small'
                           type='primary'
                    >已拼{item.activitystock}件</AtTag>
                    <Text className='mediumText redText'>¥ {item.activityprice}</Text>
                    {/*{oldPrice && <Text className='smallText grayText smallMarginLeft'>¥ {60}</Text>}*/}
                  </View>
                  <View className='commonColumnFlex radius' style={{
                    width: '80px'
                  }}
                  >
                    <View className='commonRowFlex topBorder' style={{
                      backgroundColor: 'rgb(253, 245, 245)',
                      padding: '4px',
                      justifyContent: 'center'
                    }}
                    >
                      <Text className='redText slightlySmallText'>{item.tgcount}人团</Text>
                    </View>
                    <View className='gradientRed commonRowFlex bottomBorder'
                          style={{
                            padding: '4px',
                            justifyContent: 'center'
                          }}
                    >
                      <Text className='whiteText slightlySmallText'>立即开团</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default GroupHome
