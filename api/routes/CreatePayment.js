const { v4: uuidv4 } = require('uuid')
const DbSet = require('../database/DbSet')

module.exports = class CreatePayment {
  static async registerPayment (req, res) {
    const uuid = uuidv4()

    let price
    let refid
    if (req.body.tier === 1) {
      refid = `MITSY-PREMIUM-BASIC-${Math.floor(Math.random() * 100000)}`
      price = 19.99
    }
    if (req.body.tier === 2) {
      refid = `MITSY-PREMIUM-RECOMMENDED-${Math.floor(Math.random() * 100000)}`
      price = 39.99
    }
    if (req.body.tier === 3) {
      refid = `MITSY-PREMIUM-COMPLETE-${Math.floor(Math.random() * 100000)}`
      price = 89.99
    }
    if (req.body.tier === 4) {
      refid = `MITSY-PREMIUM-MUSIC-${Math.floor(Math.random() * 100000)}`
      price = 119.99
    }
    if (req.body.tier !== 1 && req.body.tier !== 2 && req.body.tier !== 3 && req.body.tier !== 4) { return res.send('Tier invalido engraçadinho!') }

    const data = new Date()
    const dia = ('0' + data.getDate()).slice(-2)
    const mes = ('0' + (data.getMonth() + 1)).slice(-2)
    const ano = data.getFullYear()
    const date = Number(dia) + 2
    const expireat = ano + '-' + mes + '-' + date + 'T16:00:00-03:00'

    // Registrar a compra na database

    await DbSet.getInstance().payments.create({
      data: {
        user: req.body.user,
        gateway: req.body.service,
        reason: req.body.reason,
        money: price,
        uuid,
        created_at: Date.now(),
        paid: false,
        paid_at: null,
        expires_at: expireat,
        reference_id: refid,
        metadata: { tier: req.body.tier }
      }
    })
    res.status(200).json({ redirect: `${process.env.URL}/checkout/${uuid}` })
  }

  // Finalizar e enviar o link de compra para o website que gerou.
  static async getPayment (req, res) {
    const uuid = req.params.uuid
    const pagamento = await DbSet.getInstance().payments.findUnique({
      where: {
        uuid
      }
    })
    res.status(200).json(pagamento)
  }
}
