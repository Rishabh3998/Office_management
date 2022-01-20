// Employee
//  - Emp id
//  - Emp name
//  - Emp email
//  - Emp phone number
//  - Emp joining date
//  - Dept id
//  - Designation id

const mongoose = require("mongoose");
const Designation = require("./designationModel");
const Department = require("./departmentModel");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  contact_number: {
    type: Number,
    unique: true,
    required: true,
  },

  joining_date: {
    type: Date,
    required: true,
  },

  profile: {
    type: String,
    required: true,
  },

  designation_id: {
    type: mongoose.Types.ObjectId,
    ref: "Designation",
    required: true,
  },

  department_id: {
    type: mongoose.Types.ObjectId,
    ref: "Department",
    required: true,
  },

  managerId: {
    type: mongoose.Types.ObjectId,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
