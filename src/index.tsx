import './wdyr'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AppProviders } from 'context'
import 'antd/dist/antd.less'
import { DevTools, loadServer } from 'jira-dev-tool'
import { BrowserRouter } from 'react-router-dom'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
loadServer(() =>
  root.render(
    <React.StrictMode>
      <AppProviders>
        <BrowserRouter>
          <DevTools />
          <App />
        </BrowserRouter>
      </AppProviders>
    </React.StrictMode>
  )
)
