const mongoose = require("mongoose");

const MemberPayoutSchema = new mongoose.Schema(
  {
    MemberId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    PayOutDate:{type: String},
    PayOutAmount:{type:Number,required:true},
    PayOutStatus:{type:Boolean,default:false},
    AccountDet:{type:String},
    UpiId:{type:String},
    Active: { type: Boolean, default: true },
    CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const MemberPayOut = mongoose.model("MemberPayOut", MemberPayoutSchema);

module.exports = { MemberPayOut };
