import React, { ReactNode } from 'react'
import { AuthProvider } from './auth-context'
import { QueryClient, QueryClientProvider } from 'react-query'
import { store } from 'store'
import { Provider } from 'react-redux'

export const AppProviders = ({ children }: { children: ReactNode }) => {
  // 嵌套子节点
  const queryClient = new QueryClient()

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </Provider>
  )
}
