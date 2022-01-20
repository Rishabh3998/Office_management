const express = require("express");
const routes = express.Router();
const leadership = require("../Models/leadershipModel");

//Read
routes.get("/", async (req, res) => {
  //This will find all the leaderships in the company.
  try {
    const leaderships = await leadership.find().exec();
    res.json(leaderships);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

//Create
routes.post("/", async (req, res) => {
  //This will create a new leadership.
  const leadershipDetails = new leadership(req.body);
  try {
    const lead = await leadershipDetails.save();
    res.status(201).json(lead);
  } catch (err) {
    res.status(500).send("ERROR" + err.message);
  }
});

//ID field endpoints
routes.get("/:id", async (req, res) => {
  //This will find a leadership by using its ID.
  try {
    const leaderships = await leadership.findById(req.params.id).exec();
    res.json(leaderships);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

//Update
routes.patch("/:id", async (req, res) => {
  //This will find a leadership using its ID the it will update it.
  try {
    const _id = req.params.id;
    const leadershipUpdate = await leadership.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.json(leadershipUpdate);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Delete
routes.delete("/:id", async (req, res) => {
  //This will find a leadership using its ID the it will delete it.
  try {
    const _id = req.params.id;
    const leadershipDelete = await leadership.findByIdAndDelete(_id);
    if (!_id) {
      return res.status(400).send();
    }
    res.json(leadershipDelete);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//This will find all employees under a manager
routes.get("/manager/:managerId", async (req, res) => {
  try {
    const _id = req.params.managerId;
    const empLeader = await leadership
      .find({
        managerId: _id,
      })
      .populate([
        {
          path: "empId",
          model: "Employee",
        },
      ])
      .exec();
    res.status(200).json(empLeader);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Module export
module.exports = routes;
