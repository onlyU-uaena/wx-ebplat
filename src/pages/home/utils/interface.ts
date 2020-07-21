export interface GetAdv {
  list: [{
    id: number
    imgurl: string
    pagemark: number
    position: number
    sort: number
    type: number
    typeid: number
    typename: string
    url: string
  }]
}

export interface GetTopicSku {
  id: number
  img: string
  name: string
  num: string
}

export interface Comment {
  title: string
  star: number
  username: string
  id: number
  createtime: string
  content: string
  showImgList: {
    imgurl: string
    id: number
  }[]
}
