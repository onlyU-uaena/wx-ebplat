import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { WebView } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'

interface Props {

}

const WebPage: Taro.FC<Props> = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [url, setUrl] = useState<string>('')

  useEffect(() => {
    const propUrl = JSON.parse(router.params.props).url
    setUrl(propUrl)
  },[])

  return (
    <WebView src={url} onMessage={() => {}} />
  )
}

export default WebPage
