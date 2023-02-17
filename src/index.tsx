import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { loadServer, DevTools } from 'jira-dev-tool'
import { AppProviders } from 'context'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
loadServer(() =>
  root.render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>
  )
)
