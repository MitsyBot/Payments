const fetch = require('node-fetch')
const db = require('../mongo/db')
const Transactions = db.Mongoose.model('transactions', db.TransactionsSchema, 'transactions')

module.exports = class PicPayCreate {
  static async sendInfos (req, res) {
    const { nome } = req.body
    const { sobrenome } = req.body
    const { cpf } = req.body
    const { number } = req.body
    const { buyermail } = req.body
    const { uuid } = req.body

    const paymentdata = await (await fetch(`${process.env.URL}/api/getpayment/${uuid}`, {
      method: 'GET',
      headers: {
        Authorization: process.env.API_TOKEN,
        'content-type': 'application/json'
      }
    })).json()

    const refid = paymentdata[0].productrefid
    const expires = paymentdata[0].expires
    const price = paymentdata[0].price

    const body = {
      referenceId: refid,
      callbackUrl: `${process.env.URL}/api/hooks/picpay`,
      returnUrl: `${process.env.URL}/return`,
      value: price,
      expiresAt: expires,
      purchaseMode: 'online',
      buyer: {
        firstName: nome,
        lastName: sobrenome,
        document: cpf,
        email: buyermail,
        phone: number
      }
    }

    await fetch('https://appws.picpay.com/ecommerce/public/payments/', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'x-picpay-token': process.env.PICPAY_TOKEN,
        'x-seller-token': process.env.SELLER_TOKEN,
        'content-type': 'application/json'
      }
    }).then(res => res.json())
      .then(json => res.status(200).json(json.paymentUrl))
      .then(async () => {
        const value = { productrefid: refid }
        const paid = { prepaid: 'true' }
        await Transactions.findOneAndUpdate(value, paid, {
          new: true
        })
      })
  }
}
