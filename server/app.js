const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const transectionRoute = require("./routes/transectionRoute");
//require("dotenv").config();
//const port = process.env.PORT || 8080;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/expenseManagementDatabase")
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("error while connicting to db" + err);
  });

app.use("/user", userRoute);
app.use("/transection", transectionRoute);

app.listen(3000, () => {
  console.log("working");
});
