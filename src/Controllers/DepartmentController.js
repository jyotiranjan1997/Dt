const { Department } = require("../Models/DepartmentModel");

//-------Create Department Details with Message-----------------------------------------------

const Create_Department_Controller = async (req, res) => {
  const { DepartmentName } = req.body;
  try {
    const DepartmentData = await Department.find({
      DepartmentName,
      Active: true,
    });

    if (DepartmentData.length) {
      res.status(400).json({ Result: `Error - Department already exist !` });
    } else {
      await Department.create(req.body);
      res.status(200).json({ Result: "Department Added Successfully!" });
    }
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

//-------Find all Departments according to the query-----------------------------------------

const Find_Department_Controller = async (req, res) => {
  const { page_no, Department_name, page_size } = req.query;

  try {
    /* Finding Departments according to query if present */
    const total_Departments = await Department.find({
      Active: true,
    }).count();
    if (total_Departments === 0) {
      res.status(400).json({ Result: "Error - No Department Exist !" });
    } else {
      if (page_no) {
        const skip_Pages = (page_no - 1) * page_size;
        const Departments = await Department.find({
          Active: true,
        })
          .sort({ _id: -1 })
          .skip(skip_Pages)
          .limit(page_size);

        if (Department_name) {
          /* Finding Departments according to Department name search req */

          const Departments = await Department.find({
            Active: true,
            DepartmentName: { $regex: ".*" + Department_name, $options: "i" },
          })
            .sort({ _id: -1 })
            .skip(skip_Pages)
            .limit(page_size);
          const total_Departments = await Department.find({
            Active: true,
            DepartmentName: { $regex: ".*" + Department_name, $options: "i" },
          }).count();
          res.status(200).json({ Result: Departments, total_Departments });
        } else {
          /* Finding Total Numbers of Departments */

          const total_Departments = await Department.find({
            Active: true,
          }).count();
          res.status(200).json({ Result: Departments, total_Departments });
        }
      } else {
        /* Finding Departments normal api req with default  data */
        const Departments = await Department.find({ Active: true }).sort({
          _id: -1,
        });
        const Department_count = await Department.find({
          Active: true,
        }).count();
        res
          .status(200)
          .json({ Result: Departments, total_Departments: Department_count });
      }
    }
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

//-------Update Department Details with Message--------------------------------------------

const Update_Department_Controller = async (req, res) => {
  const { id } = req.params;
  try {
    await Department.findByIdAndUpdate(id, req.body);
    res.status(200).json({ Result: "Department Updated Successfully!" });
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

//-------Find Single Department data-------------------------------------------

const Single_Department_Controller = async (req, res) => {
  const { id } = req.params;
  try {
    const Department_User = await Department.findById(id);
    res.status(200).json({ Result: Department_User });
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

const Delete_Department_Controller = async (req, res) => {
  const { id } = req.params;
  try {
    const Department_User = await Department.find({ _id: id, Active: true });
    if (Department_User.length) {
      await Department.findByIdAndUpdate(id, { Active: false });
      res.status(200).json({ Result: "Department Removed Successfully !" });
    } else {
      res.status(400).json({ Result: "Error - Department already removed !" });
    }
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

module.exports = {
  Create_Department_Controller,
  Find_Department_Controller,
  Update_Department_Controller,
  Single_Department_Controller,
  Delete_Department_Controller,
};
