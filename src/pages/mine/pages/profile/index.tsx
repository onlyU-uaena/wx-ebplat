import Taro, { useState, useEffect, useRef } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import './index.scss'
import { AtAvatar, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtInput } from 'taro-ui'
import TabBar from '../../../../components/TabBar'
import { useDispatch, useSelector } from '@tarojs/redux'
import InputCard from '../../../../components/InputCard'
import { selectAuthState } from '@redux/reducers/selector'
import HeightView from '../../../../components/HeightView'
import { baseUrl } from '@utils/request'
import CusModal from '../../../../components/CusModal'
import account from '../../utils/login'
import { loginIn, loginOut } from '@redux/actions'

interface Props {

}

let modalOnConfirm

const Profile: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const authState = useSelector(selectAuthState)

  const [nickname, setNickname] = useState<string>(authState.userData.nickname)
  const [imgurl, setImgurl] = useState<string>(authState.userData.imgurl)
  const [birthDay, setBirthDay] = useState<string>(authState.userData.birthdaystr)
  const [sex, setSex] = useState<string>(authState.userData.sex)
  const [userwork, setUserwork] = useState<string>(authState.userData.userwork)
  const [email, setEmail] = useState<string>(authState.userData.email)
  const [mobile, setMobile] = useState<string>(authState.userData.mobile)
  const [modalInputName, setModalInputName] = useState<string>('')
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalValue, setModalValue] = useState<string>()
  const [modalOnChange, setModalOnChange] = useState<string>()

  const chooseSex = () => {
    Taro.showActionSheet({
      itemList: ['男', '女'],
      success: function (res: any) {
        setSex(String(res.tapIndex + 1))
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  }

  const change = (index: number) => {
    const list = [setNickname, setUserwork, setEmail]
    const value = [nickname, userwork, email]
    const name = ['昵称', '职业', '邮箱']
    setModalOpen(true)
    setModalInputName(name[index])
    modalOnConfirm = list[index]
    setModalValue(value[index])
  }

  const confirmChange = () => {
    if (!modalOnChange)
      return Taro.showToast({
        title: '请勿提交空值',
        icon: 'none'
      })
    modalOnConfirm(modalOnChange)
    setModalOpen(false)
  }

  const chooseImagesListFn = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log(res)
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        Taro.uploadFile({
          url: baseUrl + '/img/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'token': Taro.getStorageSync('token'),
            'relationtype': 0,
            'ch': '3'
          },
          success: (successRes) => {
            console.log(successRes)
            const data = JSON.parse(successRes.data)
            setImgurl(data.data[0])
          }
        })

      }
    })
  }

  const backFuc = async () => {
    account.postUserInfo(imgurl, nickname, sex, birthDay, email, userwork)

    const { code, data } = await account.getUserData()
    if (!code) {
      dispatch(loginIn(data))
    } else {
      dispatch(loginOut())
    }
  }

  return (
    <View>
      <TabBar title='个人信息' beforeBackFuc={backFuc} />
      <InputCard title='头像'
                 onClick={chooseImagesListFn}
                 renderRight={
                   () => <AtAvatar size='normal' circle image={imgurl} />
                 }
      />
      <HeightView />
      <InputCard rightTitle={nickname} onClick={() => change(0)} title='修改昵称' />
      <InputCard title='绑定手机号' rightTitle={mobile} />
      <InputCard title='性别' onClick={chooseSex} rightTitle={sex ? sex === '1' ? '男' : '女' : ''} />
      <Picker mode='date' onChange={(e) => setBirthDay(e.detail.value)} value={birthDay}>
        <InputCard title='生日' rightTitle={birthDay} />
      </Picker>
      <InputCard title='职业' onClick={() => change(1)} rightTitle={userwork} />
      <HeightView />
      <InputCard title='实名认证' />
      <CusModal opened={modalOpen}
                title={'修改' + modalInputName}
                renderContent={
                  () => <AtInput name={modalInputName}
                                 value={modalValue}
                                 onChange={(e) => setModalOnChange(String(e))}
                  />
                }
                confirmRes={() => confirmChange()}
                cancelRes={() => setModalOpen(false)}
      />
    </View>
  )
}

export default Profile
