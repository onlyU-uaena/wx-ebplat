export const getCount = (timeStr, oldStr) => {
  const end_time = new Date(timeStr).getTime();
  const now_time = new Date(oldStr).getTime();

  const resetSec = end_time - now_time;

  const day = parseInt(resetSec/(60*60*24*1000))
  const hour = parseInt(resetSec/(60*60*1000)%24)
  const min = parseInt(resetSec/(60*1000)%60)
  const sec = parseInt(resetSec/1000%60)

  return {
    day, hour, min, sec
  }
}
