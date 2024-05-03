const mongoose = require("mongoose");
const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required field"],
  },
  party: {
    type: String,
    required: [true, "party is required"],
  },
  age: {
    type: Number,
    required: [true, "age is required"],
  },
  votes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "user id is required"],
      },
      votedAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  voteCount: {
    type: Number,
    default: 0,
  },
});

const Candidate = mongoose.model("Candidate", candidateSchema);
module.exports = Candidate;
