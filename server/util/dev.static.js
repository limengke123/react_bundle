'use strict'
const axios = require('axios')
const webpack = require('webpack')
const path = require('path')
const MemoryFs = require('memory-fs')
const ReactDomServer = require('react-dom/server')
const proxy = require('http-proxy-middleware')

const serverConfig = require('../../build/webpack.config.server')

const getTemplate = () => {
    return new Promise((resolve,reject) => {
        axios.get('http://localhost:8888/public/index.html')
            .then(res => {
                resolve(res.data)
            })
            .catch(reject)
    })
}

const mfs = new MemoryFs
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs
const Module = module.constructor
let serverBundle
serverCompiler.watch({},(err,stats) => {
    if(err) throw err
    stats = stats.toJSON()
    stats.error.forEach(err => console.error(err))
    stats.warning.forEach(warn => console.warn(warn))

    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    )
    const bundle = mfs.readFileSync(bundlePath,'utf-8')
    const m = new Module()
    m._compile(bundle,'server-entry.js')
    serverBundle = m.exports.default
})

module.exports = function(app){

    app.use('/public',proxy({
        target:"http://localhost:8888"
    }))

    app.get('*',(req,res) => {
        getTemplate().then(template => {
            const content = ReactDomServer.renderToString(serverBundle)
            res.send(template.replace('<!-- app -->',content))
        })
    })
}