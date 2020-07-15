import Taro, { useState, useEffect, useReachBottom } from "@tarojs/taro"
import { View, Text, Swiper, SwiperItem, Image, ScrollView } from '@tarojs/components'
import TabBar from '../../components/TabBar'
import './index.scss'
import { getLocation } from '@utils/getLocation'
import { AtAvatar, AtCountdown, AtTag } from 'taro-ui'
import CustomIcon from '../../components/CustomIcon'
import SwiperImg from '../../components/SwiperImg'
import { classificationList, commodity, fightTogether, hotShopping, imgList, spikeList, tabs } from './mock'
import FreshList, { FreshListInterface } from '../../components/FreshList'
import CusTabs from '../../components/CusTabs'

interface Props {

}

const Home: Taro.FC<Props> = () => {
  const [location, setLocation] = useState<string>('')
  const [freshList, setFreshList] = useState<FreshListInterface>()

  useReachBottom(() => {
    if (freshList)
      freshList.nextPage()
  })

  useEffect(() => {
    const getLocationMes = async () => {
      const res = await getLocation()
      setLocation(res)
    }
    getLocationMes()
  }, [])

  return (
    <View>
      {/*首页顶部*/}
      <TabBar title='首页' hideContent />
      <View className='topBackground gradientTheme' />
      <View
        className='headerAndTitle commonRowFlex'
        style={{
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}
      >
        <View
          className='commonRowFlex'
          style={{
            alignItems: 'center'
          }}
        >
          <CustomIcon size={20} name='location' color='white' />
          <Text
            className='mediumText'
            style={{
              color: 'white',
              marginLeft: '8Px'
            }}
          >
            {location}
          </Text>
        </View>
      </View>
      <View
        className='commonRowFlex flexCenter'
        style={{
          justifyContent: 'space-between'
        }}
      >
        <View className='cusSearchBar flexCenter commonRowFlex'>
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
        <View
          className='commonColumnFlex flexCenter'
          style={{
            marginRight: '16px'
          }}
        >
          <CustomIcon name='ring' color='white' size={25} />
          <Text className='smallText whiteText'>消息</Text>
        </View>
      </View>
      {/*首页banner*/}
      <View
        style={{
          margin: '0 16px 8px 16px'
        }}
      >
        <SwiperImg imgUrl={imgList}>
        </SwiperImg>
      </View>
      <View
        className='commonRowFlex'
        style={{
          margin: '8px 16Px',
          justifyContent: 'space-around'
        }}
      >
        <View className='commonRowFlex flexCenter'>
          <CustomIcon name='diamond' color='gray' size={15} style={{marginRight: '8px'}} />
          <Text className='slightlySmallText grayText'>品质好物</Text>
        </View>
        <View className='commonRowFlex flexCenter'>
          <CustomIcon name='lightning' color='gray' size={15} style={{marginRight: '8px'}} />
          <Text className='slightlySmallText grayText'>急速送达</Text>
        </View>
        <View className='commonRowFlex flexCenter'>
          <CustomIcon name='heart' color='gray' size={15} style={{marginRight: '8px'}} />
          <Text className='slightlySmallText grayText'>无忧售后</Text>
        </View>
      </View>
      {/*栏目分类*/}
      <View className='commonRowFlex'
        style={{
          justifyContent: 'space-between',
          margin: '0 16px'
        }}
      >
        {classificationList.map((item, index) => (
          <View className='commonColumnFlex flexCenter' key={index}>
            <AtAvatar size='large' image={item.img} circle />
            <Text className='slightlySmallText' style={{marginTop: '4px'}}>{item.name}</Text>
          </View>
        ))}
        <View className='commonColumnFlex flexCenter'>
          <AtAvatar size='large' image='http://www.gx8899.com/uploads/allimg/160825/3-160R5093948-52.jpg' circle />
          <Text className='slightlySmallText' style={{marginTop: '4px'}}>查看更多</Text>
        </View>
      </View>
      {/*促销活动*/}
      <View
        style={{
          margin: '16px 16px 0 16px',
        }}
      >
        <SwiperImg
          imgUrl={imgList}
          marginRight={20}
          autoplay={false}
          circular={false}
          imgWidth={95}
          swiperHeight='100px'
        />
      </View>
      <View className='commonRowFlex'
        style={{
          margin: '16px 16px 0 16px',
        }}
      >
        {/*秒杀*/}
        <View className='commonColumnFlex'
          style={{
            background: 'linear-gradient(to left top, white, rgb(253, 246, 246))',
            borderRadius: '15PX',
            padding: '8px',
            flex: 1,
            marginRight: '8px'
          }}
        >
          <View className='commonRowFlex'
            style={{
              justifyContent: 'space-between'
            }}
          >
            <Text>今日秒杀</Text>
            <View className='countDown commonRowFlex'>
              <CustomIcon name='lightning' color='white' size={15} style={{marginLeft: '4px'}} />
              <AtCountdown
                format={{
                  hours: ':',
                  minutes: ':',
                  seconds: ''
                }}
                hours={1}
                minutes={1}
                seconds={10}
                onTimeUp={() => {}}
              />
            </View>
          </View>
          <Text className='slightlySmallText redText'>拼手速 低价抢好物</Text>
          <View className='commonRowFlex'
            style={{
              justifyContent: 'space-around',
              marginTop: '8px'
            }}
          >
            {spikeList.map((item, index) => (
              <View className='commonColumnFlex flexCenter'
                key={index}
                style={{
                  justifyContent: 'center',
                  flex: 1,
                }}
              >
                <AtAvatar image={item.imgUrl} />
                <View className='commonRowFlex flexCenter'>
                  <Text className='slightlySmallText'>
                    ¥ {item.price}
                  </Text>
                  <Text className='smallText grayText'
                        style={{
                          marginLeft: '4px',
                          textDecoration: 'line-through'
                        }}
                  >
                    ¥ {item.oldPrice}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        {/*拼团*/}
        <View className='commonColumnFlex'
              style={{
                backgroundColor: 'white',
                borderRadius: '15PX',
                padding: '8px',
                flex: 1,
              }}
        >
          <View className='commonRowFlex'
                style={{
                  justifyContent: 'space-between'
                }}
          >
            <Text>拼团特惠</Text>
          </View>
          <Text className='slightlySmallText grayText'>拼团享特价优惠</Text>
          <View className='commonRowFlex'
                style={{
                  justifyContent: 'space-around',
                  marginTop: '8px'
                }}
          >
            {fightTogether.map((item, index) => (
              <View className='commonColumnFlex flexCenter'
                    key={index}
                    style={{
                      justifyContent: 'center',
                      flex: 1,
                    }}
              >
                <AtAvatar image={item.imgUrl} />
                <View className='commonRowFlex flexCenter'>
                  <AtTag size='small' circle active>{`${item.person}人团${item.price}`}</AtTag>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
      {/*热门活动*/}
      <View className='normalMarginTop'
            style={{
              position: 'relative'
            }}
      >
        <View className='titleWithColor' />
        <Text className='boldText'
              style={{
                marginLeft: '16px'
              }}
        >热销排行榜</Text>
      </View>
      <View className='radius normalMargin'
            style={{
              backgroundColor: 'white'
            }}
      >
        <ScrollView scrollX>
          <View className='commonRowFlex'>
            {hotShopping.map((item, index) => (
              <View className='normalMargin commonColumnFlex flexCenter' key={index}>
                <AtAvatar size='large' image={item.imgUrl} />
                <Text className='mediumText smallMarginTop smallMarginBottom'>{item.name}</Text>
                <View className='commonRowFlex flexCenter'
                      style={{
                        justifyContent: 'space-between',
                        width: '100%'
                      }}
                >
                  <View className='commonColumnFlex'>
                    <Text className='slightlySmallText redText'>¥ {item.price}</Text>
                    <Text className='smallText throughLineText grayText'>¥ {item.oldPrice}</Text>
                  </View>
                  <CustomIcon name='add' color='rgb(239, 154, 151)' size={25} />
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      {/*商品列表*/}
      <CusTabs tabs={tabs} active={1} changeTab={(e) => console.log(e)} />
      <View className='normalMarginLeft normalMarginRight'>
        <FreshList beRenderList={commodity} onRef={setFreshList} />
      </View>
    </View>
  )
}

export default Home
