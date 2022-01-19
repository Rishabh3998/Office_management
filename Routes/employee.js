const express = require("express");
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

routes.get("/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const emp = employee.find(name);
    console.log(name);
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

//Module export
module.exports = routes;
