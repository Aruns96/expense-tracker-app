const express = require("express");
const sequelize = require("./utils/database");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user");
const expenseRoute = require("./routes/expense")


const app = express();
app.use(bodyParser.json({extended:false}));
app.use(cors());
app.use("/user",userRoute);
app.use("/expense",expenseRoute);


sequelize.sync({force:true}).then((result)=>{
    app.listen(3000);
}).catch(e=>console.log(e));
