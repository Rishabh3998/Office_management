const express = require("express");
const routes = express.Router();
const employee = require("../Models/employeeModel");

routes.get("/", async (req, res) => {
  try {
    const employees = await employee.find();
    res.json(employees);
  } catch (err) {
    res.send(err);
  }
});

routes.get("/:id", async (req, res) => {
  try {
    const employees = await employee.findById(req.params.id);
    res.json(employees);
  } catch (err) {
    res.send(err);
  }
});

routes.post("/", async (req, res) => {
  const employeeDetails = new employee({
    name: req.body.name,
    email: req.body.email,
    contact_number: req.body.contact_number,
  });

  try {
    const e1 = await employeeDetails.save();
    res.json(e1);
  } catch (err) {
    res.send("ERROR" + err);
  }
});

module.exports = routes;
