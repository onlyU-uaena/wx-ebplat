import Taro, { useEffect, useReachBottom, useRouter, useState } from '@tarojs/taro'
import { Image, Text, View } from '@tarojs/components'
import './index.scss'
import { AtAvatar, AtRate, AtTabs } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import order from '../../../mine/utils/order'
import useRef = Taro.useRef
import { Comment } from '../../utils/interface'

interface Props {

}

const tabList = [{ title: '全部评价' }, { title: '好评' }, { title: '中评' }]

const starList = {
  0: -1,
  1: 2,
  2: 1
}

const AllComment: Taro.FC<Props> = () => {
  const router = useRouter()
  let {current: proId} = useRef()
  const [safeTop, setSafeTop] = useState<number>(0)
  const [page, setPage] = useState(1)
  const [commentList, setCommentList] = useState({list: []})
  const [currentTab, setCurrentTab] = useState<number>(0)

  useEffect(() => {
    const { safeArea } = Taro.getSystemInfoSync()
    setSafeTop(safeArea.top)
  }, [])

  const getList = async (defaultPage = 1, reset: boolean) => {
    const {data} = await order.getCommentList(defaultPage, 14, starList[currentTab], proId)
    if (reset) {
      setCommentList(data)
      setPage(page + 1)
    } else if (data.length) {
      setCommentList(commentList.concat(data))
      setPage(page + 1)
    }
  }

  useReachBottom(() => {
    getList(page, false)
  })

  useEffect(() => {
    setPage(1)
    proId = JSON.parse(router.params.props).sid
    getList(1, true)
  }, [currentTab])

  return (
    <View>
      <TabBar title='全部评价' />
      <View style={{
        position: 'fixed',
        top: `${safeTop + 40}px`,
        width: '100%',
        height: '47px',
        zIndex: 999
      }}
      >
        <AtTabs current={currentTab} tabList={tabList} onClick={setCurrentTab} />
      </View>
      <View style={{
        height: '47px'
      }}
      />
      <View style={{
        backgroundColor: 'white'
      }}
      >
        {commentList.list.map((item: Comment, index) => (
          <View key={index} className='normalPadding'>
            <View className='commonRowFlex flexCenter' style={{
              justifyContent: 'space-between'
            }}
            >
              <View className='commonRowFlex flexCenter'>
                <AtAvatar image={item.imgUrl} circle />
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
              {item.showImgList.length && <View className='commonRowFlex normalMarginTop' style={{
                justifyContent: 'space-between'
              }}
              >
                <Image src={item.showImgList[0] && item.showImgList[0].imgurl || ''} style={{width: '170rpx', height: '170rpx'}} />
                <Image src={item.showImgList[1] && item.showImgList[1].imgurl || ''} style={{width: '170rpx', height: '170rpx'}} />
                <Image src={item.showImgList[2] && item.showImgList[2].imgurl || ''} style={{width: '170rpx', height: '170rpx'}} />
              </View>}
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

export default AllComment
