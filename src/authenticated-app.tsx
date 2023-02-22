import React from 'react'
import ProjectListPages from 'pages/project-list'
import { useAuth } from 'context/auth-context'
import styled from '@emotion/styled'
import { Row } from './components/lib'

export const AuthenticatedApp = () => {
  const { logout } = useAuth()
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={5}>
          <HeaderItem>logo</HeaderItem>
          <HeaderItem>项目</HeaderItem>
          <HeaderItem>用户</HeaderItem>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
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

const Header = styled(Row)``
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
const HeaderItem = styled.h3`
  margin-right: 3rem;
`
const Main = styled.main``
