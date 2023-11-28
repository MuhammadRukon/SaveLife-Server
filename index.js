const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./db/connectDB");
const User = require("./db/userSchema");
const Blog = require("./db/blogSchema");
const BloodRequest = require("./db/BloodRequestSchema");
const port = process.env.PORT || 5000;

// middleware
app.use(
  cors({
    origin: [process.env.LOCAL_HOST],
    credentials: true,
  })
);
app.use(express.json());
require("dotenv").config();

// health check
app.get("/health", (req, res, next) => {
  res.send("home route");
});

// get all users
app.get("/users", async (req, res) => {
  const result = await User.find();
  res.send(result);
});
//get donor for search result
app.get("/user/find-donor/:bloodGroup", async (req, res) => {
  const query = req.query;
  const group = req.params.bloodGroup;
  const filter = { ...query, bloodGroup: group };
  const result = await User.find(filter);
  res.send(result), console.log(result);
});
// get all users pagination
app.get("/users/selected", async (req, res) => {
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
// get role / status / user
app.get("/user/role/:email", async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  const result = await User.findOne(query);
  res.send(result);
});
//save user to db
app.post("/users", async (req, res) => {
  const userInfo = req.body;
  const result = await User.create(userInfo);
  res.send(result);
});
// update user info
app.put("/user/update/:email", async (req, res) => {
  const email = req.params.email;
  const userInfo = req.body;
  const result = await User.updateOne({ email }, { $set: userInfo });
  res.send(result);
});
// get all blogs
app.get("/blogs", async (req, res) => {
  const blogStatus = req.query.status;
  let filter;
  if (blogStatus) {
    filter = { status: blogStatus };
  } else {
    filter = {};
  }
  const result = await Blog.find(filter);
  res.send(result);
});
//get published blogs
app.get("/blogs/published", async (req, res) => {
  const result = await Blog.find({ status: "published" });
  res.send(result);
});
// post a blog
app.post("/blogs/add-blog", async (req, res) => {
  const blog = req.body;
  const result = await Blog.create(blog);
  res.send(result);
});
// update blog status
app.patch("/blog/:id", async (req, res) => {
  const id = req.params.id;
  const status = req.body;
  const data = {
    $set: status,
  };
  const filter = { _id: id };
  const result = await Blog.updateOne(filter, data);
  res.send(result);
});
// delete a blog
app.delete("/blog/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  const result = await Blog.deleteOne(filter);
  res.send(result);
});
// get all blood donation request
app.get("/blood-donations", async (req, res) => {
  const result = await BloodRequest.find();
  res.send(result);
});
// get blood donation request pagination
app.get("/blood-donation/selected", async (req, res) => {
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
app.get("/my-blood-donations/:email", async (req, res) => {
  const email = req.params.email;
  const filter = { requesterEmail: email };
  const result = await BloodRequest.find(filter);
  res.send(result);
});
// get specific donors blood donation requests pagination
app.get("/blood-donations/:email", async (req, res) => {
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
app.get("/blood-donations/recent/:email", async (req, res) => {
  const email = req.params.email;
  const filter = { requesterEmail: email };
  const result = await BloodRequest.find(filter)
    .sort({ donationDate: 1 })
    .limit(3);
  res.send(result);
});
// get single donation by id
app.get("/blood-donation/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  const result = await BloodRequest.findOne(filter);
  res.send(result);
});
// update blood donation request
app.patch("/blood-donation/update/:id", async (req, res) => {
  const id = req.params.id;
  const info = req.body;
  const filter = { _id: id };
  const result = await BloodRequest.updateOne(filter, info);
  console.log(result);
  res.send(result);
});
//add blood donation request
app.post("/blood-donations", async (req, res) => {
  const donationInfo = req.body;
  const result = await BloodRequest.create(donationInfo);
  res.send(result);
});
// delete blood donation request
app.delete("/blood-donation/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  const result = await BloodRequest.deleteOne(filter);
  res.send(result);
});
//update blood donation status
app.patch("/blood-donation/:id", async (req, res) => {
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
app.get("/blood-donations/available/pending", async (req, res) => {
  const result = await BloodRequest.find({
    donationStatus: "pending",
  });
  res.send(result);
});

// error handler
app.all("*", (req, res, next) => {
  const error = new Error(`Ivalid URL : ${req.url}`);
  error.status = 404;
  next(error);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});
// error handler
// server and db connection
const main = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
};
main();
