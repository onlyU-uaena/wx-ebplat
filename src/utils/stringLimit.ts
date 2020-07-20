const LimitStr = (str: string, limit: number) => {
  if (!str)
    return
  if (str.length > limit) {
    return `${str.substring(0, limit)}...`
  } else return str
}

export default LimitStr
