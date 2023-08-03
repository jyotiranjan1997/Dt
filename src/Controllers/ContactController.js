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

  try {
    /* Finding Contacts according to query if present */
    const total_contacts = await Contact.find({
      Active: true,
    }).count();
    if (total_contacts === 0) {
      res.status(400).json({ Result: "Error - No Contact Exist !" });
    } else {
      if (page_no) {
        const skip_Pages = (page_no - 1) * page_size;
        const Contacts = await Contact.find({
          Active: true,
        })
          .sort({ _id: -1 })
          .skip(skip_Pages)
          .limit(page_size);

        if (contact_name) {
          /* Finding Contacts according to contact name search req */

          const Contacts = await Contact.find({
            Active: true,
            Name: { $regex: ".*" + contact_name, $options: "i" },
          })
            .sort({ _id: -1 })
            .skip(skip_Pages)
            .limit(page_size);
          const total_contacts = await Contact.find({
            Active: true,
            Name: { $regex: ".*" + contact_name, $options: "i" },
          }).count();
          res.status(200).json({ Result: Contacts, total_contacts });
        } else {
          /* Finding Total Numbers of Contacts */

          const total_contacts = await Contact.find({
            Active: true,
          }).count();
          res.status(200).json({ Result: Contacts, total_contacts });
        }
      } else {
        /* Finding Contacts normal api req with default  data */
        const Contacts = await Contact.find({ Active: true }).sort({ _id: -1 });
        const Contact_count = await Contact.find({ Active: true }).count();
        res
          .status(200)
          .json({ Result: Contacts, total_contacts: Contact_count });
      }
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
