const express = require("express");
const mongoose = require("mongoose");
const { env } = require("process");

const app = express();
const url = "mongodb://localhost:27017/office";
const port = process.env.PORT || 3000;

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected with Database");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(express.json());

//Employee
const employeeRouter = require("./Routes/employee");
app.use("/employee", employeeRouter);

//Department
const departmentRouter = require("./Routes/department");
app.use("/department", departmentRouter);

//Designation
const designationRouter = require("./Routes/designation");
app.use("/designation", designationRouter);

//Leadership
const leadershipRouter = require("./Routes/leadership");
app.use("/leadership", leadershipRouter);

app.listen(port, () => {
  console.log(`App is listening to port: ${port}`);
});
