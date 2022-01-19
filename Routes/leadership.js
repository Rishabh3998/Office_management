const express = require("express");
const routes = express.Router();
const leadership = require("../Models/leadershipModel");

routes.get("/", async (req, res) => {
  try {
    const leaderships = await leadership.find();
    res.json(leaderships);
  } catch (err) {
    res.send(err);
  }
});

routes.get("/:id", async (req, res) => {
  try {
    const leaderships = await leadership.findById(req.params.id);
    res.json(leaderships);
  } catch (err) {
    res.send(err);
  }
});

routes.post("/", async (req, res) => {
  const leadershipDetails = new employee({
    // name: req.body.name,
    // email: req.body.email,
    // contact_number: req.body.contact_number,
  });

  try {
    const e1 = await leadershipDetails.save();
    res.json(e1);
  } catch (err) {
    res.send("ERROR" + err);
  }
});

module.exports = routes;
