const mongoose = require("mongoose");
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
    type: email,
    isValidate: true,
  },
  mobile: {
    type: String,
  },
  aadharNumber: {
    type: Number,
    required: [true, "Adhar Number is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
