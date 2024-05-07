const express = require("express");
const {
  createCandidate,
  updateCandidate,
  getAllCandidate,
  getSingleCandidate,
  voting,
  TotalVote,
} = require("../controller/candidateController.js");
const { isAuth, isAdmin } = require("../jwt.js");
const route = express.Router();

route.post("/createCandidate", isAuth, isAdmin, createCandidate);
route.get("/getAllCandidate", getAllCandidate);
route.get("/totalVote", isAuth, isAdmin, TotalVote);
route.get("/getSingleCandidate/:id", isAuth, getSingleCandidate);
route.put("/updateCandidate/:id", isAuth, isAdmin, updateCandidate);
route.put("/voting/:id", isAuth, isAdmin, voting);
module.exports = route;
