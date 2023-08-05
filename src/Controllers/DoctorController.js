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

  try {
    /* Finding Doctors according to query if present */
    const total_Doctors = await Doctor.find({
      Active: true,
    }).count();
    if (total_Doctors === 0) {
      res.status(400).json({ Result: "Error - No Doctor Exist !" });
    } else {
      if (page_no) {
        const skip_Pages = (page_no - 1) * page_size;
        const Doctors = await Doctor.find({
          Active: true,
        })
          .sort({ _id: -1 })
          .skip(skip_Pages)
          .limit(page_size);

        if (Doctor_name) {
          /* Finding Doctors according to Doctor name search req */

          const Doctors = await Doctor.find({
            Active: true,
            Name: { $regex: ".*" + Doctor_name, $options: "i" },
          })
            .sort({ _id: -1 })
            .skip(skip_Pages)
            .limit(page_size);
          const total_Doctors = await Doctor.find({
            Active: true,
            Name: { $regex: ".*" + Doctor_name, $options: "i" },
          }).count();
          res.status(200).json({ Result: Doctors, total_Doctors });
        } else {
          /* Finding Total Numbers of Doctors */

          const total_Doctors = await Doctor.find({
            Active: true,
          }).count();
          res.status(200).json({ Result: Doctors, total_Doctors });
        }
      } else {
        /* Finding Doctors normal api req with default  data */
        const Doctors = await Doctor.find({ Active: true }).sort({ _id: -1 });
        const Doctor_count = await Doctor.find({ Active: true }).count();
        res.status(200).json({ Result: Doctors, total_Doctors: Doctor_count });
      }
    }
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

//-------Update Doctor Details with Message--------------------------------------------

const Update_Doctor_Controller = async (req, res) => {
  const { id } = req.params;
  try {
    await Doctor.findByIdAndUpdate(id, req.body);
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
