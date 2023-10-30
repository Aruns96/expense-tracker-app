const express = require("express");
const passwordController = require("../controllers/password");
const authorization = require("../middleware/auth");

const routes = express.Router();



routes.post("/forgotpassword",passwordController.postForgotPassword);







module.exports = routes;