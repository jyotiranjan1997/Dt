const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema(
  {
    TestName: { type: String, required: true },
    TestPrice: { type: Number },
    TestDiscount: { type: Number },
    TestMemberDiscount: { type: Number },
    Active: { type: Boolean, default: true },
    CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Department = mongoose.model("Department", DepartmentSchema);

module.exports = { Department };
