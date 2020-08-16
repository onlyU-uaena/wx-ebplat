export const getCount = (timeStr, oldStr) => {
  const end_time = dateToTimestamp(timeStr)
  const now_time = dateToTimestamp(oldStr)

  const resetSec = end_time - now_time;

  console.log(end_time, now_time, resetSec)

  const day = parseInt(resetSec/(60*60*24*1000))
  const hour = parseInt(resetSec/(60*60*1000)%24)
  const min = parseInt(resetSec/(60*1000)%60)
  const sec = parseInt(resetSec/1000%60)

  return {
    day, hour, min, sec
  }
}

const dateToTimestamp = (dateStr) => {
  if (!dateStr) {
    return ''
  }
  const newDataStr = dateStr.replace(/\.|\-/g, '/')
  const date = new Date(newDataStr);
  const timestamp = date.getTime();
  return timestamp
}
