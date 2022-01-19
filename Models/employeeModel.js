// Employee
//  - Emp id (primary key)
//  - Emp name (first name, last name)
//  - Emp email (office , personal)
//  - Emp phone number
//  - Emp joining date
//  - Dept id (foreign key)
//  - Designation id
//  - Leader/Mentor/Manager id (foreign key)

const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email is already present"],
  },
  contact_number: {
    type: Number,
    unique: true,
    required: true,
  },
  joining_date: {
    type: Date,
  },
  department_id: String,
  designation_id: String,
});

module.exports = mongoose.model("Employee", employeeSchema);
