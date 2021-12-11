const fetch = require('node-fetch')
const database = require('../database/mongo')

module.exports = class PicPayCreate {
  static async sendInfos (req, res) {
    const { nome } = req.body
    const { sobrenome } = req.body
    const { cpf } = req.body
    const { number } = req.body
    const { buyermail } = req.body
    const { uuid } = req.body

    const pagamento = await database.getPayment(uuid)

    const refid = pagamento.productrefid
    const expires = pagamento.expires
    const price = pagamento.price

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

    const picpay = await fetch('https://appws.picpay.com/ecommerce/public/payments/', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'x-picpay-token': process.env.PICPAY_TOKEN,
        'x-seller-token': process.env.SELLER_TOKEN,
        'content-type': 'application/json'
      }
    }).then(res => res.json())

    res.status(200).json(picpay.paymentUrl)

    await database.setPrepaid(refid)
  }
}
