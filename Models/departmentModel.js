// Department Schema
//  - Dept id
//  - Dept name
//  - Dept head
//  - Dept genre

const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  head: {
    type: String,
    required: true,
  },

  genre: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Department", departmentSchema);
