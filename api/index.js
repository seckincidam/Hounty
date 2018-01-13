import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config.js'

const server = express()

server.use(webpackMiddleware(webpack(webpackConfig)))
server.use(bodyParser.json())

server.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
})

server.listen(3000, function(){
  console.log("Api listening on port 3000");
})
