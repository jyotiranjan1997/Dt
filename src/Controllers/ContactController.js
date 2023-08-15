const { Contact } = require("../Models/ContactModel");

//-------Create Contact Details with Message-----------------------------------------------

const Create_Contact_Controller = async (req, res) => {
  const { Name, Email, Phone, Message } = req.body;
  try {
    await Contact.create({ Name, Email, Phone, Message });
    res.status(200).json({ Result: "Contact Added Successfully!" });
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

//-------Find all Contacts according to the query-----------------------------------------

const Find_Contact_Controller = async (req, res) => {
  const { page_no, contact_name, page_size } = req.query;
  const skip_Pages = (page_no - 1) * page_size;
  var Query = { Active: true };
  if (contact_name) {
    Query = {
      Active: true,
      Name: { $regex: ".*" + contact_name, $options: "i" },
    };
  }

  try {
    /* Finding Contacts according to query if present */

    const total_contacts = await Contact.find(Query).count();
    const Contacts = await Contact.find(Query)
      .sort({ _id: -1 })
      .limit(page_size)
      .skip(skip_Pages ? skip_Pages : 0);

    if (total_contacts === 0) {
      res.status(400).json({ Result: "Error - No Contact Exist !" });
    } else {
      res.status(200).json({ Result: Contacts, total_contacts });
    }
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

//-------Update Contact Details with Message--------------------------------------------

const Update_Contact_Controller = async (req, res) => {
  const { id } = req.params;
  try {
    await Contact.findByIdAndUpdate(id, req.body);
    res.status(200).json({ Result: "Contact Updated Successfully!" });
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

//-------Find Single contact data-------------------------------------------

const Single_Contact_Controller = async (req, res) => {
  const { id } = req.params;
  try {
    const Contact_User = await Contact.findById(id);
    res.status(200).json({ Result: Contact_User });
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

const Delete_Contact_Controller = async (req, res) => {
  const { id } = req.params;
  try {
    const Contact_User = await Contact.find({ _id: id, Active: true });
    if (Contact_User.length) {
      await Contact.findByIdAndUpdate(id, { Active: false });
      res.status(200).json({ Result: "Contact Removed Successfully !" });
    } else {
      res.status(400).json({ Result: "Error - Contact already removed !" });
    }
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

module.exports = {
  Create_Contact_Controller,
  Find_Contact_Controller,
  Update_Contact_Controller,
  Single_Contact_Controller,
  Delete_Contact_Controller,
};
