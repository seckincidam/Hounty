import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config.js'

import userRoute from './routes/user-routes'
import questRoute from './routes/quest-routes'

const server = express()
mongoose.connect('mongodb://localhost/hounty', {useMongoClient: true});

server.use(webpackMiddleware(webpack(webpackConfig)))
server.use(bodyParser.json())

server.use('/api/users', userRoute)
server.use('/api/quests', questRoute)

server.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
})

server.listen(3000, function(){
  console.log("Api listening on port 3000");
})
