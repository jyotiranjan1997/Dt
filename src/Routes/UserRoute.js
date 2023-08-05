const express = require("express");

const {
  User_Login,
  User_Signup,
  Update_User,
  User_Lists,
  PasswordChange,
  Forgot_Password,
} = require("../Controllers/UserController");

const { verifyadmin } = require("../MiddleWares/AdminVerifyMiddleWare");

const UserRoute = express.Router();

UserRoute.post("/login", User_Login); // TO LOGIN USER
UserRoute.put("/:id", verifyadmin, Update_User); // TO UPDATE
UserRoute.post("/register", User_Signup); // To Register user with admin validation
UserRoute.get("/", verifyadmin, User_Lists); // TO get the list
UserRoute.get("/:id", verifyadmin, User_Lists); // To get single record for update
UserRoute.post("/changepassword", verifyadmin, PasswordChange); //TO UPDATE PASSWORD
UserRoute.post("/forgotpassword", verifyadmin, Forgot_Password); //TO UPDATE PASSWORD

module.exports = { UserRoute };
