const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connectDB");
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
require("dotenv").config();

app.get("/health", (req, res, next) => {
  falsfdase;
  res.send("home route");
  next(error);
});

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

const main = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
};
main();
