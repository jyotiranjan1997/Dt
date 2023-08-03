const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    Name: { type: String, required: [true, "Contact Name must required!"] },
    Email: { type: String, required: [true, "Email must required!"] },
    Phone: { type: Number, required: [true, "Phone Number must required!"] },
    Active: { type: Boolean, default: true },
    Message: { type: String, required: [true, "Message must required!"] },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = { Contact };
