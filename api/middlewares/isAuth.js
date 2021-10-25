require('dotenv').config()

module.exports = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization || authorization !== process.env.API_TOKEN) {
    return res.status(401).send({ message: 'Apenas serviços da poluxtrail podem acessar isto!' })
  }

  return next()
}
