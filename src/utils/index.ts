import { useEffect, useState } from 'react'
type value = string | number
// 防止value为0被误删
export const isFalsy = (value: value) => (value === 0 ? false : !value)

// 清除value为空的key
export const cleanObject = (obj: object) => {
  const res = { ...obj }
  Object.keys(obj).forEach((key) => {
    // @ts-ignore
    const val = obj[key]
    // 当val为空时，删除res中对应的key键
    // @ts-ignore
    if (isFalsy(val)) {
      // @ts-ignore
      delete res[key]
    }
  })
  console.log(res)
  return res
}

// useMount:开始时只执行一次
export const useMount = (callback: () => void) => {
  // 内部采用空置的dep实现
  useEffect(() => {
    callback()
  }, [])
}

// 手写debounce
// const debounce = (func, delay) => {
//   let timeout
//   return (...param) => {
//     if (timeout) {
//       clearTimeout(timeout)
//     }
//     timeout = setTimeout(function() {
//       func(...param)
//     }, delay)
//   }
// }

export const useDebounce = (value: any, delay?: number) => {
  const [debouncedVal, setDebouncedVal] = useState(value)

  useEffect(() => {
    // 每次value变化,都会设置一个定时器
    const timeout = setTimeout(() => setDebouncedVal(value), delay) //宏任务
    // useEffect每执行一次,都会立即清理上次的计时器
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedVal
}
