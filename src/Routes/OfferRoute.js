const express = require("express");

const {
  verifyadmin,
  verifyMember,
} = require("../MiddleWares/AdminVerifyMiddleWare");
const OfferRoute = express.Router();
OfferRoute.post("/", Create_Member_Controller); // Create Contact details Route
OfferRoute.get("/", verifyadmin, Find_Member_Controller); // Find contacts Data with admin authorization
OfferRoute.put("/", verifyMember, Update_Member_Controller); // Find single Data with admin authorization
OfferRoute.get("/:id", verifyadmin, verifyMember, Single_Member_Controller); // update Data with admin authorization
OfferRoute.delete("/:id", verifyadmin, Delete_Member_Controller);
module.exports = { OfferRoute };
