import { useAuth } from 'context/auth-context'
import React, { memo } from 'react'
import { Form, Input } from 'antd'
import { LongButton } from 'unauthenticated-app'
import { useAsync } from 'utils/use-async'
const LoginPage = memo(({ onError }: { onError: (error: Error) => void }) => {
  // const login = (param: { username: string; password: string }) => {
  //   fetch(`${apiUrl}/register`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(param)
  //   }).then(async (response) => {
  //     if (response.ok) {
  //     }
  //   })
  // }
  const { login } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })

  // 手动实现逻辑
  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   //查看onSumit的函数签名，判断event的类型
  //   event.preventDefault()
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement).value //类型断言为HTMLInputElement,否则会找不到value
  //   const password = (event.currentTarget.elements[1] as HTMLInputElement).value //类型断言为HTMLInputElement,否则会找不到value
  //   login({ username, password })
  // }
  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      await run(login(values))
    } catch (e) {
      onError(e)
    }
  }

  return (
    <Form onFinish={handleSubmit}>
      {/* 登录成功判断逻辑 */}
      {/* {user ? (
        <div>
          登录成功,用户名: {user?.name} token: {user?.token}
        </div>
      ) : null} */}
      {/* 每一行用Form.item包裹 */}
      <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder={'用户名'} type="text" id={'username'} />
      </Form.Item>
      <Form.Item name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
        <Input placeholder={'密码'} type="password" id={'password'} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType="submit" type="primary">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  )
})

export default LoginPage
