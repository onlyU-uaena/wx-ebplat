import Taro, { useState, useEffect } from "@tarojs/taro"
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import TabBar from '../../components/TabBar'
import './index.scss'
import { getLocation } from '@utils/getLocation'
import { AtAvatar, AtCountdown } from 'taro-ui'
import CustomIcon from '../../components/CustomIcon'
import SwiperImg from '../../components/SwiperImg'
import { classificationList, imgList } from './mock'

interface Props {
}

const Home: Taro.FC<Props> = () => {
  const [location, setLocation] = useState<string>('')

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
          <View className='commonColumnFlex flexCenter'>
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
            padding: '8px',
            flex: 1,
            marginRight: '16px'
          }}
        >
          <View className='commonRowFlex'
            style={{
              justifyContent: 'space-between'
            }}
          >
            <Text>今日秒杀</Text>
            <View className='countDown'>
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
        </View>
        {/*拼团*/}
        <View className='commonColumnFlex'
          style={{
            flex: 1
          }}
        >

        </View>
      </View>
    </View>
  )
}

export default Home
