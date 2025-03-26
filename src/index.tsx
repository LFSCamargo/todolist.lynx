import { root } from '@lynx-js/react'
import { AppRouter } from './app/index.jsx'
import './app.css'

root.render(<AppRouter />)

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
}
