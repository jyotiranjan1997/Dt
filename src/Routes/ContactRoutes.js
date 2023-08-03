const express = require("express");
const {
  Create_Contact_Controller,
  Update_Contact_Controller,
  Single_Contact_Controller,
  Find_Contact_Controller,
  Delete_Contact_Controller,
} = require("../Controllers/ContactController");

const { verifyadmin } = require("../MiddleWares/AdminVerifyMiddleWare");
const ContactRoute = express.Router();

ContactRoute.post("/", Create_Contact_Controller); // Create Contact details Route
ContactRoute.get("/", verifyadmin, Find_Contact_Controller); // Find contacts Data with admin authorization
ContactRoute.get("/:id", verifyadmin, Single_Contact_Controller); // Find single Data with admin authorization
ContactRoute.put("/:id", verifyadmin, Update_Contact_Controller); // update Data with admin authorization
ContactRoute.delete("/:id", verifyadmin, Delete_Contact_Controller);
module.exports = { ContactRoute };
