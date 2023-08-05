const express = require("express");
const {
  Create_Appointment_Controller,
  Find_Appointment_Controller,
  Update_Appointment_Controller,
  Single_Appointment_Controller,
  Delete_Appointment_Controller,
} = require("../Controllers/AppointmentController");

const { verifyadmin } = require("../MiddleWares/AdminVerifyMiddleWare");
const AppointmentRoute = express.Router();

AppointmentRoute.post("/", Create_Appointment_Controller); // Create Contact details Route
AppointmentRoute.get("/", verifyadmin, Find_Appointment_Controller); // Find contacts Data with admin authorization
AppointmentRoute.get("/:id", verifyadmin, Single_Appointment_Controller); // Find single Data with admin authorization
AppointmentRoute.put("/:id", verifyadmin, Update_Appointment_Controller); // update Data with admin authorization
AppointmentRoute.delete("/:id", verifyadmin, Delete_Appointment_Controller);
module.exports = { AppointmentRoute };
