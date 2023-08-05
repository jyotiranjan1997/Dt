const express = require("express");
const {
  Create_Doctor_Controller,
  Find_Doctor_Controller,
  Update_Doctor_Controller,
  Single_Doctor_Controller,
  Delete_Doctor_Controller,
} = require("../Controllers/DoctorController");

const { verifyadmin } = require("../MiddleWares/AdminVerifyMiddleWare");
const DoctorRoute = express.Router();

DoctorRoute.post("/", verifyadmin, Create_Doctor_Controller); // Create Contact details Route
DoctorRoute.get("/", verifyadmin, Find_Doctor_Controller); // Find contacts Data with admin authorization
DoctorRoute.get("/:id", verifyadmin, Update_Doctor_Controller); // Find single Data with admin authorization
DoctorRoute.put("/:id", verifyadmin, Single_Doctor_Controller); // update Data with admin authorization
DoctorRoute.delete("/:id", verifyadmin, Delete_Doctor_Controller);
module.exports = { DoctorRoute };
