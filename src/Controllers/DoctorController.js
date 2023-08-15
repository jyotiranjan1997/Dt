const { Doctor } = require("../Models/DoctorModel");

//-------Create Doctor Details with Message-----------------------------------------------

const Create_Doctor_Controller = async (req, res) => {
  const { Name, Phone } = req.body;
  try {
    const DoctorData = await Doctor.find({ Name, Phone, Active: true });

    if (DoctorData.length) {
      res.status(400).json({ Result: `Error - Doctor already exist !` });
    } else {
      await Doctor.create(req.body);
      res.status(200).json({ Result: "Doctor Added Successfully!" });
    }
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

//-------Find all Doctors according to the query-----------------------------------------

const Find_Doctor_Controller = async (req, res) => {
  const { page_no, Doctor_name, page_size } = req.query;
  const skip_Pages = (page_no - 1) * page_size;
  var Query = { Active: true };
  if (Doctor_name) {
    Query = {
      Active: true,
      Name: { $regex: ".*" + Doctor_name, $options: "i" },
    };
  }
  try {
    /* Finding Doctors according to query if present */
    const total_Doctors = await Doctor.find(Query).count();
    const Doctors = await Doctor.find(Query)
      .sort({ _id: -1 })
      .limit(page_size)
      .skip(skip_Pages ? skip_Pages : 0);

    if (total_Doctors === 0) {
      res.status(400).json({ Result: "Error - No Doctor Exist !" });
    } else {
      res.status(200).json({ Result: Doctors, total_Doctors });
    }
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

//-------Update Doctor Details with Message--------------------------------------------

const Update_Doctor_Controller = async (req, res) => {
  const { _id } = req.body;
  try {
    await Doctor.findByIdAndUpdate(_id, req.body);
    res.status(200).json({ Result: "Doctor Updated Successfully!" });
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

//-------Find Single Doctor data-------------------------------------------

const Single_Doctor_Controller = async (req, res) => {
  const { id } = req.params;
  try {
    const Doctor_User = await Doctor.findById(id);
    res.status(200).json({ Result: Doctor_User });
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

const Delete_Doctor_Controller = async (req, res) => {
  const { id } = req.params;
  try {
    const Doctor_User = await Doctor.find({ _id: id, Active: true });
    if (Doctor_User.length) {
      await Doctor.findByIdAndUpdate(id, { Active: false });
      res.status(200).json({ Result: "Doctor Removed Successfully !" });
    } else {
      res.status(400).json({ Result: "Error - Doctor already removed !" });
    }
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

module.exports = {
  Create_Doctor_Controller,
  Find_Doctor_Controller,
  Update_Doctor_Controller,
  Single_Doctor_Controller,
  Delete_Doctor_Controller,
};
