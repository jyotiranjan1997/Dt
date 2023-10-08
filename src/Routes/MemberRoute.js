const express = require("express");
const {
  Create_Member_Controller,
  Find_Member_Controller,
  Update_Member_Controller,
  Single_Member_Controller,
  Delete_Member_Controller,
  MemberLogin,
  MemberPasswordChange,
} = require("../Controllers/MemberController");

const {
  verifyadmin,
  verifyMember,
} = require("../MiddleWares/AdminVerifyMiddleWare");

const MemberRoute = express.Router();

MemberRoute.post("/memberlogin", MemberLogin);
MemberRoute.post("/", Create_Member_Controller); // Create Contact details Route
MemberRoute.put("/change/password", verifyadmin, MemberPasswordChange);
MemberRoute.get("/", verifyadmin, Find_Member_Controller); // Find contacts Data with admin authorization
MemberRoute.put("/", verifyMember, Update_Member_Controller); // Find single Data with admin authorization
MemberRoute.get("/:id", verifyadmin, verifyMember, Single_Member_Controller); // update Data with admin authorization

MemberRoute.delete("/:id", verifyadmin, Delete_Member_Controller);

module.exports = { MemberRoute };
