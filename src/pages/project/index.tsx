import styled from '@emotion/styled'
import { Menu } from 'antd'
import { EpicPage } from 'pages/epic'
import KanbanPage from 'pages/kanban'
import React, { memo } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'

// 被选中的路由路径
const useRouteType = () => {
  const units = useLocation().pathname.split('/')
  return units[units.length - 1]
}

const ProjectPage = () => {
  const routeType = useRouteType()

  return (
    <Container>
      {/* 侧边栏 */}
      <Aside>
        <Menu mode={'inline'} selectedKeys={[routeType]}>
          <Menu.Item key={'kanban'}>
            <Link to="kanban">看板</Link>
          </Menu.Item>
          <Menu.Item key={'task'}>
            <Link to="task">任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          {/* 注意组件内的路由是自动嵌套的 */}
          {/* 默认路径：看板 */}
          <Route
            path="/"
            element={<Navigate to={window.location.pathname + '/kanban'} replace={true} />}
          />
          <Route path={'/kanban'} element={<KanbanPage />} />
          <Route path={'/task'} element={<EpicPage />} />
        </Routes>
      </Main>
    </Container>
  )
}
const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`
const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;
`

export default ProjectPage
