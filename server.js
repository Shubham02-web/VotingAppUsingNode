const express = require("express");
const app = express();
require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(` server connected Successfully on port no ${PORT}`);
});
