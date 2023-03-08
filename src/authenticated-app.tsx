/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import ProjectListPages from 'pages/project-list'
import { useAuth } from 'context/auth-context'
import styled from '@emotion/styled'
import { Row } from './components/lib'
// 以组件的形式渲染SVG
import { ReactComponent as SoftwareLogo } from './assets/software-logo.svg'
import { Button, Dropdown, Menu } from 'antd'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProjectPage from 'pages/project'
import { resetRoute } from 'utils'
import { ProjectModal } from 'pages/project-list/project-modal'
import { ProjectPopover } from 'pages/project-list/project-popover'

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <Routes>
          <Route path={'/'} element={<Navigate to="/projects" />}></Route>
          <Route path={'/projects'} element={<ProjectListPages />} />
          <Route path={'/projects/:projectId/*'} element={<ProjectPage />} />
        </Routes>
      </Main>
      <ProjectModal />
    </Container>
  )
}

const PageHeader = () => {
  const { logout, user } = useAuth()
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button style={{ padding: 0 }} type="link" onClick={resetRoute}>
          <SoftwareLogo width={'14rem'} color={'rgb(38, 132, 255)'} />
        </Button>
        <ProjectPopover />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={'logout'}>
                <Button type="link" onClick={logout}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <a onClick={(e) => e.preventDefault()}>Hi, Noah{user?.name}</a>
        </Dropdown>
      </HeaderRight>
    </Header>
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
