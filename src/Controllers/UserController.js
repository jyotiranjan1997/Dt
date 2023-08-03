const { User } = require("../Models/UserModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = process.env;
const saltRounds = 7;

// ----------Login User checking Password and Find user into database---------------------

const User_Login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await User.findOne({ Email }).select("+Password");

    if (user) {
      bcrypt.compare(Password, user.Password, async function (err, result) {
        // result == true
        if (err) {
          res.status(400).json({ Result: `Error - ${err.message}` });
        }

        if (result) {
          var Details = user.toObject();
          delete Details.Password;
          let token = jwt.sign({ User: Details }, PRIVATE_KEY, {
            expiresIn: "10h",
          });
          res.status(200).json({ accesstoken: token, Result: Details });
        } else {
          res.status(400).json({ Result: "Error - Incorrect password !" });
        }

        if (err) {
          res.status(400).json({ Result: err });
        }
      });
    } else {
      res.status(400).json({ Result: "Error - user is not Exist !" });
    }
  } catch (ex) {
    res.status(400).json({ Result: `Error-${ex.message}` });
  }
};

const PasswordChange = async (req, res) => {
  const { user_id, NewPassword, CurrentPassword } = req.body;
  try {
    let user_det = await User.find({ _id: user_id, Active: true }).select(
      "+Password"
    );
    if (user_det.length) {
      bcrypt.compare(
        CurrentPassword,
        user_det[0].Password,
        async function (err, result) {
          // result == true
          if (err) {
            res.status(400).json({ Result: `Error - ${err.message}` });
          }
          if (result) {
            if (NewPassword === CurrentPassword) {
              res.status(400).json({
                Result: "Error - New Password and Current Password Same!",
              });
            } else {
              bcrypt.hash(NewPassword, saltRounds, async function (err, hash) {
                // Store hash in your password DB.
                if (hash) {
                  await User.findByIdAndUpdate(user_id, {
                    Password: hash,
                  });
                  res
                    .status(200)
                    .json({ Result: "Password Changed Successfully !" });
                }
                if (err) {
                  res.status(400).json({ Result: err.message });
                }
              });
            }
          } else {
            res
              .status(400)
              .json({ Result: "Error - Incorrect Current password !" });
          }

          if (err) {
            res.status(400).json({ Result: err });
          }
        }
      );
    } else {
      res.status(400).json({ Result: "Error - user is not Exist !" });
    }
  } catch (ex) {
    res.status(400).json({ Result: "Error - " + ex.message });
  }
};

// ----------Register User Password Hashing and also store------------------------------------
const User_Signup = async (req, res) => {
  try {
    const { Name, Email, Phone, Password, isAdmin, CreatedBy } = req.body;
    const Old_User = await User.find({ Email });

    if (Old_User.length > 0) {
      res.status(400).json({ Result: "Error - User already Exist!" });
    } else {
      bcrypt.hash(Password, saltRounds, async function (err, hash) {
        // Store hash in your password DB.

        if (hash) {
          await User.create({
            Name,
            Email,
            Phone,
            Password: hash,
            isAdmin,
            CreatedBy,
          });
          res.status(200).json({ Result: "Register Successfully!" });
        }
        if (err) {
          res.status(400).json({ Result: err.message });
        }
      });
    }
  } catch (ex) {
    res.status(400).json({ Result: ex.message });
  }
};

//-----------Update User Details and also store-------------------------------------------------
const Update_User = async (req, res) => {
  const { id } = req.params;
  try {
    const { Name, Email, Phone, isAdmin, ModifiedBy } = req.body;
    const user = await User.find({ _id, Active: true });
    if (user.length) {
      await User.findByIdAndUpdate(id, {
        Name,
        Email,
        Phone,
        isAdmin,
        ModifiedBy,
      });

      res.status(200).json({ Result: "Details Updated Successfully!" });
    } else {
      res.status(400).json({ Result: "Error - User not exist!" });
    }
  } catch (ex) {
    res.status(400).json({ Result: `Error - ${ex.message}` });
  }
};

//-----------Find users lists according to query----------------------------------------
const User_Lists = async (req, res) => {
  const { page_no, user_name, page_size } = req.query;
  try {
    const { id } = req.params;
    /* Find single Contact By User if params present */
    if (id) {
      const user = await User.find({ _id: id, Active: true }).select(
        "+Password"
      );
      if (user.length) {
        res.status(200).json({ Result: user[0] });
      } else {
        res.status(400).json({ Result: "Error - User not exist!" });
      }
    } else {
      /* Find Users according to queries */
      const total_users = await User.find({ Active: true }).count();
      if (total_users === 0) {
        res.status(400).json({ Result: "Error - No Users exist !" });
      } else {
        if (req.query.page_no) {
          const skip_Pages = (page_no - 1) * page_size;
          const users = await User.find({ Active: true })
            .sort({ _id: -1 })
            .skip(skip_Pages)
            .limit(page_size)
            .select("+Password");
          if (user_name) {
            const users = await User.find({
              Name: { $regex: ".*" + user_name, $options: "i" },
              Active: true,
            })
              .sort({ _id: -1 })
              .skip(skip_Pages)
              .limit(page_size)
              .select("+Password");
            const total_users = await User.find({
              Name: { $regex: ".*" + user_name, $options: "i" },
              Active: true,
            }).count();

            res.status(200).json({ Result: users, total_users });
          } else {
            /* Find Users without search with user name  */
            res.status(200).json({ Result: users, total_users });
          }
        } else {
          /* Find Users simple with 5 data */
          const users = await User.find({ Active: true }).sort({ _id: -1 });
          res.status(200).json({ Result: users, total_users });
        }
      }
    }
  } catch (ex) {
    res.status(400).json({ Result: ex.message });
  }
};
//------------Forgot Password------------------
const Forgot_Password = async (req, res) => {
  const { Email } = req.body;
  try {
    let user_data = await User.find({ Email, Active: true }).select(
      "+Password"
    );
    if (user_data.length) {
      res.status(200).json({ Result: "success" });
    } else
      res
        .status(400)
        .json({ Result: "Error - No user found with this Email !" });
  } catch (ex) {
    res.status(400).json({ Result: `Error - ${ex.message} ` });
  }
};

module.exports = {
  User_Login,
  User_Signup,
  Update_User,
  User_Lists,
  PasswordChange,
  Forgot_Password,
};
