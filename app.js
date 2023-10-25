const express = require("express");
const sequelize = require("./utils/database");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user")


const app = express();
app.use(bodyParser.json({extended:false}));
app.use(cors());
app.use("/user",userRoute);


sequelize.sync().then((result)=>{
    app.listen(3000);
}).catch(e=>console.log(e));
