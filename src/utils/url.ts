import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'
import { cleanObject, subset } from 'utils/index'

/**
 * 返回页面url中，指定键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams()
  return [
    useMemo(
      () =>
        subset(Object.fromEntries(searchParams), keys) as {
          [key in K]: string
        },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),

    // 对传入的键值对进行限制
    (params: Partial<{ [key in K]: unknown }>) => {
      // iterator
      // iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
      const o = cleanObject({
        // 读取键值对，并且把entries转换为obj
        ...Object.fromEntries(searchParams),
        ...params
      }) as URLSearchParamsInit
      return setSearchParam(o)
    }
  ] as const
}
