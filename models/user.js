const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const express = require("express");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required field"],
  },
  age: {
    type: Number,
    required: [true, "age is required"],
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  aadharNumber: {
    type: Number,
    required: [true, "Adhar Number is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  role: {
    type: String,
    enum: ["voter", "admin"],
    default: "voter",
  },
  isVoted: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  let voter = this;
  if (!voter.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(voter.password, salt);
    voter.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
