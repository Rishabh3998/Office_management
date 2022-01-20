// Designation Schema
//  - Designation id
//  - Designation name
//  - Department id

const mongoose = require("mongoose");
const Department = require("./departmentModel");

const designationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  department_id: {
    type: mongoose.Types.ObjectId,
    ref: "Department",
    required: true,
  },
});

module.exports = mongoose.model("Designation", designationSchema);
