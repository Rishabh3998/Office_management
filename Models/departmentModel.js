// Department
//  - Dept id (primary key) generated
//  - Dept name
//  - Dept head
//  - Dept type/genre (tech, business, product, HR)

const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: {
    //residential pod
    //employee experience
    type: String,
    required: true,
  },

  head: {
    type: String,
    required: true,
  },

  genre: {
    //technology
    //HR
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Department", departmentSchema);
