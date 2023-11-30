require("dotenv").config();
const config = {
  LOCAL_CLIENT: process.env.LOCAL_HOST,
  CLIENT1: process.env.CLIENT1,
  CLIENT2: process.env.CLIENT2,
};

module.exports = config;
