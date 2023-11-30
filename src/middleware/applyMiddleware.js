const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { LOCAL_CLIENT, CLIENT1, CLIENT2 } = require("../config/default");

const applyMiddleware = (app) => {
  app.use(cookieParser());
  app.use(express.json());
  app.use(
    cors({
      origin: [LOCAL_CLIENT, CLIENT1, CLIENT2],
      credentials: true,
    })
  );
};

module.exports = applyMiddleware;
