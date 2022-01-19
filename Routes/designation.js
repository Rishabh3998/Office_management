const express = require("express");
const routes = express.Router();
const designation = require("../Models/designationModel");

routes.get("/", async (req, res) => {
  try {
    const designations = await designation.find();
    res.json(designations);
  } catch (err) {
    res.send(err);
  }
});

routes.get("/:id", async (req, res) => {
  try {
    const designations = await designation.findById(req.params.id);
    res.json(designations);
  } catch (err) {
    res.send(err);
  }
});

routes.post("/", async (req, res) => {
  const designationDetails = new designation({
    name: req.body.name,
  });

  try {
    const e1 = await designationDetails.save();
    res.json(e1);
  } catch (err) {
    res.send("ERROR" + err);
  }
});

module.exports = routes;
