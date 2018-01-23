import React from 'react'
import ReactDom from 'react-dom'
import App from './views/app.jsx'
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
    module.hot.accept('./views/app.jsx', () => {
        const NextApp = require('./views/app.jsx').default
        // ReactDom.hydrate(<NextApp/>,document.getElementById('root'))
        render(NextApp)
    })
}