import React, { memo } from 'react'
import { useAuth } from 'context/auth-context'
import { AuthenticatedApp } from 'authenticated-app'
import UnauthenticatedApp from 'unauthenticated-app'

const App = memo(() => {
  const { user } = useAuth()
  return (
    <div className="app">
      {/* 根据user切换对应的页面 */}
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  )
})

export default App
