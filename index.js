const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./db/connectDB");
const User = require("./db/userSchema");
const Blog = require("./db/blogSchema");
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
  console.log(result);
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
  const result = await Blog.find();
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
