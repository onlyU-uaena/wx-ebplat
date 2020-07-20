const ChangeImg = (str: string) => {
  return str.replace(/\<img/gi, '<img style="max-width:96%;display:block;height:auto;margin:0.4rem 2%;"')
}

export default ChangeImg
