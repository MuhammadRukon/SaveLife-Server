const express = require("express");
const applyMiddleware = require("./middleware/applyMiddleware");
const connectDB = require("./db/connectDB");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

const authenticationRoutes = require("./routes/authentication/index");
const usersRoutes = require("./routes/users/index");
const blogsRoutes = require("./routes/blogs/index");
const bloodDonationsRoutes = require("./routes/bloodDonations/index");
const fundingsRoutes = require("./routes/fundings/index");

applyMiddleware(app);

app.use(authenticationRoutes);
app.use(usersRoutes);
app.use(blogsRoutes);
app.use(bloodDonationsRoutes);
app.use(fundingsRoutes);

app.get("/health", (req, res, next) => {
  res.send("savelife server running");
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

// const main = async () => {
//   await connectDB();
//   app.listen(port, () => {
//     //copied
//     console.log(`server running on port ${port}`);
//   });
// };
// main();

module.exports = app;
