const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const sequelize = require("./utils/database");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user");
const expenseRoute = require("./routes/expense");
const purchaseRoute = require("./routes/purchase");
const premiumRoute = require("./routes/premium");
const passwordRoute = require("./routes/password");
const User = require("./models/user");
const Expense = require("./models/expense");
const Order = require("./models/order");
const Forgotpassword = require("./models/forgotpassword");
const Downloadfiles = require("./models/downloadfiles");



const app = express();
app.use(bodyParser.json({extended:false}));
app.use(cors());

const log = fs.createWriteStream(path.join(__dirname,"access.log"),{flags:'a'});
app.use(helmet());
app.use(morgan('combined',{stream:log}));


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

User.hasMany(Downloadfiles);
Downloadfiles.belongsTo(User);


sequelize.sync().then((result)=>{
    app.listen(3000);
}).catch(e=>console.log(e));
