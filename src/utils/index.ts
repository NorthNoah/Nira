import { useEffect, useRef, useState } from 'react'
// 防止value为0被误删
export const isFalsy = <T>(value: T) => (value === 0 ? false : !value)

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
  return res
}

// useMount:开始时只执行一次
export const useMount = (callback: () => void) => {
  // 内部采用空置的dep实现
  useEffect(() => {
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export const useDebounce = <T>(value: T, delay?: number) => {
  const [debouncedVal, setDebouncedVal] = useState(value)

  useEffect(() => {
    // 每次value变化,都会设置一个定时器
    const timeout = setTimeout(() => setDebouncedVal(value), delay) //宏任务
    // useEffect每执行一次,都会立即清理上次的计时器
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedVal
}

// 改变页面标题
export const useDocumentTitle = (title: string, keepOnMount = true) => {
  // 通过useRef保存了之前的旧title变量,使其不会因为重新渲染而发生改变
  const oldTitle = useRef(document.title).current

  useEffect(() => {
    document.title = title
  }, [title])

  // 当前页面组件卸载，则回到旧标题
  useEffect(() => {
    return () => {
      if (!keepOnMount) {
        document.title = oldTitle
      }
    }
  }, [keepOnMount, oldTitle])
}

export const resetRoute = () => {
  window.location.href = window.location.origin
}
