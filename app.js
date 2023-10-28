const express = require("express");
const sequelize = require("./utils/database");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user");
const expenseRoute = require("./routes/expense");
const purchaseRoute = require("./routes/purchase");
const premiumRoute = require("./routes/premium");
const User = require("./models/user");
const Expense = require("./models/expense");
const Order = require("./models/order")


const app = express();
app.use(bodyParser.json({extended:false}));
app.use(cors());
app.use("/user",userRoute);
app.use("/expense",expenseRoute);
app.use("/purchase",purchaseRoute);
app.use("/premium",premiumRoute);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);


sequelize.sync().then((result)=>{
    app.listen(3000);
}).catch(e=>console.log(e));
