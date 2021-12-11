const cors = require('cors')
const express = require('express')

const mongoose = require('mongoose')
const ApiRouter = require('./router.js')
const NotFound = require('./middlewares/NotFound')
const ErrorHandler = require('./middlewares/ErrorHandler')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('trust proxy', 1)
app.use((_, res, next) => {
  res.contentType('application/json')
  return next()
})

const mongourl = process.env.MONGO_URL

mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    return console.log(`Não foi possível se conectar a database: ${err}`)
  }

  console.log('Conectado a database')
})

app.use(ApiRouter)

app.use(NotFound)
app.use(ErrorHandler)

app.get('/', (req, res) => {
  res.json({ message: 'Yay' })
})

module.exports = app
