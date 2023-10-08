const express = require("express");
const {
  verifyadmin,
  verifyMember,
} = require("../MiddleWares/AdminVerifyMiddleWare");
const {
  Create_PromoCode_Controller,
  Find_PromoCode_Controller,
} = require("../Controllers/PromoCodeController");
const PromoCode = express.Router();
PromoCode.post("/", verifyadmin, Create_PromoCode_Controller); // Create Contact details Route
PromoCode.get("/", verifyadmin, Find_PromoCode_Controller); // Find contacts Data with admin authorization
// PromoCode.put("/", verifyMember, Update_Member_Controller); // Find single Data with admin authorization
// PromoCode.get("/:id", verifyadmin, verifyMember, Single_Member_Controller); // update Data with admin authorization
// PromoCode.delete("/:id", verifyadmin, Delete_Member_Controller);
module.exports = { PromoCode };
