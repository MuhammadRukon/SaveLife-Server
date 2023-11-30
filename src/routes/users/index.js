const express = require("express");
const verifyToken = require("../../middleware/verifyToken");
const router = express.Router();
const User = require("../../models/user");

// get all users
router.get("/users", verifyToken, async (req, res) => {
  const result = await User.find();
  res.send(result);
});
// get all users pagination
router.get("/users/selected", verifyToken, async (req, res) => {
  const userStatus = req.query.status;
  const page = Number(req.query.page - 1) || 0;
  const size = Number(req.query.size) || 4;
  let filter;
  if (userStatus) {
    filter = { status: userStatus };
  } else {
    filter = {};
  }
  const result = await User.find(filter)
    .skip(page * size)
    .limit(size);
  res.send(result);
});
//get donor for search result
router.get("/user/find-donor/:bloodGroup", async (req, res) => {
  const query = req.query;
  const group = req.params.bloodGroup;
  const filter = { ...query, bloodGroup: group };
  const result = await User.find(filter);
  res.send(result), console.log(result);
});
// get role / status / user
router.get("/user/role/:email", verifyToken, async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  const result = await User.findOne(query);
  res.send(result);
});
//save user to db
router.post("/users", async (req, res) => {
  const userInfo = req.body;
  const result = await User.create(userInfo);
  res.send(result);
});
// update user info
router.put("/user/update/:email", async (req, res) => {
  const email = req.params.email;
  const userInfo = req.body;
  const result = await User.updateOne({ email }, { $set: userInfo });
  res.send(result);
});

module.exports = router;
