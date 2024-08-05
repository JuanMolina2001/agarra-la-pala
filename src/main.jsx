import { render } from 'preact'
import { App } from './app.jsx'
import "nes.css/css/nes.css"
import './index.css'
import { HashRouter } from 'react-router-dom'
import 'pixelarticons/fonts/pixelart-icons-font.css'
render(
    <HashRouter>
    <App />
    </HashRouter>
    , document.getElementById('app'))
