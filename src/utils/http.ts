import qs from 'qs'
import * as auth from 'auth/auth-provider'
import { useAuth } from 'context/auth-context'

const apiUrl = 'http://localhost:3001'

// 对标准的RequestInit类型进行扩展
interface Config extends RequestInit {
  token?: string
  data?: object
}

// 参数:输入的方法\config;返回值为data
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    // 如果传入POST方法，则会覆盖GET方法
    ...customConfig
  }

  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }

  // axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (response) => {
    if (response.status === 401) {
      await auth.logout()
      window.location.reload()
      return Promise.reject({ message: '请重新登录' })
    }
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

// 需要编写useHttp来将token自动注入,返回请求的数据
export const useHttp = () => {
  const { user } = useAuth()
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token })
}
