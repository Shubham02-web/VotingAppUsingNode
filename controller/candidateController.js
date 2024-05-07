const candidate = require("../models/candidate.js");
const User = require("../models/user.js");

const createCandidate = async (req, res, next) => {
  try {
    const { name, party, age } = req.body;
    if (!name || !party || !age)
      return res.status(400).send({
        success: false,
        message: "Please Provide name party and age of candidate",
      });

    const cand = await candidate.create({
      name,
      party,
      age,
    });
    res.status(201).json({
      success: true,
      message: "Candidate Created Succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in Create Candidate API",
    });
  }
};

const getAllCandidate = async (req, res, next) => {
  try {
    const cand = await candidate.find({}).sort({ age: 1 });
    if (!cand) return res.send("candidates not found ");
    console.log(cand);
    res.status(200).send({
      success: true,
      message: "all candidate are listed below",
      cand,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getAll Candidate API",
    });
  }
};
const updateCandidate = async (req, res, next) => {
  try {
    const id = req.parms.id;
    if (!id) return res.send("please enter candidate id");
    const cand = await candidate.findById(id);
    if (!cand) return res.send("candidate not found or invalid id");
    if (req.body.name) cand.name = req.body.name;
    if (req.body.age) cand.age = req.body.age;
    if (req.body.party) cand.party = req.body.party;

    await cand.save();
    res.status(201).json({
      success: true,
      cand,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in update Candidate API",
    });
  }
};
const getSingleCandidate = async (req, res, next) => {
  try {
    const cand = await candidate.findById(req.params.id);
    if (!cand) return res.send("candidate not found");
    console.log(cand);
    res.status(200).send({
      success: true,
      message: "all candidate are listed below",
      cand,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get Sigle Candidate API",
    });
  }
};

const voting = async (req, res, next) => {
  try {
    const voter = req.user.user._id;
    if (!voter) return res.status(400).send("please Enter Voter ID");
    const cand = await candidate.findById(req.params.id);
    if (!cand) return res.status(404).send("Candidate not found");

    const voterUser = await User.findById(voter);
    if (voterUser.isVoted)
      return res.status(500).send("user has alaready done their voting");

    if (voterUser.role === "admin")
      return res.status(500).send("you cant vote you are Admin");
    cand.votes.push({ user: voter });
    cand.voteCount++;
    await cand.save();

    voterUser.isVoted = true;
    await voterUser.save();

    res.status(200).send("your vote has successfully recorded");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error  in Voting API");
  }
};
const TotalVote = async (req, res, next) => {
  try {
    const cand = await candidate.find({}).sort({ voteCount: "desc" });
    res.status(200).json({
      success: true,
      cand,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in TotalVote API",
    });
  }
};
module.exports = {
  createCandidate,
  updateCandidate,
  getAllCandidate,
  getSingleCandidate,
  voting,
  TotalVote,
};
