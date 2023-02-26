import React, { ReactNode } from 'react'
import { AuthProvider } from './auth-context'
import { QueryClient, QueryClientProvider } from 'react-query'

export const AppProviders = ({ children }: { children: ReactNode }) => {
  // 嵌套子节点
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  )
}
