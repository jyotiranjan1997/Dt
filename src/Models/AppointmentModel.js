const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    Name: { type: String, required: [true, "Contact Name must required!"] },
    Report: { type: String, default: null },
    Age: { type: String },
    Time: { type: String, required: true },
    PromoCode: { type: String },
    BookingStatus: { type: Boolean, default: true },
    Phone: { type: String, required: [true, "Phone Number must required!"] },
    Doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    isMember: { type: Boolean, default: false },
    Department: [{ type: mongoose.Schema.Types.ObjectId, ref: "Department" }],
    ReferId: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
    TotalPrice: { type: Number },
    MemberPrice: { type: Number },
    TestPrice: { type: Number },
    isPaid: { type: Boolean, default: false },
    ReferPayment: { type: Boolean, default: false },
    Active: { type: Boolean, default: true },
    Message: { type: String },
  },
  { timestamps: true }
);
const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = { Appointment };
