const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, default: "" },
  displayName: { type: String, required: true, default: "" },
  photoURL: { type: String, required: true, default: "" },
  district: { type: String, required: true, default: "" },
  upazila: { type: String, required: true, default: "" },
  status: { type: String, required: true, default: "" },
  role: { type: String, required: true, default: "" },
  bloodGroup: { type: String, required: true, default: "" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
