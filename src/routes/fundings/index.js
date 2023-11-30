const express = require("express");
const verifyToken = require("../../middleware/verifyToken");
const Transaction = require("../../models/transaction");
const router = express.Router();
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
// middleware

//generate client secret for stripe payment
router.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  const amountInCent = Number(amount) * 100;
  if (!amount || amountInCent < 1) return;
  const { client_secret } = await stripe.paymentIntents.create({
    amount: amountInCent,
    currency: "usd",
    payment_method_types: ["card"],
  });
  res.send({ clientSecret: client_secret });
});
router.get("/fundings", verifyToken, async (req, res) => {
  const result = await Transaction.find();
  res.send(result);
});
// save transactions to db
router.post("/fundings", async (req, res) => {
  const transaction = req.body;
  const result = await Transaction.create(transaction);
  res.send(result);
});

module.exports = router;
