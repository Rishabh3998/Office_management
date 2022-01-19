// Designation
//  - Designation id
//  - Designation name

const mongoose = require("mongoose");

const designationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Designation", designationSchema);
