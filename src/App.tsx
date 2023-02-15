import React, { memo } from 'react'
import ProjectListPages from 'pages/project-list'
import LoginPage from 'pages/login'

const App = memo(() => {
  return (
    <div>
      {/* <ProjectListPages /> */}
      <LoginPage />
    </div>
  )
})

export default App
