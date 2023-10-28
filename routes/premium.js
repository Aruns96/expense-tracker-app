const express = require("express");
const premiumController = require("../controllers/premium");
const authorization = require("../middleware/auth");

const routes = express.Router();



routes.get("/showleaderboard",authorization.authorize,premiumController.getUserLeaderBoard);







module.exports = routes;