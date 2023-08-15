const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema(
  {
    OfferTitle: { type: String, required: true },
    Department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    OfferValidTill: { type: String, required: true },
    OfferCode: { type: String, required: true },
    isOffer: { type: String, default: "user" },
    Discount: { type: Number, required: true },
    Active: { type: Boolean, default: true },
    CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Offer = mongoose.model("Offer", OfferSchema);

module.exports = { Offer };
