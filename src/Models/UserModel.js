const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Phone: { type: Number, required: true },
    Password: { type: String, select: false, required: true },
    isAdmin: { type: Boolean, default: false },
    Active: { type: Boolean, default: true },
    CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };
