const transactionSchema = require('./schemas/Transactions')

module.exports.getPayment = async function (refid) {
  const transaction = await transactionSchema.findOne({ uuid: refid })

  if (transaction) {
    return transaction
  } else {
    return { message: 'Transação não encontrada' }
  }
}

module.exports.getPaymentByRef = async function (refid) {
  const transaction = await transactionSchema.findOne({ productrefid: refid })

  if (transaction) {
    return transaction
  } else {
    return { message: 'Transação não encontrada' }
  }
}

module.exports.createNewPayment = async function (newuuid, buyerdiscord, refid, productprice, buyername, expireat) {
  // eslint-disable-next-line new-cap
  const transaction = new transactionSchema({
    uuid: newuuid,
    buyerid: buyerdiscord,
    productrefid: refid,
    price: productprice,
    buyerusername: buyername,
    expires: expireat,
    paid: false,
    prepaid: false
  })
  await transaction.save()
  return transaction
}

module.exports.setPrepaid = async function (refid) {
  const value = { productrefid: refid }
  const paid = { prepaid: 'true' }
  await transactionSchema.findOneAndUpdate(value, paid, {
    new: true
  })
}

module.exports.setPaid = async function (refid) {
  const value = { productrefid: refid }
  const paid = { paid: 'true' }
  await transactionSchema.findOneAndUpdate(value, paid, {
    new: true
  })
}
