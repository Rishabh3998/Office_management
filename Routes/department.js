const express = require("express");
const routes = express.Router();
const department = require("../Models/departmentModel");

routes.get("/", async (req, res) => {
  try {
    const departments = await department.find();
    res.json(departments);
  } catch (err) {
    res.send(err);
  }
});

routes.get("/:id", async (req, res) => {
  try {
    const departments = await department.findById(req.params.id);
    res.json(departments);
  } catch (err) {
    res.send(err);
  }
});

routes.post("/", async (req, res) => {
  const departmentDetails = new department({
    name: req.body.name,
    head: req.body.head,
    genre: req.body.genre,
  });

  try {
    const e1 = await departmentDetails.save();
    res.json(e1);
  } catch (err) {
    res.send("ERROR" + err.message);
  }
});

module.exports = routes;
