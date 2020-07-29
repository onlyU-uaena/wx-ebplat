const TurnToTime = (mss: number) => {
  const days = parseInt(String(mss / (1000 * 60 * 60 * 24)));
  const hours = parseInt(String((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const minutes = parseInt(String((mss % (1000 * 60 * 60)) / (1000 * 60)));
  const seconds = (mss % (1000 * 60)) / 1000;
  return days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
}
