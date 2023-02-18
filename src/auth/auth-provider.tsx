// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发

import { User } from 'pages/project-list/search-panel'

const apiUrl = 'http://localhost:3001'

const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  console.log(user)
  return user
}

export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async (response) => {
    if (response.ok) {
      const res = await response.json()
      console.log(res)
      return handleUserResponse(res)
    } else {
      return Promise.reject(data)
    }
  })
}

export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async (response) => {
    // 注意对成功/失败情况都要处理
    if (response.ok) {
      return handleUserResponse(await response.json())
    } else {
      return Promise.reject(data)
    }
  })
}

export const logout = async () => window.localStorage.removeItem(localStorageKey)