const Expense = require("../models/expense");



exports.postAddExpense = async (req,res) =>{
    try{
       const {amount,descripiton,category} = req.body;
        // if(name == undefined || name.length == 0 || email == undefined || email.length == 0 || password == undefined || password.length == 0){
        //   return   res.status(400).json({err:"bad params"});
        // }
        
           const data =  await Expense.create({amount:amount,descripiton:descripiton,category:category});
            res.status(201).json({newExpense:data});
      
        
       


    }catch(e){
        res.status(500).json({error:e});
    }
}
exports.getExpense = async (req,res)=>{
    try{
       const data = await Expense.findAll();
       res.status(200).json({allExpense:data})

    }catch(e){
        res.status(500).json({err:e});
    }
}

exports.deleteExpense = async (req,res)=>{
    try{
       if(!req.params.id == "undefined"){
        return res.status(400).json({err:"id not found"});
       }
       const expenseId = req.params.id;

       await Expense.destroy({where:{id:expenseId}});
       res.sendStatus(200);

    }catch(e){
        res.status(500).json({err:e});
    }
}