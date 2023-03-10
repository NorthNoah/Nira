import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { cleanObject, subset } from 'utils/index'

/**
 * 返回页面url中，指定键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams()
  const setSearchParams = useSetUrlSearchParam()
  const [stateKeys] = useState(keys)
  return [
    useMemo(
      () =>
        subset(Object.fromEntries(searchParams), stateKeys) as {
          [key in K]: string
        },
      [searchParams, stateKeys]
    ),

    // 对传入的键值对进行限制
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(params)
      // iterator
      // iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
    }
  ] as const
}

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams()
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      // 读取键值对，并且把entries转换为obj
      ...Object.fromEntries(searchParams),
      ...params
    }) as URLSearchParamsInit
    return setSearchParam(o)
  }
}
