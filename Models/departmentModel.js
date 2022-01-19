// Department
//  - Dept id (primary key)
//  - Dept name
//  - Dept head
//  - Dept type (tech, business, product, HR)

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
    unique: true,
  },
});

module.exports = mongoose.model("Department", departmentSchema);
