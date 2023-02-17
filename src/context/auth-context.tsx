import React, { ProviderProps, ReactNode, useState, createContext, useContext } from 'react'
import * as auth from 'auth/auth-provider'
import { User } from 'pages/project-list/search-panel'
interface AuthForm {
  username: string
  password: string
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
  const [user, setUser] = useState<User | null>(null) //登录：User 退出：null
  const login = (form: AuthForm) => auth.login(form).then((user) => setUser(user))
  const register = (form: AuthForm) => auth.register(form).then((user) => setUser(user))
  const logout = () => auth.logout().then(() => setUser(null))
  return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}
