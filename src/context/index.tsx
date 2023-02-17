import React, { ReactNode } from 'react'
import { AuthProvider } from './auth-context'

export const AppProviders = ({ children }: { children: ReactNode }) => {
  // 嵌套子节点
  return <AuthProvider>{children}</AuthProvider>
}
