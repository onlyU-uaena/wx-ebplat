import Taro, { useState, useEffect, useDidShow } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AtBadge, AtButton, AtCheckbox, AtListItem } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import user from '../../utils/user'
import colors from '../../../../common/styles/color'
import LimitStr from '@utils/stringLimit'
import { navTo } from '@utils/route'
import HeightView from '../../../../components/HeightView'
import EmptyPage from '../../../../components/EmptyPage'
import { setMessage, setNoMessage } from '@redux/actions'
import { setCartBadge } from '../../../shoppingCart/utils/shopCart'
import { selectAuthState } from '@redux/reducers/selector'

interface Props {

}

const MyMessage: Taro.FC<Props> = () => {
  const authState = useSelector(selectAuthState)
  const dispatch = useDispatch()
  const [messageList, setMessageList] = useState([])
  const [modifyMode, setModifyMode] = useState<boolean>(false)
  const [selectList, setSelectList] = useState([])
  const [allSelect, setAllSelect] = useState<string[]>([])

  const getList = async () => {
    const {data} = await user.getMessageList()
    setMessageList(data)
  }

  const toggleCheck = (e) => {
    if (e.length === messageList.length) {
      setAllSelect(['all'])
    } else {
      setAllSelect([])
    }
    setSelectList(e)
  }

  const selectAll = (e) => {
    console.log(e)
    if (e.length) {
      const allList = messageList.map(item => item.id)
      setSelectList(allList)
      setAllSelect(['all'])
    } else {
      setSelectList([])
      setAllSelect([])
    }
  }

  const deleteMessage = async () => {
    if (!selectList.length)
      return
    const {code} = await user.deleteMessage(selectList)
    if (code === 0) {
      Taro.showToast({
        title: '删除成功'
      })
      setSelectList([])
      setAllSelect([])
      getList()
      setModifyMode(false)
    }
  }

  const judgeMessage = async () => {
    if (authState.loginStatus) {
      const messageRes = await user.getMessageCount(1, 0)
      if (messageRes.data === 0)
        dispatch(setNoMessage())
    }
  }

  useDidShow(() => {
    getList()
  })

  return (
    <View>
      <TabBar title='消息列表'
              beforeBackFuc={() => judgeMessage()}
      />
      {messageList.length && (
        <Text className='smallMargin mediumText'
              onClick={() => setModifyMode(!modifyMode)}
              style={{
                display: 'block',
                textAlign: 'right',
                color: colors.themeColor
              }}
        >
          {modifyMode ? '返回' : '编辑'}
        </Text>
      )}
      <View className='normalMargin'>
        {messageList.length ? messageList.map(item => (
          <View className='normalMarginBottom commonRowFlex flexCenter'
                key={item.id}
                style={{
                  backgroundColor: 'white',
                  position: 'relative'
                }}
          >
            {item.status && (
              <View style={{
                position: 'absolute',
                right: 0,
                top: 0,
                width: '10px',
                height: '10px',
                borderRadius: '10px',
                backgroundColor: colors.themeColor
              }}
              />
            )}
            {modifyMode && (
              <AtCheckbox onChange={(e) => toggleCheck(e)}
                          options={[{
                            value: item.id,
                            label: ''
                          }]}
                          selectedList={selectList}
              />
            )}
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
          </View>
        )) : (
          <EmptyPage title='暂无消息' />
        )}
      </View>
      <HeightView high='large' />
      {modifyMode && (
        <View className='bottomGroup commonRowFlex'
              style={{
                backgroundColor: 'white'
              }}
        >
          <View className='commonRowFlex flexCenter normalMarginTop normalMarginBottom'
                style={{
                  flex: 1,
                  justifyContent: 'center'
                }}
          >
            <AtCheckbox onChange={(e) => selectAll(e)}
                        options={[{
                          value: 'all',
                          label: ''
                        }]}
                        selectedList={allSelect}
            />
            <Text className='mediumText'>全选</Text>
          </View>
          <View className='commonRowFlex flexCenter normalPaddingTop normalPaddingBottom gradientTheme'
                onClick={() => deleteMessage()}
                style={{
                  flex: 1,
                  justifyContent: 'center'
                }}
          >
            <Text className='mediumText whiteText'>删除</Text>
          </View>
        </View>
      )}
    </View>
  )
}

export default MyMessage
