import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Image, Text, View, RichText, Button } from '@tarojs/components'
import './index.scss'
import { AtAvatar, AtButton, AtRate } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import commodity from '../../utils/commodity'
import SwiperImg from '../../../../components/SwiperImg'
import CustomIcon from '../../../../components/CustomIcon'
import InputCard from '../../../../components/InputCard'
import { Comment } from '../../utils/interface'
import HeightView from '../../../../components/HeightView'
import colors from '../../../../common/styles/color'

interface Props {

}

const tabList = ['商品', '评价', '详情', '推荐']

const ProductDetails: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    getDetail()
  }, [])

  const [currentTab, setCurrentTab] = useState<number>(0)
  const [proDetail, setProDetail] = useState({})
  const [favorites, setFavorites] = useState<boolean>(false)

  const getDetail = async () => {
    console.log()
    const {data} = await commodity.getDetail(JSON.parse(router.params.props).id)
    setProDetail(data)
    setFavorites(data.isfavorites)
  }

  const collect = async () => {
    if (!favorites) {
      const {data, code} = await commodity.collect(proDetail.id)
      if (!code) {
        setFavorites(true)
        await Taro.showToast({
          title: '收藏成功'
        })
      }
    } else {
      const {data, code} = await commodity.cancelCollect(proDetail.id)
      if (!code) {
        setFavorites(false)
        await Taro.showToast({
          title: '取消成功'
        })
      }
    }
  }

  const chooseTab = (index: number) => {
    setCurrentTab(index)
    Taro.pageScrollTo({
      selector: `#detail${index}`
    })
  }

  return (
    <View>
      <TabBar title='商品详情' />
      {/*锚点*/}
      <View className='gradientTheme commonRowFlex' style={{
        justifyContent: 'space-around',
        padding: '8px 32px',
        position: 'fixed',
        width: '100%',
        top: '60px',
        zIndex: 999
      }}
      >
        {tabList.map((item, index) => (
          <Text className={currentTab === index ? 'whiteText tabText' : 'whiteText'} onClick={() => chooseTab(index)} key={index}>{item}</Text>
        ))}
        <View style={{
          position: 'absolute',
          right: '20rpx'
        }}
        >
          <Button openType='share' style={{
            backgroundColor: 'rgba(0, 0, 0, 0)',
            padding: 0,
            lineHeight: 0,
            overflow: 'inherit'
          }}
          >
            <CustomIcon name='share' size={20} color='white' />
          </Button>
        </View>
      </View>
      {proDetail.id && (
        <View id='detail0'>
          {/*轮播图*/}
          {proDetail && <SwiperImg swiperHeight='300px' list={proDetail.imgs} />}
          {/*标题*/}
          <View className='normalPadding commonColumnFlex' style={{
            backgroundColor: 'white'
          }}
          >
            <View className='commonRowFlex flexCenter' style={{
              justifyContent: 'space-between'
            }}
            >
              <Text className='mediumText'>{proDetail.title}</Text>
              <CustomIcon name='collect' onClick={() => collect()} color={favorites ? colors.themeRed : colors.lightGray} size={20} />
            </View>
            <Text className='slightlySmallText grayText'>{proDetail.subtitle}</Text>
            <View className='commonRowFlex normalMarginTop'
                  style={{
                    justifyContent: 'space-between'
                  }}
            >
              <View className='commonRowFlex' style={{
                alignItems: 'flex-end'
              }}
              >
                <Text className='mediumText redText'>¥{proDetail.price}</Text>
                {/*<Text className='slightlySmallText grayText smallMarginLeft'>¥ {}</Text>*/}
              </View>
              <Text className='slightlySmallText grayText'>{`已售${proDetail.salescount}份`}</Text>
            </View>
          </View>
          <View id='detail1' className='smallMarginTop'>
            <InputCard title='选择包装' onClick={() => Taro.showToast({title: '暂无包装', icon: 'none'})} link />
            <InputCard title={`商品评价(${proDetail.cmtcount})`} renderRight={() => <Text className='redText slightlySmallText'>{`好评率：${proDetail.cmtgood}`}</Text>} link={false} />
          </View>
          {/*评论*/}
          <View style={{
            backgroundColor: 'white'
          }}
          >
            {proDetail.cmts.map((item: Comment, index) => (
              <View key={index} className='normalPadding'>
                <View className='commonRowFlex flexCenter' style={{
                  justifyContent: 'space-between'
                }}
                >
                  <View className='commonRowFlex flexCenter'>
                    <AtAvatar circle />
                    <View className='normalMarginLeft commonColumnFlex'>
                      <Text>{item.username}</Text>
                      <Text className='slightlySmallText grayText'>{item.createtime}</Text>
                    </View>
                  </View>
                  <AtRate value={item.star} />
                </View>
                <View style={{
                  marginLeft: '120rpx'
                }}
                >
                  <Text className='mediumText grayText'>
                    {item.content}
                  </Text>
                  {item.ShowImgList.length && <View className='commonRowFlex normalMarginTop' style={{
                    justifyContent: 'space-between'
                  }}
                  >
                    <Image src={item.ShowImgList[0].imgurl || ''} style={{width: '170rpx', height: '170rpx'}} />
                    <Image src={item.ShowImgList[1].imgurl || ''} style={{width: '170rpx', height: '170rpx'}} />
                    <Image src={item.ShowImgList[2].imgurl || ''} style={{width: '170rpx', height: '170rpx'}} />
                  </View>}
                </View>
              </View>
            ))}
          </View>
          {/*商品图*/}
          <Text id='detail2' className='mediumText normalPadding borderBottom' style={{
            backgroundColor: 'white',
            display: 'block'
          }}
          >商品详情</Text>
          <RichText nodes={proDetail.description.replace(/\<img/gi, '<img style="max-width:96%;display:block;height:auto;margin:0.4rem 2%;"')} />
          {/*售后*/}
          <RichText nodes={proDetail.afterservice.replace(/\<img/gi, '<img style="max-width:96%;display:block;height:auto;margin:0.4rem 2%;"')} />
          <HeightView high='large' />
          <HeightView high='large' />
          {/*底部按钮*/}
          <View className='bottomGroup commonRowFlex'>
            <View className='commonColumnFlex smallMarginTop smallMarginBottom normalMarginLeft normalMarginRight'>
              <CustomIcon name='customerService' size={20} color='gray' />
              <Text className='slightlySmallText grayText'>客服</Text>
            </View>
            <View className='commonColumnFlex smallMarginTop smallMarginBottom normalMarginRight'>
              <CustomIcon name='shop' size={20} color='gray' />
              <Text className='slightlySmallText grayText'>购物车</Text>
            </View>
            <View className='commonRowFlex' style={{
              flex: 1
            }}
            >
              <View className='gradientYellow commonRowFlex flexCenter' style={{
                flex: 1,
                justifyContent: 'center'
              }}
              >
                <Text className='whiteText slightlySmallText'>加入购物车</Text>
              </View>
              <View className='gradientTheme commonRowFlex flexCenter' style={{
                flex: 1,
                justifyContent: 'center'
              }}
              >
                <Text className='whiteText slightlySmallText'>立即购买</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

export default ProductDetails
