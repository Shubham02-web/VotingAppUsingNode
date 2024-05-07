const JWT = require("jsonwebtoken");
const User = require("./models/user");
const generateToken = function () {
  const token = JWT.sign(User, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  return token;
};
const isAuth = (req, res, next) => {
  // const authhead = req.headers["authorization"];
  // const token = authhead && authhead.split(" ")[1];
  const token = req.cookies.token;
  if (!token)
    return res.status(500).send({
      success: false,
      message: "token not found",
    });
  JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(404).send({
        success: false,
        message: "Unable to verify token",
      });
    req.user = decoded;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  const userId = req.user.user._id;
  const admin = await User.findById(userId);
  if (admin.role !== "admin")
    return res.status(500).send({
      success: false,
      message: "Admin only",
      userId,
    });
  next();
};
module.exports = { isAuth, isAdmin, generateToken };
