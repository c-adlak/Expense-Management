const express = require("express");
const route = express.Router();
const userController = require("../controller/userController");

route.post("/saveuser", userController.saveUser);
route.post("/userlogin", userController.userLogin);

module.exports = route;
