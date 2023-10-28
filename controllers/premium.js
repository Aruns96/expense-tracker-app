const User = require("../models/user");
const Expense = require("../models/expense");
const sequelize = require("../utils/database");


const getUserLeaderBoard = async(req,res)=>{
    try{
       const userLeadBoardDetails = await User.findAll({
        attributes:['id','name',[sequelize.fn('sum',sequelize.col('expenses.amount')),'totol_cost']],
        include:[{
            model:Expense,
            attributes:[]
        }],
        group:['user.id'],
        order:[['totol_cost','DESC']]
       });
    //    const expenses = await Expense.findAll();
    //    const userAggExp = {};
    //    expenses.forEach(expense=>{
    //     if(userAggExp[expense.userId]){
    //         userAggExp[expense.userId] = Number(userAggExp[expense.userId]) + Number(expense.amount) ;
    //     }else{
    //         userAggExp[expense.userId] = expense.amount;
    //     }
    //    })

    //    var userLeadBoardDetails = [];

    //    users.forEach(user=>{
    //     userLeadBoardDetails.push({name:user.name,totol_cost:userAggExp[user.id]||0})
    //    });
    //    userLeadBoardDetails.sort((a,b)=>b.totol_cost-a.totol_cost);
       //console.log(userLeadBoardDetails)
       res.status(200).json(userLeadBoardDetails)
 
     }catch(e){
         
         console.log(e)
         res.status(500).json({message:"something went wrong",error:e});
        
     }
}



module.exports = {getUserLeaderBoard}