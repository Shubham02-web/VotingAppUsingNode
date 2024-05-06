const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const userRoute = require("./Routes/UserRoute.js");
mongoose.connect(process.env.mongo_uri).then(() => {
  console.log("mongo db connected");
});
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.json());
app.use("/user", userRoute);
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(` server connected Successfully on port no ${PORT}`);
});
