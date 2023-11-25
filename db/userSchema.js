const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  photoURL: { type: String },
  district: { type: String, required: true },
  upazila: { type: String, required: true },
  status: { type: String, required: true },
  role: { type: String, required: true },
  bloodGroup: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
