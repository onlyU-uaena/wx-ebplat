import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { View } from '@tarojs/components'
import './index.scss'
import { AtBadge, AtButton, AtListItem } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import user from '../../utils/user'
import colors from '../../../../common/styles/color'
import LimitStr from '@utils/stringLimit'
import { navTo } from '@utils/route'

interface Props {

}

const MyMessage: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const [messageList, setMessageList] = useState()

  const getList = async () => {
    const {data} = await user.getMessageList()
    setMessageList(data)
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <View>
      <TabBar title='消息列表' />
      <View className='normalMargin'>
        {messageList && messageList.map(item => (
          <View className='normalMarginBottom'
                key={item.id}
                style={{
                  backgroundColor: 'white'
                }}
          >
            {item.status ? (
              <AtBadge dot>
                <AtListItem
                  title={item.title}
                  note={LimitStr(item.content, 10)}
                  extraText={item.sendtime}
                  onClick={() => navTo('mine', 'messageDetail', {id: item.id})}
                  iconInfo={{
                    size: 25,
                    color: colors.themeColor,
                    value: 'message',
                  }}
                />
              </AtBadge>
            ) : (
              <AtListItem
                title={item.title}
                note={LimitStr(item.content, 10)}
                onClick={() => navTo('mine', 'messageDetail', {id: item.id})}
                extraText={item.sendtime}
                iconInfo={{
                  size: 25,
                  color: colors.themeColor,
                  value: 'message',
                }}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  )
}

export default MyMessage
