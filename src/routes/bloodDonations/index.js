const express = require("express");
const verifyToken = require("../../middleware/verifyToken");
const BloodRequest = require("../../models/BloodRequest");
const router = express.Router();

// get all blood donation request
router.get("/blood-donations", verifyToken, async (req, res) => {
  const result = await BloodRequest.find();
  res.send(result);
});
// get blood donation request pagination
router.get("/blood-donation/selected", verifyToken, async (req, res) => {
  const page = Number(req.query.page - 1) || 0;
  const size = Number(req.query.size) || 3;
  const status = req.query.donationStatus;
  let filter;
  if (status) {
    filter = { donationStatus: status };
  } else {
    filter = {};
  }
  const result = await BloodRequest.find(filter)
    .skip(page * size)
    .limit(size);
  res.send(result);
});
// get specific donors blood donation requests
router.get("/my-blood-donations/:email", verifyToken, async (req, res) => {
  const email = req.params.email;
  const filter = { requesterEmail: email };
  const result = await BloodRequest.find(filter);
  res.send(result);
});
// get specific donors blood donation requests pagination
router.get("/blood-donations/:email", verifyToken, async (req, res) => {
  const email = req.params.email;
  const donationStatus = req.query.donationStatus;
  const page = Number(req.query.page - 1) || 0;
  const size = Number(req.query.size) || 2;
  // if(donationStatus !== 'all')
  let filter;
  if (donationStatus) {
    filter = { requesterEmail: email, donationStatus: donationStatus };
  } else {
    filter = { requesterEmail: email };
  }
  const result = await BloodRequest.find(filter)
    .skip(page * size)
    .limit(size);
  res.send(result);
});
//get Specific recent 3 donate request
router.get("/blood-donations/recent/:email", verifyToken, async (req, res) => {
  const email = req.params.email;
  const filter = { requesterEmail: email };
  const result = await BloodRequest.find(filter)
    .sort({ donationDate: 1 })
    .limit(3);
  res.send(result);
});
// get single donation by id
router.get("/blood-donation/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  const result = await BloodRequest.findOne(filter);
  res.send(result);
});
// update blood donation request
router.patch("/blood-donation/update/:id", async (req, res) => {
  const id = req.params.id;
  const info = req.body;
  const filter = { _id: id };
  const result = await BloodRequest.updateOne(filter, info);
  console.log(result);
  res.send(result);
});
//add blood donation request
router.post("/blood-donations", async (req, res) => {
  const donationInfo = req.body;
  const result = await BloodRequest.create(donationInfo);
  res.send(result);
});
// delete blood donation request
router.delete("/blood-donation/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  const result = await BloodRequest.deleteOne(filter);
  res.send(result);
});
//update blood donation status
router.patch("/blood-donation/:id", async (req, res) => {
  const id = req.params.id;
  const status = req.body;
  const data = {
    $set: status,
  };
  const filter = { _id: id };
  const result = await BloodRequest.updateOne(filter, data);
  res.send(result);
});
//get pending blood donation requests
router.get("/blood-donations/available/pending", async (req, res) => {
  const result = await BloodRequest.find({
    donationStatus: "pending",
  });
  res.send(result);
});
// get complete status donations
router.get("/blood-donations/status/done", async (req, res) => {
  const result = await BloodRequest.find({
    donationStatus: "done",
  });
  res.send(result);
});

module.exports = router;
