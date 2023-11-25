const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./db/connectDB");
const User = require("./db/userSchema");
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

//save user to db
app.post("/users", async (req, res) => {
  const userInfo = req.body;
  console.log(userInfo);
  const result = await User.create(userInfo);
  console.log(result);
  res.status(200).json({ message: "User saved successfully" });
});
//

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
