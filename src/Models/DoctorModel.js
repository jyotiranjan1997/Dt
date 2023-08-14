const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Phone: { type: Number, required: true },
    StartTime: { type: String, required: true },
    EndTime: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    Active: { type: Boolean, default: true },
    CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", DoctorSchema);

module.exports = { Doctor };
