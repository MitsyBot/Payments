const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL)

const transactionsSchema = new mongoose.Schema({
  uuid: String,
  buyerid: String,
  productrefid: String,
  price: Number,
  expires: String,
  paid: String,
  prepaid: String
}, { collection: 'transactions' }
)

module.exports = { Mongoose: mongoose, TransactionsSchema: transactionsSchema }
