import express from 'express'
import cors from 'cors'
import wss from './utils/websocket'

const app = express()

//  parse json request body
app.use(express.json())

//  parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

//  enable cors
app.use(cors())
app.options('*', cors)

//  websocket
app.use(() => wss())

module.exports = app
