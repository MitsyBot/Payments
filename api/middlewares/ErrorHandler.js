const APIError = require('../util/apiError')

module.exports = (error, req, res, next) => {
  if (!error) {
    return next()
  }
  if (error instanceof APIError) {
    return res.status(error.status).send({ message: error.message })
  }

  // eslint-disable-next-line no-console
  console.error('Erro', error.message)
  return res.status(500).send({ message: 'Ocorreu um erro ao processar a sua solicitação' })
}
