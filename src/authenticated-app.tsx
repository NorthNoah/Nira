/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import ProjectListPages from 'pages/project-list'
import { useAuth } from 'context/auth-context'
import styled from '@emotion/styled'
import { Row } from './components/lib'
// 以组件的形式渲染SVG
import { ReactComponent as SoftwareLogo } from './assets/software-logo.svg'
import { Dropdown, Menu } from 'antd'

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth()
  const items = [
    {
      label: <a onClick={logout}>登出</a>,
      key: 'logout'
    }
  ]
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={5}>
          <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <a onClick={logout}>登出</a>
                </Menu.Item>
              </Menu>
            }
          >
            <a onClick={(e) => e.preventDefault()}>Hi, Noah{user?.name}</a>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListPages />
      </Main>
    </Container>
  )
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
const Main = styled.main``
