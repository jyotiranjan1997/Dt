const {MemberPayout_Create,Member_Payout_Success,MemberPayOut_Data}=require("../Controllers/MemberPayOutController")

const express=require("express")
const MemberPayOutRoute = express.Router();

MemberPayOutRoute.post("/", MemberPayout_Create); // Create Contact details Route
MemberPayOutRoute.get("/:memberId", MemberPayOut_Data); // Find contacts Data with admin authorization
MemberPayOutRoute.put("/", Member_Payout_Success); // update Data with admin authorization

module.exports = { MemberPayOutRoute };