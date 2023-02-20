import { Button, Card } from 'antd'
import React, { memo, useState } from 'react'
import LoginPage from './login'
import RegisterPage from './register'

const UnauthenticatedApp = memo(() => {
  const [isRegister, setIsRegister] = useState(false)
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card>
        {isRegister ? <RegisterPage /> : <LoginPage />}
        <Button type="primary" onClick={() => setIsRegister(!isRegister)}>
          切换到{isRegister ? '登录' : '注册'}
        </Button>
      </Card>
    </div>
  )
})

export default UnauthenticatedApp
