const express = require("express");

const {
  Create_Offer_Controller,
  Find_Offer_Controller,
  Update_Offer_Controller,
  Single_Offer_Controller,
  Delete_Offer_Controller,
} = require("../Controllers/OfferController");
const {
  verifyadmin,
  verifyMember,
} = require("../MiddleWares/AdminVerifyMiddleWare");
const OfferRoute = express.Router();
OfferRoute.post("/", Create_Offer_Controller); // Create Contact details Route
OfferRoute.get("/", verifyadmin, Find_Offer_Controller); // Find contacts Data with admin authorization
OfferRoute.put("/", verifyMember, Update_Offer_Controller); // Find single Data with admin authorization
OfferRoute.get("/:id", verifyadmin, verifyMember, Single_Offer_Controller); // update Data with admin authorization
OfferRoute.delete("/:id", verifyadmin, Delete_Offer_Controller);
module.exports = { OfferRoute };
