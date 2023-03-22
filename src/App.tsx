import React, { memo } from 'react'
import { useAuth } from 'context/auth-context'
import { AuthenticatedApp } from 'authenticated-app'
import UnauthenticatedApp from 'unauthenticated-app'
import { ErrorBoundary } from 'components/error-boundary'
import { FullPageErrorFallback } from 'components/lib'

const App = () => {
  const { user } = useAuth()
  return (
    <div className="app">
      {/* 根据user切换对应的页面 */}
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  )
}

export default App
