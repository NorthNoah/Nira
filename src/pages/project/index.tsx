import KanbanPage from 'pages/kanban'
import TaskPage from 'pages/task'
import React, { memo } from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'

const ProjectPage = memo(() => {
  return (
    <div>
      <h1>ProjectPage</h1>
      {/* link路径若为嵌套，不要加“/” */}
      <Link to="kanban">看板</Link>
      <Routes>
        <Route path={'/kanban'} element={<KanbanPage />} />
        <Route path={'/task'} element={<TaskPage />} />
      </Routes>
    </div>
  )
})

export default ProjectPage
