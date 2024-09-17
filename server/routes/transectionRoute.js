const express = require("express");
const route = express.Router();
const transectionController = require("../controller/transectionController");

route.post("/saveEarning", transectionController.saveData);
route.post("/yourEarning", transectionController.yourEarning);
route.post("/saveExpense", transectionController.saveExpense);
route.post("/yourExpenses", transectionController.yourExpenses);
route.post("/report", transectionController.report);

module.exports = route;
