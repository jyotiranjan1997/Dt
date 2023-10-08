const { PromoCode } = require("../Models/PromoCodeModel");

//-------Create PromoCode Details with Message-----------------------------------------------

const Create_PromoCode_Controller = async (req, res) => {
  const { PromoCode, PromoCodeType } = req.body;
  try {
    const PromoCodeData = await PromoCode.find({ PromoCodeType, Active: true });

    if (PromoCodeData.length) {
      await PromoCode.findByIdAndUpdate(PromoCodeData[0]._id, {
        Active: false,
      });
      await PromoCode.create(req.body);
      res.status(200).json({ Result: "PromoCode Added Successfully!" });
    } else {
      await PromoCode.create(req.body);
      res.status(200).json({ Result: "PromoCode Added Successfully!" });
    }
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

//-------Find all PromoCodes according to the query-----------------------------------------

const Find_PromoCode_Controller = async (req, res) => {
  const { page_no, PromoCodeTitle, page_size } = req.query;
  const skip_Pages = (page_no - 1) * page_size;
  var Query = { Active: true };
  if (PromoCodeTitle) {
    Query = {
      Active: true,
      PromoCodeTitle: { $regex: ".*" + PromoCodeTitle, $options: "i" },
    };
  }
  try {
    /* Finding PromoCodes according to query if present */
    const total_PromoCodes = await PromoCode.find(Query).count();
    const PromoCodes = await PromoCode.find(Query)
      .sort({ _id: -1 })
      .limit(page_size)
      .skip(skip_Pages ? skip_Pages : 0);

    if (total_PromoCodes === 0) {
      res.status(400).json({ Result: "Error - No PromoCode Exist !" });
    } else {
      res.status(200).json({ Result: PromoCodes, total_PromoCodes });
    }
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

//-------Update PromoCode Details with Message--------------------------------------------

const Update_PromoCode_Controller = async (req, res) => {
  const { _id } = req.body;
  try {
    await PromoCode.findByIdAndUpdate(_id, req.body);
    res.status(200).json({ Result: "PromoCode Updated Successfully!" });
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

//-------Find Single PromoCode data-------------------------------------------

const Single_PromoCode_Controller = async (req, res) => {
  const { id } = req.params;
  try {
    const PromoCode_User = await PromoCode.findById(id);
    res.status(200).json({ Result: PromoCode_User });
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

const Delete_PromoCode_Controller = async (req, res) => {
  const { id } = req.params;
  try {
    const PromoCode_User = await PromoCode.find({ _id: id, Active: true });
    if (PromoCode_User.length) {
      await PromoCode.findByIdAndUpdate(id, { Active: false });
      res.status(200).json({ Result: "PromoCode Removed Successfully !" });
    } else {
      res.status(400).json({ Result: "Error - PromoCode already removed !" });
    }
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

module.exports = {
  Create_PromoCode_Controller,
  Find_PromoCode_Controller,
  Update_PromoCode_Controller,
  Single_PromoCode_Controller,
  Delete_PromoCode_Controller,
};
