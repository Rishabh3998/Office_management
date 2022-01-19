const express = require("express");
const routes = express.Router();
const department = require("../Models/departmentModel");

//Read
routes.get("/", async (req, res) => {
  try {
    const departments = await department.find();
    res.json(departments);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

routes.get("/:id", async (req, res) => {
  try {
    const departments = await department.findById(req.params.id);
    res.json(departments);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

//Create
routes.post("/", async (req, res) => {
  const departmentDetails = new department(req.body);
  try {
    const dep = await departmentDetails.save();
    console.log("Data saved");
    res.status(201).json(dep);
  } catch (err) {
    res.status(404).send("ERROR " + err.message);
  }
});

//Update
routes.patch("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const departmentUpdate = await department.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.json(departmentUpdate);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

//Delete
routes.delete("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const depDelete = await department.findOneAndDelete(_id);
    if (!_id) {
      return res.status(400).send();
    }
    res.json(depDelete);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Module export
module.exports = routes;
