const jwt = require("jsonwebtoken");
const generateToken = require("../../../utils/generateToken");
require("dotenv").config();

const createCookieToken = async (req, res) => {
  const user = req.body;
  const token = generateToken(user);
  res
    .cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" })
    .send({ token });
};
module.exports = createCookieToken;
