// 引入编译器，可以使用emotion的增强行内样式
/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import { Form, Input, Select } from 'antd'
import React, { memo } from 'react'
export interface User {
  id: number
  name: string
  email: string
  title: string
  organization: string
  token: string
}
interface SearchPanelProps {
  users: User[]
  param: {
    name: string
    personId: string
  }
  setParam: (param: SearchPanelProps['param']) => void
}

const SearchPannel = memo(({ users, param, setParam }: SearchPanelProps) => {
  // const [param, setParam] = useState({
  //     projectName: '',
  //     personId: ''
  // })

  return (
    <Container>
      <Form css={{ marginBottom: '2rem' }} layout="inline">
        <Form.Item>
          <Input
            placeholder="项目名"
            type="text"
            value={param.name}
            onChange={(e) =>
              setParam({
                // 注意浅拷贝写法
                ...param,
                name: e.target.value
              })
            }
          />
        </Form.Item>
        <Form.Item>
          <Select
            value={param.personId}
            onChange={(value) =>
              setParam({
                ...param,
                personId: value
              })
            }
          >
            <Select.Option value={''}>负责人</Select.Option>
            {/* 遍历users列表 */}
            {users.map((user) => {
              return (
                <Select.Option key={user.id} value={user.id}>
                  {user.name}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>
      </Form>
    </Container>
  )
})

const Container = styled.div``

export default SearchPannel
