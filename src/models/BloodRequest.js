const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema({
  requesterName: { type: String, required: true },
  requesterEmail: { type: String, required: true },
  recipientName: { type: String, required: true },
  recipientDistrict: { type: String, required: true },
  recipientUpazila: { type: String, required: true },
  hospitalName: { type: String, required: true },
  address: { type: String, required: true },
  requestMsg: { type: String, required: true },
  donationStatus: { type: String, required: true },
  donationTime: { type: String, required: true },
  donationDate: { type: String, required: true },
  donorName: { type: String, required: false },
  donorEmail: { type: String, required: false },
});

const BloodRequest = mongoose.model("BloodRequest", bloodRequestSchema);

module.exports = BloodRequest;
