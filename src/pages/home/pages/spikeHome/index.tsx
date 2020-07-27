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

// const tabList: Tab[] = [
//   {id: 1, img: '', name: '08:00', num: '', tagName: '抢购中'},
//   {id: 2, img: '', name: '10:00', num: '', tagName: '即将开始'},
//   {id: 3, img: '', name: '12:00', num: '', tagName: '即将开始'},
//   {id: 4, img: '', name: '15:00', num: '', tagName: '即将开始'}
// ]

const spikeStatus = {
  1: '进行中',
  2: '未开始',
  3: '已结束'
}

const SpikeHome: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const shopState = useSelector(selectShopState)
  const [topicId, setTopicId] = useState<number>()
  const [spikeList, setSpikeList] = useState()
  const [tabList, setTabList] = useState<Tab[]>()

  const getSpike = async () => {
    const {data} = await commodity.getSpikeList(shopState.shopData.shopid)
    setSpikeList(data)
    setTopicId(data[0].actid)
    const list = data.map((item, index) => {
      return {id: item.actid, img: '', name: item.endtime.substring(11, 16), num: '', tagName: spikeStatus[item.status]}
    })
    setTabList(list)
  }

  useEffect(() => {
    getSpike()
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
          {(spikeList && topicId) && spikeList.filter(item => item.actid === topicId).map(item => (
            <View key={item.actid}
                  className='normalMarginBottom'
                  onClick={() => navTo('home', 'productDetails', {id: item.skuid, actid: item.actid})}
            >
              {item.pros.map(shopItem => (
                <View key={shopItem.actid} className='radius'
                      style={{
                        backgroundColor: 'white'
                      }}
                >
                  <View className='commonRowFlex normalPadding'
                        style={{
                          justifyContent: 'space-between'
                        }}
                  >
                    <Image src={shopItem.imgurl}
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
                        <Text className='mediumText'>{LimitStr(shopItem.skuname, 12)}</Text>
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
                        <View>
                          <Text className='mediumText redText'>¥ {shopItem.activityprice}</Text>
                          <Text className='smallText throughLineText grayText smallMarginLeft'>¥ {shopItem.price}</Text>
                        </View>
                        <AtButton className=''
                                  size='small'
                                  type='primary'
                                  customStyle={{
                                    backgroundColor: 'rgb(235, 60, 74)',
                                    borderRadius: '4px',
                                    color: 'white'
                                  }}
                        >
                          马上抢 {`>`}
                        </AtButton>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default SpikeHome
