// 防抖装饰器
export const debounceFunc = (waitTime: number) => {
  let timer: NodeJS.Timeout
  return (target: any, name: string, descriptor: any) => {
    const func = descriptor.value
    if (typeof func === 'function') {
      descriptor.value = async function (...args: any) {
        return new Promise(resolve => {
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            resolve(func.apply(this, args))
          }, waitTime)
        })
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
        } else console.log('节流拦截')
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
          if (typeof(item) == "undefined" || item === '') {
            console.log('检测到空值')
            failedCallback()
            return
          }
        }
        return func.apply(this, args)
      }
    }
  }
}
