// Employee
//  - Emp id (primary key) genrated by MongoDB
//  - Emp name
//  - Emp email
//  - Emp phone number
//  - Emp joining date
//  - Dept id (foreign key)
//  - Designation id

const mongoose = require("mongoose");
const designation = require("./designationModel");
const department = require("./departmentModel");

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
    type: String,
    required: true,
  },

  profile: {
    type: String,
    required: true,
  },

  designation_id: {
    type: mongoose.Types.ObjectId,
    ref: "designation",
  },

  department_id: {
    type: mongoose.Types.ObjectId,
    ref: "department",
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
