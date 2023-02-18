import React, { memo, useState } from 'react'
import LoginPage from './login'
import RegisterPage from './register'

const UnauthenticatedApp = memo(() => {
  const [isRegister, setIsRegister] = useState(false)
  return (
    <div>
      {isRegister ? <RegisterPage /> : <LoginPage />}
      <button onClick={() => setIsRegister(!isRegister)}>
        切换到{isRegister ? '登录' : '注册'}
      </button>
    </div>
  )
})

export default UnauthenticatedApp
