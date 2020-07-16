// 防抖装饰器
export const debounceFunc = (waitTime: number) => {
  let timer: NodeJS.Timeout
  return (target: any, name: string, descriptor: any) => {
    const func = descriptor.value
    if (typeof func === 'function') {
      descriptor.value = function(...args: any) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this, args)
        }, waitTime)
      }
    }
  }
}

// 节流装饰器
export const throttleFunc = (waitTime: number) => {
  let prev = new Date().valueOf()
  return (target: any, name: string, descriptor: any) => {
    const func = descriptor.value
    if (typeof func === 'function') {
      descriptor.value = function (...args: any) {
        const now = new Date().valueOf()
        if (now - prev > waitTime) {
          prev = new Date().valueOf()
          return func.apply(this, args)
        }
      }
    }
  }
}

// 空值检测装饰器
export const noEmpty = (failedCallback: () => void) => {
  return (target: any, name: string, descriptor: any) => {
    const func = descriptor.value
    if (typeof func === 'function') {
      descriptor.value = function (...args: any) {
        for (const item of args) {
          if (!item) {
            failedCallback()
            return
          }
        }
        return func.apply(this, args)
      }
    }
  }
}
