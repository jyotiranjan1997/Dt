const mongoose = require("mongoose");

const PromoCodeSchema = new mongoose.Schema(
  {
    PromoCode: { type: String, required: true },
    PromoCodeType: { type: String, required: true },
    Discount: { type: Number, required: true },
    PromoCodeValidTill: { type: String, required: true },
    Active: { type: Boolean, default: true },
    CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const PromoCode = mongoose.model("PromoCode", PromoCodeSchema);

module.exports = { PromoCode };
