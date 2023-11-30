// const { upload } = require("../MiddleWares/UploadMiddleWare");
const { Appointment } = require("../Models/AppointmentModel");
const { Member } = require("../Models/MemberModel");
const { PromoCode } = require("../Models/PromoCodeModel");
const imgbbUploader = require("imgbb-uploader");
//---------------------Create Appointment Details with Message-----------------------------------------------

const Create_Appointment_Controller = async (req, res) => {
  try {
    if (req.body?.PromoCode) {
      let Code = await PromoCode.findOne({
        PromoCodeName: req.body.PromoCode,
        Active: true,
      });
      if (req.body?.TotalPrice) {
        req.body.TestPrice = Math.floor(
          req.body.TotalPrice - (req.body.TotalPrice * Code.Discount) / 100
        );
      }
    } else {
      if (req.body?.TotalPrice) {
        req.body.TestPrice = Math.floor(
          req.body.TotalPrice - (req.body.TotalPrice * 10) / 100
        );
      }
    }
    if (req.body?.ReferId && req.body?.TotalPrice) {
      let MemberData = await Member.findOne({
        Active: true,
        _id: req.body.ReferId,
      });
      if (MemberData) {
        req.body.MemberPrice =
          Math.floor(req.body.TotalPrice * MemberData.Discount) / 100;
      }
    }
    await Appointment.create({ ...req.body });
    res.status(200).json({ Result: "Appointment Added Successfully!" });
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

//---------------------Find all Appointments according to the query-----------------------------------------

const Find_Referal_Controller = async (req, res) => {
  try {
    const { id } = req.params;
    const Referals = await Appointment.find({
      Active: true,
      isPaid: false,
      ReferId: id,
    })
      .populate(["Department", "Doctor", "ReferId"])
      .sort({ _id: -1 });
    const total_referals = await Appointment.find({
      Active: true,
      isPaid: false,
      ReferId: id,
    }).count();
    if (total_referals === 0) {
      res.status(400).json({ Result: "No Referal are exist !" });
    } else {
      res.status(200).json({ Result: Referals, total_referals });
    }
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

const Find_Appointment_Controller = async (req, res) => {
  const { page_no, Appointment_name, page_size } = req.query;
  const skip_Pages = (page_no - 1) * page_size;
  var Query = {
    Active: true,
  };
  if (Appointment_name) {
    Query = {
      Active: true,
      $or: [
        { Name: { $regex: ".*" + Appointment_name, $options: "i" } },
        { Phone: { $regex: ".*" + Appointment_name, $options: "i" } },
        { Email: { $regex: ".*" + Appointment_name, $options: "i" } },
      ],
    };
  }
  try {
    const Appointments = await Appointment.find(Query)
      .populate(["Department", "Doctor", "ReferId"])
      .sort({ _id: -1 })
      .limit(page_size)
      .skip(skip_Pages ? skip_Pages : 0);
    const total_Appointments = await Appointment.find(Query).count();
    if (total_Appointments === 0) {
      res.status(400).json({ Result: "Error - No Appointment Exist !" });
    } else {
      res.status(200).json({
        Result: Appointments,
        total_Appointments,
      });
    }
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

//-------------------------Update Appointment Details with Message--------------------------------------------

const Update_Appointment_Controller = async (req, res) => {
  const { _id, Report } = req.body;
  try {
    // const uploadSingle = upload("photon-report").single("Report");

    if (req.body?.PromoCode) {
      let Code = await PromoCode.find({ PromoCodeName: req.body.PromoCode });
      if (req.body?.TotalPrice) {
        req.body.TestPrice = Math.floor(
          req.body.TotalPrice - (req.body.TotalPrice * Code.Discount) / 100
        );
      }
    } else {
      if (req.body?.TotalPrice) {
        req.body.TestPrice = Math.floor(
          req.body.TotalPrice - (req.body.TotalPrice * 10) / 100
        );
      }
    }

    if (req.body?.ReferId && req.body?.TotalPrice) {
      let MemberData = await Member.findOne({
        Active: true,
        _id: req.body.ReferId,
      });

      if (MemberData) {
        req.body.MemberPrice = Math.floor(
          (req.body.TotalPrice * MemberData.Discount) / 100
        );
      } else {
        res.status(400).json({ Result: "Error - Member not exist !" });
      }
    }

    console.log(Report);
    await Appointment.findByIdAndUpdate(_id, { ...req.body });
    res.status(200).json({ Result: "Appointment Updated Successfully!" });
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

//--------------------------Find Single Appointment data-------------------------------------------

const Single_Appointment_Controller = async (req, res) => {
  const { id } = req.params;
  try {
    const Appointment_User = await Appointment.findById(id);
    res.status(200).json({ Result: Appointment_User });
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

//--------------------------Delete Single Appointment data-------------------------------------------

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
  Find_Referal_Controller,
};
