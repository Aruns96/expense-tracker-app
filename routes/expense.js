const express = require("express");
const expenseController = require("../controllers/expense")

const routes = express.Router();



routes.get("/get-expense",expenseController.getExpense);

routes.post("/addExpense",expenseController.postAddExpense);

routes.delete("/delete-expense/:id",expenseController.deleteExpense);



module.exports = routes;