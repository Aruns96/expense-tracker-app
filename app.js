const express = require("express");
const sequelize = require("./utils/database");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user");
const expenseRoute = require("./routes/expense");
const User = require("./models/user");
const Expense = require("./models/expense");


const app = express();
app.use(bodyParser.json({extended:false}));
app.use(cors());
app.use("/user",userRoute);
app.use("/expense",expenseRoute);

User.hasMany(Expense);
Expense.belongsTo(User);


sequelize.sync().then((result)=>{
    app.listen(3000);
}).catch(e=>console.log(e));
