module.exports = (_req, res) => {
  res
    .status(404)
    .send({ message: 'Parece que a sua princesa esta em outro castelo...' })
}
