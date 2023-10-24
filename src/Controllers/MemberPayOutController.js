const { MemberPayOut } = require("../Models/MemberPayoutModel");
const { Member } = require("../Models/MemberModel");
const { Appointment } = require("../Models/AppointmentModel");
const GET_TIME = (time) => {
  var date = new Date(time);

  return date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
};

const MemberPayout_Create = async (req, res) => {
  console.log(req.body);
  const { MemberId } = req.body;
  const d = new Date();
  let PayOutDate = GET_TIME(d);
  try {
    const MemberPayOutData = await MemberPayOut.findOne({
      Active: true,
      MemberId,
    });
    console.log(MemberPayOutData);
    if (MemberPayOutData && MemberPayOutData?.PayOutStatus === false) {
      res
        .status(400)
        .json({ Result: "Error - already payment req send pending !" });
    } else {
      const MemberData = await Member.findOne({ Active: true, _id: MemberId });
      if (MemberData) {
        await MemberPayOut.create({ ...req.body, PayOutDate });
        res
          .status(200)
          .json({ Result: "Payment withdrawal req send successfully!" });
      } else {
        res.status(400).json({ Result: "Error - contact admin some error !" });
      }
    }
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

const MemberPayOut_Data = async (req, res) => {
  const { memberId } = req.params;
  try {
    const MemberData = await MemberPayOut.findOne({
      Active: true,
      MemberId: memberId,
      PayOutStatus: false,
    }).sort({ _id: -1 });
    const MemberPayoutData = await MemberPayOut.findOne({
      Active: true,
      MemberId: memberId,
      PayOutStatus: true,
    }).sort({ _id: -1 });
    res.status(200).json({ Result: [MemberData, MemberPayoutData] });
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

const PayOut_List = async (req, res) => {
  try {
    const MemberData = await MemberPayOut.find({
      Active: true,
    }).sort({ _id: -1 });
    // const MemberPayoutData = await MemberPayOut.findOne({
    //   Active: true,
    //   MemberId: memberId,
    //   PayOutStatus: true,
    // }).sort({ _id: -1 });
    res.status(200).json({ Result: MemberData });
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

const Member_Payout_Success = async (req, res) => {
  const { _id, MemberId, PayOutStatus } = req.body;
  try {
    if (!PayOutStatus) {
      await MemberPayOut.findByIdAndUpdate(_id, {
        ...req.body,
        PayOutStatus: true,
      });
      await Appointment.updateMany(
        { Active: true, ReferId: MemberId },
        { isPaid: true }
      );
      res.status(200).json({ Result: "Payment done successfully !" });
    } else {
      res
        .status(400)
        .json({ Result: "Error - Payment already successfully !" });
    }
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

module.exports = {
  MemberPayout_Create,
  Member_Payout_Success,
  MemberPayOut_Data,
  PayOut_List,
};
