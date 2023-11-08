const User = require("../models/user");
const Expense = require("../models/expense");
const sequelize = require("../utils/database")



exports.postAddExpense = async (req,res) =>{
    const t = await sequelize.transaction();
    try{
        
       const {amount,descripiton,category} = req.body;
        // if(name == undefined || name.length == 0 || email == undefined || email.length == 0 || password == undefined || password.length == 0){
        //   return   res.status(400).json({err:"bad params"});
        // }
        
           const data =  await Expense.create({amount:amount,descripiton:descripiton,category:category,userId:req.user.id},{transaction:t});

           const totalExpense = Number(req.user.totalexpense) + Number(data.amount);
           
           const user = await User.update({totalexpense:totalExpense},{where:{id:req.user.id},transaction:t});
           await t.commit();
            res.status(201).json({newExpense:data});
      
        
            
       


    }catch(e){
        await t.rollback();
        res.status(500).json({error:e});
    }
}
exports.getExpense = async (req,res)=>{
    try{
        
        const ITEM_PER_PAGE = Number(req.query.limit);
        const page =Number(req.query.page);
       
        let totalItems = await Expense.count({where:{userId:req.user.id}});
        
      let data = await Expense.findAll({
        offset:(page-1)*ITEM_PER_PAGE,
        limit:ITEM_PER_PAGE,
        where:{userId:req.user.id}});

        

       //const data = await Expense.findAll();
       res.status(200).json({allExpense:data,
        pageData:{currentPage: page,
            hasNextPage: ITEM_PER_PAGE * page < totalItems,
            nextPage: page + 1,
            hasPreviousPage: page > 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalItems / ITEM_PER_PAGE),}
    })

    }catch(e){
        console.log(e)
        res.status(500).json({err:e});
    }
}

exports.deleteExpense = async (req,res)=>{
    const t = await sequelize.transaction();
    try{
   
     const id = req.params.id;
     let exp = await Expense.findByPk(id);
     
     const totalExpense = Number(req.user.totalexpense) - Number(exp.amount);
     
     await User.update(
       {
         totalexpense: totalExpense,
       },
       { where: { id: req.user.id }, transaction: t }
     );
    await exp.destroy({ where: { userId: req.user.id } });
     await t.commit();
     res.status(200).json({ success: true, message: "DELETED" });

    }catch(e){
        console.log(e)
        await t.rollback();
        res.status(500).json({err:e});
    }
}