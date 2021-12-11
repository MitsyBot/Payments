const { v4: uuidv4 } = require('uuid')
const database = require('../database/mongo')

module.exports = class CreatePayment {
  static async registerPayment (req, res) {
    const uuid = uuidv4()
    const buyerid = req.body.buyerid
    const refid = req.body.productrefid
    const price = req.body.price
    const username = req.body.buyerusername
    const data = new Date()
    const dia = ('0' + data.getDate()).slice(-2)
    const mes = ('0' + (data.getMonth() + 1)).slice(-2)
    const ano = data.getFullYear()
    const date = Number(dia) + 2
    const expireat = ano + '-' + mes + '-' + date + 'T16:00:00-03:00'

    // Registrar a compra na database

    await database.createNewPayment(uuid, buyerid, refid, price, username, expireat)
    res.status(200).json({ redirect: `${process.env.URL}/checkout/${uuid}` })
  }

  // Finalizar e enviar o link de compra para o website que gerou.
  static async getPayment (req, res) {
    const transactionUUID = req.params.uuid
    const pagamento = await database.getPayment(transactionUUID)
    res.status(200).json(pagamento)
  }
}
