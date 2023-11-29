const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  // define schma
  displayName: { type: String, required: true },
  photoURL: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  transactionId: { type: String, required: true },
  date: { type: String, required: true },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
