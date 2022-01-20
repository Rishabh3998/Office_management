// Leadership Schema
//  - Emp id
//  - Manager id

const mongoose = require("mongoose");

const leadershipSchema = new mongoose.Schema({
  empId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },

  managerId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Leadership", leadershipSchema);
