'use strict'
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')

const isDev = process.env.NODE_ENV === 'development'

const config = webpackMerge(baseConfig,{
    entry: {
        app: path.join(__dirname, '../client/app.js')
    },
    output: {
        filename: "[name].[hash].js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:path.join(__dirname,'../client/template.html')
        })
    ]
})

if(isDev){
    config.entry = {
        app:[
            'react-hot-loader/patch',
            path.join(__dirname,'../client/app.js')
        ]
    }
    config.devServer = {
        host:'0.0.0.0',
        port:'8888',
        contentBase:path.join(__dirname,'../dist'),
        hot:true,
        overlay:{
            errors:true
        },
        publicPath:'/public', //不能先打包，出现一个dist文件时，webpack-devser会去读硬盘的dist文件
        historyApiFallback:{
            index:'/public/index.html'
        }
    }
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config