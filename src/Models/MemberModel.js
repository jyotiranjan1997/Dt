const mongoose = require("mongoose");
const date = new Date();
const MemberSchema = new mongoose.Schema(
  {
    MemberName: { type: String, required: true },
    MemberId: { type: Number, default: date.getTime() },
    MemberEmail: { type: String },
    isMember: { type: Boolean, default: true },
    MemberStartDate: { type: String },
    MemberExpiryDate: { type: String },
    Password: { type: String },
    Refer: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    Reports: { type: mongoose.Schema.Types.ObjectId, ref: "Report" },
    Phone: { type: Number, required: true },
    Active: { type: Boolean, default: true },
    CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Member = mongoose.model("Member", MemberSchema);

module.exports = { Member };
