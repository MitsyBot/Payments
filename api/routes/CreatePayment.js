const { v4: uuidv4 } = require('uuid')
const db = require('../mongo/db')
const Transactions = db.Mongoose.model('transactions', db.TransactionsSchema, 'transactions')

module.exports = class CreatePayment {
  static async registerPayment (req, res) {
    // UUID unico da transação
    const newuuid = uuidv4()

    // Dia da transação
    const data = new Date()
    const dia = ('0' + data.getDate()).slice(-2)
    const mes = ('0' + (data.getMonth() + 1)).slice(-2)
    const ano = data.getFullYear()

    // Gambiarra coisa pouca
    const dianumber = Number(dia)
    const doisdianumber = dianumber + 2
    const diafinal = doisdianumber.toString()
    // 3 dias para a compra expirar
    const resolveddate = ano + '-' + mes + '-' + diafinal + 'T16:00:00-03:00'

    // Registrar a compra na database
    const newTransaction = new Transactions({
      uuid: newuuid,
      buyerid: req.body.buyerid,
      productrefid: req.body.productrefid,
      price: req.body.price,
      buyerusername: req.body.buyerusername,
      expires: resolveddate,
      paid: req.body.paid
    })
    await newTransaction.save().then(res.status(200).json({ redirect: `${process.env.URL}/checkout/${newuuid}` }))
  }

  // Finalizar e enviar o link de compra para o website que gerou.
  static async getPayment (req, res) {
    const transactionUUID = req.params.uuid
    await Transactions.find({ uuid: transactionUUID })
      .then((transactioninfo) => {
        res.status(200).json(transactioninfo)
      })
  }
}
