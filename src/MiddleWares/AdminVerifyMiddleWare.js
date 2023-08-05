const { User } = require("../Models/UserModel");
var jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = process.env;

//-------------------Verify Admin for check Login user admin or not-----------------------------

const verifyadmin = async (req, res, next) => {
  try {
    const Authorization = req.headers?.authorization;
    if (Authorization) {
      const token = Authorization.split(" ")[1];
      const decoded = jwt.verify(token, PRIVATE_KEY);
      if (decoded) {
        const Admin_User = await User.findById(decoded.User._id);
        if (Admin_User && Admin_User?.isAdmin === true) {
          req.body.isSuperAdmin = Admin_User.isSuperAdmin;
          req.body.user_id = Admin_User._id;
          req.user = Admin_User;
          next();
        } else {
          res.status(400).json({ Result: "Error - You are unauthorized !" });
        }
      } else {
        return res
          .status(400)
          .json({ Result: "Error - You are not authenticated!" });
      }
    } else {
      return res
        .status(400)
        .json({ Result: "Error - You are not authenticated!" });
    }
  } catch (ex) {
    res.status(400).json({ Result: ex.message });
  }
};

module.exports = { verifyadmin };
