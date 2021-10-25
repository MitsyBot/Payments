const fetch = require('node-fetch')
const db = require('../../mongo/db')
const Transactions = db.Mongoose.model('transactions', db.TransactionsSchema, 'transactions')

module.exports = class PicPayHook {
  static async picpayHook (req, res) {
    const refid = req.body.referenceId
    res.status(200).json({ title: 'Ok' })

    await fetch(`https://appws.picpay.com/ecommerce/public/payments/${refid}/status`, {
      method: 'GET',
      headers: {
        'x-picpay-token': process.env.PICPAY_TOKEN,
        'x-seller-token': process.env.SELLER_TOKEN,
        'content-type': 'application/json'
      }
    }).then(res => res.json())
      .then(async (json) => {
        if (json.status === 'paid') {
          const value = { productrefid: refid }
          const paid = { paid: 'true' }
          await Transactions.findOneAndUpdate(value, paid, {
            new: true
          })

          await Transactions.find({ productrefid: refid })
            .then(async (transactioninfo) => {
              const body = {
                userid: transactioninfo[0].buyerid,
                price: transactioninfo[0].price
              }
              await fetch(`${process.env.API_URL}/api/postPremiumBuy`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                  Authorization: process.env.MITSY_API_TOKEN,
                  'content-type': 'application/json'
                }
              })
            })
        }
      })
  }
}
