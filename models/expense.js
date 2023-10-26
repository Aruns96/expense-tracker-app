const Sequelize = require("sequelize");


const sequelize = require("../utils/database");

const Expense = sequelize.define("expense", {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    amount:{
        type:Sequelize.STRING,
        allowNull:false
    },
    descripiton:{
        type:Sequelize.STRING,
        allowNull:false
        
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports = Expense;