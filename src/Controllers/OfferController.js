const { Offer } = require("../Models/OfferModel");

//-------Create Offer Details with Message-----------------------------------------------

const Create_Offer_Controller = async (req, res) => {
  const { OfferTitle } = req.body;
  try {
    const OfferData = await Offer.find({ OfferTitle, Active: true });

    if (OfferData.length) {
      res.status(400).json({ Result: `Error - Offer already exist !` });
    } else {
      await Offer.create(req.body);
      res.status(200).json({ Result: "Offer Added Successfully!" });
    }
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

//-------Find all Offers according to the query-----------------------------------------

const Find_Offer_Controller = async (req, res) => {
  const { page_no, OfferTitle, page_size } = req.query;
  const skip_Pages = (page_no - 1) * page_size;
  var Query = { Active: true };
  if (OfferTitle) {
    Query = {
      Active: true,
      OfferTitle: { $regex: ".*" + OfferTitle, $options: "i" },
    };
  }
  try {
    /* Finding Offers according to query if present */
    const total_Offers = await Offer.find(Query).count();
    const Offers = await Offer.find(Query)
      .sort({ _id: -1 })
      .limit(page_size)
      .skip(skip_Pages ? skip_Pages : 0);

    if (total_Offers === 0) {
      res.status(400).json({ Result: "Error - No Offer Exist !" });
    } else {
      res.status(200).json({ Result: Offers, total_Offers });
    }
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

//-------Update Offer Details with Message--------------------------------------------

const Update_Offer_Controller = async (req, res) => {
  const { _id } = req.body;
  try {
    await Offer.findByIdAndUpdate(_id, req.body);
    res.status(200).json({ Result: "Offer Updated Successfully!" });
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

//-------Find Single Offer data-------------------------------------------

const Single_Offer_Controller = async (req, res) => {
  const { id } = req.params;
  try {
    const Offer_User = await Offer.findById(id);
    res.status(200).json({ Result: Offer_User });
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

const Delete_Offer_Controller = async (req, res) => {
  const { id } = req.params;
  try {
    const Offer_User = await Offer.find({ _id: id, Active: true });
    if (Offer_User.length) {
      await Offer.findByIdAndUpdate(id, { Active: false });
      res.status(200).json({ Result: "Offer Removed Successfully !" });
    } else {
      res.status(400).json({ Result: "Error - Offer already removed !" });
    }
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

module.exports = {
  Create_Offer_Controller,
  Find_Offer_Controller,
  Update_Offer_Controller,
  Single_Offer_Controller,
  Delete_Offer_Controller,
};
