const express = require("express");
const router = express.Router();
const {
  createCookieToken,
  clearCookie,
} = require("../../api/authentication/controllers");

router.post("/jwt", createCookieToken);

router.post("/logout", clearCookie);

module.exports = router;
