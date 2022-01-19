const express = require("express");
const { reset } = require("nodemon");
const { find } = require("../Models/employeeModel");
const routes = express.Router();
const employee = require("../Models/employeeModel");

//Read
routes.get("/", async (req, res) => {
  try {
    const employees = await employee.find();
    res.json(employees);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

routes.get("/:id", async (req, res) => {
  try {
    const employees = await employee.findById(req.params.id);
    if (!employees) {
      res.status(404).json();
    } else {
      res.json(employees);
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
});

//search by name
routes.get("/byName/:key", async (req, res) => {
  try {
    const key = req.params.key;
    const emp = await employee.find({ name: key });
    res.json(emp);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

//Search by name using regex
routes.get("/byName/:key", async (req, res) => {
  let regex = RegExp(req.params.key, "i");
  try {
    const emp = await employee.find({ name: regex });
    res.json(emp);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

//Create
routes.post("/", async (req, res) => {
  const employeeDetails = new employee(req.body);
  try {
    const emp = await employeeDetails.save();
    console.log("Data saved");
    res.status(201).json(emp);
  } catch (err) {
    res.status(404).send("ERROR" + err.message);
  }
});

//Update
routes.patch("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const employeeUpdate = await employee.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.json(employeeUpdate);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

//Delete
routes.delete("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const empDelete = await employee.findOneAndDelete(_id);
    if (!_id) {
      return res.status(400).send();
    }
    res.json(empDelete);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//query
// routes.get("/search/:name", async (req, res) => {
//
//   try {
//     const result = await employee.find({ name: regex });
//     console.leg(result);
//     res.json(result);
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// });

routes.get("/search/:key", async (req, res) => {
  try {
    const key = req.params.key;
    const data = await employee.find({
      $or: [
        { name: { $regex: key } },
        { designation: { $regex: key } },
        { department: { $regex: key } },
      ],
    });
    res.json(data);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

//Module export
module.exports = routes;
