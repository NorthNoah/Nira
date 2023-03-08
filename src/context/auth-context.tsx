import React, { ReactNode, useCallback } from 'react'
import * as auth from 'auth/auth-provider'
import { User } from 'pages/project-list/search-panel'
import { http } from 'utils/http'
import { useMount } from 'utils'
import { useAsync } from 'utils/use-async'
import { FullPageErrorFallback, FullPageLoading } from 'components/lib'
import * as authStore from 'store/auth.slice'
import { useDispatch, useSelector } from 'react-redux'
import { bootstrap, selectUser } from 'store/auth.slice'
export interface AuthForm {
  username: string
  password: string
}

// 登录持久化实现
// 每次刷新先对User进行初始化,首先尝试获取localStorage中的token
export const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    // 若token存在,则带着本地存储中的token去请求数据
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

// 确定AuthProvider的类型,放在APP.tsx中实际使用
// 传入children节点，含义是嵌套
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { error, isLoading, isIdle, isError, run } = useAsync<User | null>()
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()

  // 刷新后,自动初始化User,带着token去请求user,并将user的值设置到state中
  useMount(() => {
    run(dispatch(bootstrap()))
  })

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }
  return <div>{children}</div>
}

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()
  const user = useSelector(selectUser)
  const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch])
  const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch])
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch])
  return {
    user,
    login,
    register,
    logout
  }
}
