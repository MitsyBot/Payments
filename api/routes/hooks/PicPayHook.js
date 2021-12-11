const fetch = require('node-fetch')
const database = require('../../database/mongo')

module.exports = class PicPayHook {
  static async picpayHook (req, res) {
    const refid = req.body.referenceId
    res.status(200).json({ title: 'Ok' })

    const status = await fetch(`https://appws.picpay.com/ecommerce/public/payments/${refid}/status`, {
      method: 'GET',
      headers: {
        'x-picpay-token': process.env.PICPAY_TOKEN,
        'x-seller-token': process.env.SELLER_TOKEN,
        'content-type': 'application/json'
      }
    }).then(res => res.json())

    if (status.status === 'paid') {
      await database.setPaid(refid)

      const compra = await database.getPaymentByRef(refid)

      const body = {
        userid: compra.buyerid,
        price: compra.price
      }
      await fetch(`${process.env.API_URL}/api/postPremiumBuy`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          Authorization: process.env.MITSY_API_TOKEN,
          'content-type': 'application/json'
        }
      })
    }
  }
}
