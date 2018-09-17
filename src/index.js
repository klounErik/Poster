import React from 'react'
import ReactDOM from 'react-dom'
import './Webapp/style/index.css'
import '../node_modules/antd/dist/antd.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
