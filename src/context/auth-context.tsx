import React, { ReactNode, useState, createContext, useContext } from 'react'
import * as auth from 'auth/auth-provider'
import { User } from 'pages/project-list/search-panel'
import { http } from 'utils/http'
import { useMount } from 'utils'
import { useAsync } from 'utils/use-async'
import { FullPageLoading } from 'components/lib'
interface AuthForm {
  username: string
  password: string
}

// 登录持久化实现
// 每次刷新先对User进行初始化,首先尝试获取localStorage中的token
const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    // 若token存在,则带着本地存储中的token去请求数据
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

// hooks写法，创建context
// 注意要对类型进行定义，
const AuthContext = createContext<
  | {
      user: User | null
      register: (form: AuthForm) => Promise<void>
      login: (form: AuthForm) => Promise<void>
      logout: () => Promise<void>
    }
  | undefined //初始状态为undefined
>(undefined)

// 确定AuthProvider的类型,放在APP.tsx中实际使用
// 传入children节点，含义是嵌套
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null) //登录：User 退出：null
  const login = (form: AuthForm) => auth.login(form).then((user) => setUser(user))
  const register = (form: AuthForm) => auth.register(form).then((user) => setUser(user))
  const logout = () => auth.logout().then(() => setUser(null))

  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser
  } = useAsync<User | null>()

  // 刷新后,自动初始化User,带着token去请求user,并将user的值设置到state中
  useMount(() => {
    bootstrapUser().then(setUser)
  })

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}
