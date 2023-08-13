const { Member } = require("../Models/MemberModel");

//-------Create Member Details with Message-----------------------------------------------

const Create_Member_Controller = async (req, res) => {
  const { Phone } = req.body;
  try {
    const MemberData = await Member.find({
      Phone,
      Active: true,
    });

    if (MemberData.length) {
      res.status(400).json({ Result: `Error - Member is already exist !` });
    } else {
      await Member.create(req.body);
      res
        .status(200)
        .json({ Result: "Member Added Successfully now get your discount!" });
    }
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

//-------Find all Members according to the query-----------------------------------------

const Find_Member_Controller = async (req, res) => {
  const { page_no, Member_name, page_size } = req.query;

  try {
    /* Finding Members according to query if present */
    const total_Members = await Member.find({
      Active: true,
    }).count();
    if (total_Members === 0) {
      res.status(400).json({ Result: "Error - No Member Exist !" });
    } else {
      if (page_no) {
        const skip_Pages = (page_no - 1) * page_size;
        const Members = await Member.find({
          Active: true,
        })
          .sort({ _id: -1 })
          .skip(skip_Pages)
          .limit(page_size);

        if (Member_name) {
          /* Finding Members according to Member name search req */

          const Members = await Member.find({
            Active: true,
            MemberName: { $regex: ".*" + Member_name, $options: "i" },
          })
            .sort({ _id: -1 })
            .skip(skip_Pages)
            .limit(page_size);
          const total_Members = await Member.find({
            Active: true,
            MemberName: { $regex: ".*" + Member_name, $options: "i" },
          }).count();
          res.status(200).json({ Result: Members, total_Members });
        } else {
          /* Finding Total Numbers of Members */

          const total_Members = await Member.find({
            Active: true,
          }).count();
          res.status(200).json({ Result: Members, total_Members });
        }
      } else {
        /* Finding Members normal api req with default  data */
        const Members = await Member.find({ Active: true }).sort({
          _id: -1,
        });
        const Member_count = await Member.find({
          Active: true,
        }).count();
        res.status(200).json({ Result: Members, total_Members: Member_count });
      }
    }
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

//-------Update Member Details with Message--------------------------------------------

const Update_Member_Controller = async (req, res) => {
  const { _id } = req.body;
  try {
    await Member.findByIdAndUpdate(_id, req.body);
    res.status(200).json({ Result: "Member Updated Successfully!" });
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

//-------Find Single Member data-------------------------------------------

const MemberLogin = async (req, res) => {
  try {
    const { Phone, Password } = req.body;

    const MemberData = await Member.find({ Phone, Password, Active: true });

    if (MemberData.length) {
      MemberData.Password = "";
      res.status(200).json({ Result: MemberData });
    } else {
      res.status(400).json({ Result: "Error - Incorrect details entered !" });
    }
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

const Single_Member_Controller = async (req, res) => {
  const { id } = req.params;

  try {
    const Member_User = await Member.findById(id);
    res.status(200).json({ Result: Member_User });
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

const Delete_Member_Controller = async (req, res) => {
  const { id } = req.params;
  try {
    const Member_User = await Member.find({ _id: id, Active: true });
    if (Member_User.length) {
      await Member.findByIdAndUpdate(id, { Active: false });
      res.status(200).json({ Result: "Member Removed Successfully !" });
    } else {
      res.status(400).json({ Result: "Error - Member already removed !" });
    }
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

module.exports = {
  Create_Member_Controller,
  Find_Member_Controller,
  Update_Member_Controller,
  Single_Member_Controller,
  Delete_Member_Controller,
  MemberLogin,
};
