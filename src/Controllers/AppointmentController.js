const { Appointment } = require("../Models/AppointmentModel");

//-------Create Appointment Details with Message-----------------------------------------------

const Create_Appointment_Controller = async (req, res) => {
  try {
    await Appointment.create(req.body);
    res.status(200).json({ Result: "Appointment Added Successfully!" });
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

//-------Find all Appointments according to the query-----------------------------------------

const Find_Appointment_Controller = async (req, res) => {
  const { page_no, Appointment_name, page_size } = req.query;
  const skip_Pages = (page_no - 1) * page_size;
  var Query = {
    Active: true,
  };
  if (Appointment_name) {
    Query = {
      Active: true,
      Name: { $regex: ".*" + Appointment_name, $options: "i" },
    };
  }
  try {
    const Appointments = await Appointment.find(Query)
      .populate(["Department", "Doctor"])
      .sort({ _id: -1 })
      .limit(page_size)
      .skip(skip_Pages ? skip_Pages : 0);
    const total_Appointments = await Appointment.find(Query).count();

    if (total_Appointments === 0) {
      res.status(400).json({ Result: "Error - No Appointment Exist !" });
    } else {
      res.status(200).json({
        Result: Appointments,
        total_Appointments: Appointment_count,
      });
    }
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

//-------Update Appointment Details with Message--------------------------------------------

const Update_Appointment_Controller = async (req, res) => {
  const { _id } = req.body;
  try {
    await Appointment.findByIdAndUpdate(_id, req.body);
    res.status(200).json({ Result: "Appointment Updated Successfully!" });
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

//-------Find Single Appointment data-------------------------------------------

const Single_Appointment_Controller = async (req, res) => {
  const { id } = req.params;
  try {
    const Appointment_User = await Appointment.findById(id);
    res.status(200).json({ Result: Appointment_User });
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

const Delete_Appointment_Controller = async (req, res) => {
  const { id } = req.params;
  try {
    const Appointment_User = await Appointment.find({ _id: id, Active: true });
    if (Appointment_User.length) {
      await Appointment.findByIdAndUpdate(id, { Active: false });
      res.status(200).json({ Result: "Appointment Removed Successfully !" });
    } else {
      res.status(400).json({ Result: "Error - Appointment already removed !" });
    }
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

module.exports = {
  Create_Appointment_Controller,
  Find_Appointment_Controller,
  Update_Appointment_Controller,
  Single_Appointment_Controller,
  Delete_Appointment_Controller,
};
