'use strict'
import React from 'react'
import ReactDom from 'react-dom'
import App from './app.jsx'
import {AppContainer} from 'react-hot-loader'
// ReactDom.hydrate(<App/>,document.getElementById('root'))
const root = document.getElementById('root')
const render = Component => {
    ReactDom.hydrate(
        <AppContainer>
            <Component/>
        </AppContainer>,
        root
    )
}

render(App)

if(module.hot){
    module.hot.accept('./app.jsx', () => {
        const NextApp = require('./app.jsx').default
        // ReactDom.hydrate(<NextApp/>,document.getElementById('root'))
        render(NextApp)
    })
}