import { render } from 'preact'
import { App } from './app.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import 'pixelarticons/fonts/pixelart-icons-font.css'
render(
    <BrowserRouter>
    <App />
    </BrowserRouter>
    , document.getElementById('app'))
