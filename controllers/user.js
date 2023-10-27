const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.postSignup = async (req,res) =>{
    try{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        if(name == undefined || name.length == 0 || email == undefined || email.length == 0 || password == undefined || password.length == 0){
          return   res.status(400).json({err:"bad params"});
        }
        bcrypt.hash(password,10, async(err,hash)=>{
            if(err){
                throw new Error("something went wrong");
            }
            await User.create({name:name,email:email,password:hash});
            res.status(201).json({message:"user created"});
        })
        
       


    }catch(e){
        res.status(500).json({error:e});
    }
}
function generateAcessToken(id){
    return jwt.sign({userId:id},"secretKey");
}
exports.postLogin = async (req,res) =>{
    try{
       
        const email = req.body.email;
        const password = req.body.password;
        if( email == undefined || email.length == 0 || password == undefined || password.length == 0){
          return   res.status(400).json({err:"bad params"});
        }
        
        const user = await User.findAll({where:{email}});
        
        if(user.length > 0){
          bcrypt.compare(password,user[0].password,(err,result)=>{
            if(err){
                throw new Error("something went wrong")
            }
            if(result === true){
                return res.status(201).json({message:"user login succesfully",token:generateAcessToken(user[0].id)});
               
            }else{
                return res.status(401).json({message:"password incorrect"})
            }
          })
            
            
           
           
        }else{
            return res.status(404).json({message:"user not found"})
        }
       
       


    }catch(e){
        res.status(500).json({error:e});
    }
}