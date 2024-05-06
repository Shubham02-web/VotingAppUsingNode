const express = require("express");
const {
  SignUpUser,
  LoginUser,
  UserProfile,
  UpdatePassword,
} = require("../controller/userController.js");
const jwtAuthMiddleware = require("./../jwt.js");
const route = express.Router();

route.post("/SignUp", SignUpUser);
route.post("/login", LoginUser);
route.get("/profile", jwtAuthMiddleware, UserProfile);
route.put("/updatePassword", jwtAuthMiddleware, UpdatePassword);

module.exports = route;
