const mongoose = require('mongoose')
const Transactions = new mongoose.Schema({
  uuid: String,
  buyerid: String,
  buyerusername: String,
  productrefid: String,
  price: Number,
  expires: String,
  paid: String,
  prepaid: String
})

module.exports = mongoose.model('Transactions', Transactions)
