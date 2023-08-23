const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    Name: { type: String, required: [true, "Contact Name must required!"] },
    Age: { type: String },
    Time: { type: String },
    PromoCode: { type: String },
    BookingStatus: { type: Boolean, default: true },
    Phone: { type: Number, required: [true, "Phone Number must required!"] },
    Doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    isMember: { type: Boolean, default: false },
    Department: [{ type: mongoose.Schema.Types.ObjectId, ref: "Department" }],
    ReferId: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
    Active: { type: Boolean, default: true },
    Message: { type: String },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = { Appointment };
