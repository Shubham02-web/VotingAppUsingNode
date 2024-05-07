const { generateToken } = require("./../jwt.js");
const JWT = require("jsonwebtoken");
const User = require("../models/user.js");
const SignUpUser = async (req, res) => {
  try {
    const {
      name,
      age,
      email,
      mobile,
      password,
      aadharNumber,
      address,
      role,
      isVoted,
    } = req.body;

    if (!name || !age || !password || !aadharNumber || !address)
      return res.status(401).send({
        success: false,
        message: "Please Enter all fields",
      });

    const newUser = await User.create({
      name,
      age,
      email,
      mobile,
      password,
      aadharNumber,
      address,
      role,
      isVoted,
    });
    res.status(201).json({
      success: true,
      message: "Voter Sign Up Succesfully go for login",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error in sign up or user register API",
    });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { aadharNumber, password } = req.body;
    const user = await User.findOne({ aadharNumber });

    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({
        success: false,
        message: "invalid aadharNumber or password",
      });

    const token = JWT.sign({ user }, process.env.JWT_SECRET);
    if (!token)
      return res.status(400).json({
        success: false,
        message: "Failed to generate JWT Token ",
      });
    res.cookie("token", token).status(201).json({
      success: true,
      message: "login successfull",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Login API",
    });
  }
};

const UserProfile = async (req, res) => {
  try {
    const userData = req.user.user._id;
    const user = await User.findById(userData);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in User Profile route",
    });
  }
};

const UpdatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.user._id;
    const user = await User.findById(userId);

    if (!(await user.comparePassword(currentPassword)))
      return res.status(400).json({
        success: false,
        message: "invalid Id Or Password",
      });
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Update Succesfully",
    });
  } catch (error) {}
};
const removeCookie = async (req, res, next) => {
  res.cookie("token", "").send("cokie reset succesfully");
};
module.exports = {
  SignUpUser,
  LoginUser,
  UserProfile,
  UpdatePassword,
  removeCookie,
};
