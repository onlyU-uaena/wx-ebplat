import Taro, { useState, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'

interface Props {
  onClick: () => Promise<boolean>
  title: string
}

const CountDownButton: Taro.FC<Props> = ({onClick, title}) => {
  const [disabled, setDisabled] = useState<boolean>(false)
  const [buttonTitle, setTitle] = useState<string>(title)
  const [second, setSecond] = useState<number>(60)

  useEffect(() => {
    if (disabled) {
      setTimeout(() => {
        if (second === 0) {
          setDisabled(false)
          setTitle(title)
          setSecond(60)
        } else {
          setTitle(`${second - 1}s`)
          setSecond(second - 1)
        }
      }, 1000)
    }
  }, [second, disabled, title])

  const startCount = async () => {
    const res = await onClick()
    console.log(res)
    if (res) {
      setDisabled(true)
    }
  }

  return (
    <AtButton type='primary' size='small' onClick={startCount} disabled={disabled}>{buttonTitle}</AtButton>
  )
}

export default CountDownButton
