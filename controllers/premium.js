const User = require("../models/user");
const Expense = require("../models/expense");


const getUserLeaderBoard = async(req,res)=>{
    try{
       const users = await User.findAll();
       const expenses = await Expense.findAll();
       const userAggExp = {};
       expenses.forEach(expense=>{
        if(userAggExp[expense.userId]){
            userAggExp[expense.userId] = Number(userAggExp[expense.userId]) + Number(expense.amount) ;
        }else{
            userAggExp[expense.userId] = expense.amount;
        }
       })

       var userLeadBoardDetails = [];

       users.forEach(user=>{
        userLeadBoardDetails.push({name:user.name,totol_cost:userAggExp[user.id]||0})
       });
       userLeadBoardDetails.sort((a,b)=>b.totol_cost-a.totol_cost);
       //console.log(userLeadBoardDetails)
       res.status(200).json(userLeadBoardDetails)
 
     }catch(e){
         
         console.log(e)
         res.status(500).json({message:"something went wrong",error:e});
        
     }
}



module.exports = {getUserLeaderBoard}