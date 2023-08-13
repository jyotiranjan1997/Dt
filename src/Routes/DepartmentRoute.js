const express = require("express");
const {
  Create_Department_Controller,
  Find_Department_Controller,
  Update_Department_Controller,
  Single_Department_Controller,
  Delete_Department_Controller,
} = require("../Controllers/DepartmentController");

const { verifyadmin } = require("../MiddleWares/AdminVerifyMiddleWare");
const DepartmentRoute = express.Router();

DepartmentRoute.post("/", verifyadmin, Create_Department_Controller); // Create Contact details Route
DepartmentRoute.get("/", Find_Department_Controller); // Find contacts Data with admin authorization
DepartmentRoute.put("/", Update_Department_Controller); // Find single Data with admin authorization
DepartmentRoute.get("/:id", Single_Department_Controller); // update Data with admin authorization
DepartmentRoute.delete("/:id", verifyadmin, Delete_Department_Controller);
module.exports = { DepartmentRoute };
