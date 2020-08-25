import Taro, { useState, useEffect, useRef, useReachBottom } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Image, Text, View } from '@tarojs/components'
import './index.scss'
import { AtButton, AtTabs, AtTag } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import { navTo } from '@utils/route'
import LimitStr from '@utils/stringLimit'
import colors from '../../../../common/styles/color'
import order from '../../utils/order'
import EmptyPage from '../../../../components/EmptyPage'

interface Props {

}

const listStatus = {
  0:'团购进行中',
  1:'团购成功',
  2:'团购失败'
}

const tabList = [{ title: '团购进行中' }, { title: '团购成功' }, { title: '团购失败' }]

const MyGroup: Taro.FC<Props> = () => {
  const [safeTop, setSafeTop] = useState<number>(0)
  const dispatch = useDispatch()
  const [groupList, setGroupList] = useState([])
  const [page, setPage] = useState(1)
  const [currentTab, setCurrentTab] = useState<number>(0)

  useEffect(() => {
    const { safeArea } = Taro.getSystemInfoSync()
    setSafeTop(safeArea.top)
  }, [])

  const getList = async (defaultPage = 1, reset: boolean) => {
    const {data} = await order.getGroupList(defaultPage, 14, currentTab)
    if (reset) {
      setGroupList(data)
      setPage(page + 1)
    } else if (data.length) {
      setGroupList(groupList.concat(data))
      setPage(page + 1)
    }
  }

  useReachBottom(() => {
    getList(page, false)
  })

  useEffect(() => {
    setPage(1)
    getList(1, true)
  }, [currentTab])

  return (
    <View>
      <TabBar title='我的拼团' />
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
      <View className='normalMargin'>
        {groupList.length ? groupList.map(item => (
          <View key={item.actid} className='commonRowFlex normalPadding normalMarginBottom radius'
                onClick={() => navTo('mine', 'groupDetail', {ugnum: item.ugnum, outer: false})}
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'space-between'
                }}
          >
            <Image src={item.proimg}
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
                <Text className='mediumText'>{LimitStr(item.proname, 12)}</Text>
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
                  >{item.gcount}人团</AtTag>
                  <View>
                    <Text className='mediumText redText'>¥ {item.price}</Text>
                    <Text className='smallText throughLineText grayText smallMarginLeft'>¥ {item.oldprice}</Text>
                  </View>
                </View>
                <View className='commonColumnFlex radius'
                      onClick={e => e.stopPropagation()}
                      style={{
                        width: '80px',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end'
                      }}
                >
                  <Text className='redText mediumText'>
                    {listStatus[item.status]}
                  </Text>
                  {item.status === 0 ? null : (
                    <AtButton type='primary' onClick={() => navTo('home', 'groupHome')} size='small'>再次拼团</AtButton>
                  )}
                </View>
              </View>
            </View>
          </View>
        )) : (
          <EmptyPage title='无拼团订单' />
        )}
      </View>
    </View>
  )
}

export default MyGroup
