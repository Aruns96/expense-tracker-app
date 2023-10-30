const express = require("express");
const sequelize = require("./utils/database");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user");
const expenseRoute = require("./routes/expense");
const purchaseRoute = require("./routes/purchase");
const premiumRoute = require("./routes/premium");
const passwordRoute = require("./routes/password");
const User = require("./models/user");
const Expense = require("./models/expense");
const Order = require("./models/order");
const Forgotpassword = require("./models/forgotpassword")



const app = express();
app.use(bodyParser.json({extended:false}));
app.use(cors());
app.use("/user",userRoute);
app.use("/expense",expenseRoute);
app.use("/purchase",purchaseRoute);
app.use("/premium",premiumRoute);
app.use("/password",passwordRoute);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);




sequelize.sync().then((result)=>{
    app.listen(3000);
}).catch(e=>console.log(e));
