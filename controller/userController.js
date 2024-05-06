const { generateToken } = require("./../jwt.js");
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

    const response = await newUser.save();
    const payLoad = {
      id: response._id,
    };
    console.log(JSON.stringify(payLoad));
    const token = generateToken(payLoad);
    console.log("token is : ", token);

    res.status(201).json({
      response: response,
      token: token,
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

    const token = await user.generateToken();

    res
      .status(201)
      .cookie("token", token, {
        expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      })
      .json({
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
    const userData = req.user;
    const userId = userData.id;
    const user = await User.findById(userId);
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
    const userId = req.user.id;

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

module.exports = { SignUpUser, LoginUser, UserProfile, UpdatePassword };
