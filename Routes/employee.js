const express = require("express");
const { reset } = require("nodemon");
const { find } = require("../Models/employeeModel");
const routes = express.Router();
const employee = require("../Models/employeeModel");

//Read
routes.get("/", async (req, res) => {
  //This will give all the employees details in the company.
  try {
    const employees = await employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

//Create
routes.post("/", async (req, res) => {
  //This will create a new employee in the database.
  const employeeDetails = new employee(req.body);
  try {
    const emp = await employeeDetails.save();
    console.log("Data saved");
    res.status(201).json(emp);
  } catch (err) {
    res.status(404).send("ERROR " + err.message);
  }
});

//search by name
routes.get("/byName/:key", async (req, res) => {
  //This will search the employee by his/her name.
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
  //This will search the employee by his/her name with regex.
  let regex = RegExp(req.params.key, "i");
  try {
    const emp = await employee.find({ name: regex });
    res.json(emp);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

//List of Employee designation wise
routes.get("/query", async (req, res) => {
  //This will give the details of the employees according to their designation.
  try {
    const query = req.query;
    console.log(query);
    const regex = RegExp(query.profile, "i");
    const data = await employee.find({
      profile: regex,
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

//Statistic API
routes.get("/statistic/totalEmp", async (req, res) => {
  //This will give the count of total employees.
  try {
    const total = await employee.find({}).countDocuments();
    res.json(total);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

//List of Employee department wise(ID)
routes.get("/statistic/byDepartment/:id", async (req, res) => {
  try {
    const query = req.params.id;
    const data = await employee
      .find({
        department_id: query,
      })
      .countDocuments();
    res.json(data);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

routes.get("/statistic/totalEmp/:profile", async (req, res) => {
  //This will give the total employees according to their desigantion.
  try {
    const role = req.params.profile;
    const regex = RegExp(role, "i");
    const total = await employee.find({ profile: regex }).countDocuments();
    console.log(total);
    res.sendStatus(200).send(total);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

//ID Endpoints
//Read
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

//List of Employee department wise(ID)
routes.get("/byDepartment/:id", async (req, res) => {
  try {
    const query = req.params.id;
    const data = await employee
      .find({
        department_id: query,
      })
      .exec();
    res.json(data);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

//List of Employee designation wise(ID)
routes.get("/byDesignation/:id", async (req, res) => {
  try {
    const query = req.params.id;
    const data = await employee
      .find({
        designation_id: query,
      })
      .exec();
    res.json(data);
  } catch (err) {
    res.status(404).send(err.message);
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
    const empDelete = await employee.findByIdAndDelete(_id);
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
