import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { scan } from 'react-scan'
import App from './App'
import './bootstrap'
import './i18n'

scan({
  enabled: true,
})

const root = document.getElementById('root')

ReactDOM.createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
