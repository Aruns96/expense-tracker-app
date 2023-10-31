const User = require("../models/user");
const Downloadfiles = require("../models/downloadfiles");
const Expense = require("../models/expense");
const sequelize = require("../utils/database");
const S3services = require("../services/S3services")
const AWS = require("aws-sdk");
require("dotenv").config();


const getUserLeaderBoard = async(req,res)=>{
    try{
    /*   const userLeadBoardDetails = await User.findAll({
        attributes:['id','name',[sequelize.fn('sum',sequelize.col('expenses.amount')),'totol_cost']],
        include:[{
            model:Expense,
            attributes:[]
        }],
        group:['user.id'],
        order:[['totol_cost','DESC']]
       });   */
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
       const userLeadBoardDetails = await User.findAll({
        attributes:['id','name','totalexpense'],
        
        order:[['totalexpense','DESC']]
       });
       res.status(200).json(userLeadBoardDetails)
 
     }catch(e){
         
         console.log(e)
         res.status(500).json({message:"something went wrong",error:e});
        
     }
}


const getDownload = async(req,res)=>{
    try{
        if(!req.user.ispremiumuser){
            return res.status(401).json({ success: false, message: 'User is not a premium User'})
        }
        const expenses = await req.user.getExpenses()
        
        const stringfyExpense = JSON.stringify(expenses);
        const userId = req.user.id;

        const fileName = `expense${userId}/${new Date()}.txt`

        const fileURL = await S3services.uploadToS3(fileName,stringfyExpense);

        await Downloadfiles.create({filename:fileName,userId:userId});
        let files = await Downloadfiles.findAll({attributes:["filename"],where:{userId:userId}})

        res.status(200).json({fileURL,message:"sucesss",files});

      
 
     }catch(e){
         
         console.log(e)
         res.status(500).json({message:"something went wrong",error:e});
        
     }
}


module.exports = {getUserLeaderBoard,getDownload}