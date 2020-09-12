const mongoose = require('mongoose');

const db = {};
db.mongoose = mongoose;
db.url = process.env.DB_CONNECTION;

let schema = mongoose.Schema({
  description: String,
  value: Number,
  category: String,
  year: Number,
  month: Number,
  day: Number,
  yearMonth: String,
  yearMonthDay: String,
  type: String,
});

db.transactionModel = mongoose.model('transaction', schema);

module.exports = db;
