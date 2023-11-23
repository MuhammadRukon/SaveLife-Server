const mongoose = require("mongoose");
require("dotenv").config();

const getConnectionString = () => {
  let connectionURI = process.env.DB_URI;
  connectionURI = connectionURI.replace("<username>", process.env.DB_USERNAME);
  connectionURI = connectionURI.replace("<password>", process.env.DB_PASSWORD);
  return connectionURI;
};

const connectDB = async () => {
  console.log("connecting to db");
  const uri = getConnectionString();
  await mongoose.connect(uri, { dbName: process.env.DB_NAME });
  console.log(`connected to db : ${process.env.DB_NAME}`);
};

module.exports = connectDB;
