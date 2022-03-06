const fetch = require('node-fetch')
const DbSet = require('../../database/DbSet')

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
      await DbSet.getInstance().payments.update({
        where: {
          reference_id: refid
        },
        data: {
          paid: true,
          paid_at: Date.now()
        }
      })

      const compra = await DbSet.getInstance().payments.findUnique({
        where: {
          reference_id: refid
        }
      })

      const body = {
        ref: refid,
        userid: compra.user.id,
        price: compra.money
      }

      await fetch(`${process.env.API_URL}/premium/buy`, {
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
