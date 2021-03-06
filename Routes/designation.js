const express = require("express");
const routes = express.Router();
const designation = require("../Models/designationModel");

//Read
routes.get("/", async (req, res) => {
  //This will give the list of all the designations in the company.
  try {
    const designations = await designation.find();
    res.status(200).json(designations);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

//Create
routes.post("/", async (req, res) => {
  //This will create a new designation.
  const designationDetails = new designation(req.body);
  try {
    const des = await designationDetails.save();
    console.log("Data saved");
    res.status(201).json(des);
  } catch (err) {
    res.status(404).send("ERROR" + err.message);
  }
});

// ID field endpoints
routes.get("/:id", async (req, res) => {
  //This will find designation info by using its ID.
  try {
    const designations = await designation.findById(req.params.id);
    res.json(designations);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

//Update
routes.patch("/:id", async (req, res) => {
  //This will find designation by using its ID the update it.
  try {
    const _id = req.params.id;
    const designationUpdate = await designation.findByIdAndUpdate(
      _id,
      req.body,
      {
        new: true,
      }
    );
    res.json(designationUpdate);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

//Delete
routes.delete("/:id", async (req, res) => {
  //This will find designation using its ID the delete it.
  try {
    const _id = req.params.id;
    const desDelete = await designation.findByIdAndDelete(_id);
    if (!_id) {
      return res.status(400).send();
    }
    res.json(desDelete);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Module Export
module.exports = routes;
