'use strict'
const express = require('express')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const devStatic = require('./util/dev.static')

const isDev = process.NODE_ENVV === 'development'

const app = express()
const port = 3333




if(!isDev){
    const serverEntry = require('../dist/server-entry').default
    const template = fs.readFileSync(path.join(__dirname,'../dist/index.html'),"utf8")
    app.use('/public',express.static(path.join(__dirname,'../dist')))
    app.get('*',(req,res) => {
        const appString = ReactSSR.renderToString(serverEntry)
        const html = template.replace("<!-- app -->",appString)
        res.send(html)
    })
} else {
    devStatic(app)
}

app.listen(port,()=>{
    console.log(`server is started on port ${port}`)
})




