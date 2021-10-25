const { v4: uuidv4 } = require('uuid')
const db = require('../mongo/db')
const Transactions = db.Mongoose.model('transactions', db.TransactionsSchema, 'transactions')

module.exports = class CreatePayment {
  static async registerPayment (req, res) {
    const newuuid = uuidv4()
    const data = new Date()
    const dia = ('0' + data.getDate()).slice(-2)
    const mes = ('0' + (data.getMonth() + 1)).slice(-2)
    const ano = data.getFullYear()

    const resolveddate = ano + '-' + mes + '-' + dia + 'T16:00:00-03:00'
    const newTransaction = new Transactions({
      uuid: newuuid,
      buyerid: req.body.buyerid,
      productrefid: req.body.productrefid,
      price: req.body.price,
      expires: resolveddate,
      paid: req.body.paid
    })
    await newTransaction.save().then(res.status(200).json(`${process.env.URL}/checkout/${newuuid}`))
  }

  static async getPayment (req, res) {
    const transactionUUID = req.params.uuid
    await Transactions.find({ uuid: transactionUUID })
      .then((transactioninfo) => {
        res.status(200).json(transactioninfo)
      })
  }
}
