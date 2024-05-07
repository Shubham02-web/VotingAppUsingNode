const express = require("express");
const {
  SignUpUser,
  LoginUser,
  UserProfile,
  UpdatePassword,
  removeCookie,
} = require("../controller/userController.js");
const { isAuth, isAdmin } = require("./../jwt.js");
const route = express.Router();

route.post("/SignUp", SignUpUser);
route.post("/login", LoginUser);
route.get("/profile", isAuth, UserProfile);
route.put("/updatePassword", isAuth, UpdatePassword);
route.put("/logout", removeCookie);

module.exports = route;
