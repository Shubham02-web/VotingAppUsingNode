const JWT = require("jsonwebtoken");
const User = require("./models/user");
// const jwtAuthMiddleware = async(req, res, next) => {
// const token = req.cookie;
// console.log(req.Cookie);
// if (!authorization)
// return res.status(401).json({
// error: "token not found",
// });

// const token = req.headers.authorization.split("")[1];
// if (!token)
// return res.status(401).json({
// error: "Unauthorized",
// });

// try {
// jwt verify token

// const decode = jwt.verify(token, process.env.JWT_SECRET);
// req.user = decode;
// next();
// } catch (error) {
// console.log(error);
// res.status(401).json({
// error: "Invalid token",
// });
// }
// };
const jwtAuthMiddleware = async (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    return res.status(401).send({
      success: false,
      message: "unAuthorized User",
      token,
    });
  }
  const decodeData = JWT.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodeData._id);
  next();
};
// function to generate JWT

module.exports = jwtAuthMiddleware;
