const mongoose = require("mongoose");

const leadershipSchema = new mongoose.Schema({
  //   name: {
  //     type: String,
  //     required: true,
  //   },
  //   head: {
  //     type: String,
  //     required: true,
  //   },
  //   genre: {
  //     type: [String],
  //     required: true,
  //     unique: true,
  //   },
});

module.exports = mongoose.model("Leadership", leadershipSchema);
