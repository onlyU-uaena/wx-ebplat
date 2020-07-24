import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Image, Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton, AtProgress, AtTag } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import commodity from '../../utils/commodity'
import { selectShopState } from '@redux/reducers/selector'
import LimitStr from '@utils/stringLimit'
import CustomIcon from '../../../../components/CustomIcon'
import colors from '../../../../common/styles/color'
import { navTo } from '@utils/route'
import CusTabs from '../../../../components/CusTabs'

interface Props {

}

interface Tab {
  id: number
  img: string
  name: string
  num: string
  tagName: string
}

const tabList: Tab[] = [
  {id: 1, img: '', name: '08:00', num: '', tagName: '抢购中'},
  {id: 2, img: '', name: '10:00', num: '', tagName: '即将开始'},
  {id: 3, img: '', name: '12:00', num: '', tagName: '即将开始'},
  {id: 4, img: '', name: '15:00', num: '', tagName: '即将开始'}
]

const SpikeHome: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const shopState = useSelector(selectShopState)
  const [topicId, setTopicId] = useState<number>()

  const getSpike = async () => {
    commodity.getSpikeList(shopState.shopData.shopid)
  }

  useEffect(() => {

  }, [])

  return (
    <View>
      <TabBar title='秒杀活动' />
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
        <View className='normalMarginTop'>
          <CusTabs tabs={tabList} active={1} changeTab={(id) => setTopicId(id)} defaultTab={false} />
        </View>
        <View>
          <View className='radius'
                style={{
                  backgroundColor: 'white'
                }}
          >
            <View className='commonRowFlex normalPadding borderBottom'
                  style={{
                    justifyContent: 'space-between'
                  }}
            >
              <Image src='http://www.gx8899.com/uploads/allimg/160825/3-160R5093948-52.jpg'
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
                  <Text className='mediumText'>{LimitStr('测试商品', 12)}</Text>
                </View>
                <View style={{
                  width: '70%'
                }}
                >
                  <AtProgress percent={50}
                              status='progress'
                              color={colors.themeRed}
                  />
                </View>
                <View className='commonRowFlex flexCenter'
                      style={{
                        justifyContent: 'space-between'
                      }}
                >
                  <Text className='mediumText redText'>¥ {40}</Text>
                  {/*{oldPrice && <Text className='smallText grayText smallMarginLeft'>¥ {60}</Text>}*/}
                  <AtButton className=''
                            size='small'
                            type='primary'
                            customStyle={{
                              backgroundColor: 'rgb(235, 60, 74)',
                              borderRadius: '4px',
                              color: 'white'
                            }}
                  >
                    马上抢 >
                  </AtButton>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default SpikeHome
