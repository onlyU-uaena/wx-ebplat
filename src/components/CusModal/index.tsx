import Taro, { useState, useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { Button, View } from '@tarojs/components'
import './index.scss'
import { AtButton, AtInput, AtModal, AtModalAction, AtModalContent, AtModalHeader } from 'taro-ui'

interface Props {
  opened: boolean
  title: string
  renderContent: any
  confirmRes: () => void
  cancelRes: () => void
}

const CusModal: Taro.FC<Props> = (props) => {
  const {title, renderContent, confirmRes, opened, cancelRes} = props

  return (
    <AtModal isOpened={opened}>
      <AtModalHeader>{title}</AtModalHeader>
      <AtModalContent>
        {renderContent()}
      </AtModalContent>
      <AtModalAction> <Button onClick={() => cancelRes()}>取消</Button> <Button onClick={() => confirmRes()}>确定</Button> </AtModalAction>
    </AtModal>
  )
}

export default CusModal
