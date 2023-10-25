const express = require("express");
const userController = require("../controllers/user")

const routes = express.Router();

routes.post("/sign-up",userController.postSignup)

module.exports = routes;



