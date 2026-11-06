import React from 'react'
import ReactDOM from 'react-dom/client'
// Inter with optical sizing: the fallback for devices without Apple's SF Pro.
import '@fontsource-variable/inter/opsz.css'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
