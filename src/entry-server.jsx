import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { overwriteGetLocale } from './paraglide/runtime.js'

export function render(locale = 'en') {
  overwriteGetLocale(() => locale)
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
