const {
  MemberPayout_Create,
  Member_Payout_Success,
  MemberPayOut_Data,
  PayOut_List,
  REMOVE_PAYOUT,
} = require("../Controllers/MemberPayOutController");

const express = require("express");
const MemberPayOutRoute = express.Router();

MemberPayOutRoute.post("/", MemberPayout_Create); // Create Contact details Route
MemberPayOutRoute.get("/", PayOut_List);
MemberPayOutRoute.get("/:memberId", MemberPayOut_Data); // Find contacts Data with admin authorization
MemberPayOutRoute.put("/", Member_Payout_Success); // update Data with admin authorization
MemberPayOutRoute.delete("/:id", REMOVE_PAYOUT); // update Data with admin authorization
module.exports = { MemberPayOutRoute };
