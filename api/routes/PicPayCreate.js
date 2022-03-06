const fetch = require('node-fetch')
const DbSet = require('../database/DbSet')

module.exports = class PicPayCreate {
  static async sendInfos (req, res) {
    const { nome, sobrenome, cpf, number, buyermail, uuid } = req.body

    // eslint-disable-next-line camelcase
    const { reference_id, expires_at, money } = await DbSet.getInstance().payments.findUnique({
      where: {
        uuid
      }
    })

    const body = {
      referenceId: reference_id,
      callbackUrl: `${process.env.URL}/api/hooks/picpay`,
      returnUrl: `${process.env.URL}/return`,
      value: money,
      expiresAt: expires_at,
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

    res.status(200).json(picpay.qrcode.base64)
  }
}
