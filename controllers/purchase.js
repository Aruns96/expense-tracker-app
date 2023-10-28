
const Order = require("../models/order");
const Razorpay = require("razorpay");
const userController = require("../controllers/user")
require("dotenv").config()


exports.purchasePremium = async (req,res) =>{
    try{
       var rzp = new Razorpay({
        key_id:process.env.RAZORPAY_KEYID,
        key_secret:process.env.RAZORPAY_KEYSECRET
       });
      
       const amount = 2500;

    

       rzp.orders.create({amount,currency:'INR'},(err,order)=>{
        if(err){
            throw new Error('Something Went Wrong')
        }
        req.user.createOrder({orderid:order.id,status:"PENDING"}).then(()=>{
            return res.status(201).json({order,key_id:rzp.key_id})
        }).catch(err=>{
            throw new Error(err)
        })
    })


      

    }catch(e){
        
        console.log(e)
        res.status(500).json({message:"something went wrong",error:e});
       
    }
}

exports.updateTranscation = async (req,res) =>{
    try{
       const {payment_id,order_id} = req.body;
       console.log("pay",payment_id,"order",order_id)
       const order =await Order.findOne({where:{orderid:order_id}});
      
        const promise1 = order.update({paymentid:payment_id,status:"SUCESSFUL"})
        const promise2 =   req.user.update({ispremiumuser:true});
        Promise.all([promise1,promise2]).then(()=>{
            return res.status(202).json({message:"transcation success",token:userController.generateAcessToken(req.user.id,true)})
        }).catch(e=>{
            throw  new Error(e);
        })
                
               
    }catch(e){
        res.status(500).json({message:"something went wrong",error:e});
    }
}