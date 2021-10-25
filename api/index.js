const cors = require('cors')
const express = require('express')

const ApiRouter = require('./router.js')
const NotFound = require('./middlewares/NotFound')
const ErrorHandler = require('./middlewares/ErrorHandler')
const isAuthorized = require('./middlewares/isAuth')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('trust proxy', 1)
app.use((_, res, next) => {
  res.contentType('application/json')
  return next()
})

app.use(isAuthorized, ApiRouter)

app.use(NotFound)
app.use(ErrorHandler)

app.get('/', (req, res) => {
  res.json({ message: 'Yay' })
})

module.exports = app
