// Designation
//  - Designation id
//  - Designation name  (Software engineer)
//  - Department id (technology)

const mongoose = require("mongoose");
const department = require("./departmentModel");

const designationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  department_id: {
    type: mongoose.Types.ObjectId,
    ref: "department",
    required: true,
  },
});

module.exports = mongoose.model("Designation", designationSchema);
