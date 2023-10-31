const Sequelize = require("sequelize");


const sequelize = require("../utils/database");

const Downloadfiles = sequelize.define("downloadfile", {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    filename:{
        type:Sequelize.STRING,
        
    },
    
})

module.exports = Downloadfiles;