const User = require("../models/user");


exports.postSignup = async (req,res) =>{
    try{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        if(name == undefined || name.length == 0 || email == undefined || email.length == 0 || password == undefined || password.length == 0){
          return   res.status(400).json({err:"bad params"});
        }
        
        const data = await User.create({name:name,email:email,password:password});
        res.status(201).json({message:"user created"});


    }catch(e){
        res.status(500).json({error:e});
    }
}

exports.postLogin = async (req,res) =>{
    try{
       
        const email = req.body.email;
        const password = req.body.password;
        if( email == undefined || email.length == 0 || password == undefined || password.length == 0){
          return   res.status(400).json({err:"bad params"});
        }
        
        const data = await User.findAll({where:{email:email,password:password}})
        res.status(201).json({message:"user login succesfully"});


    }catch(e){
        res.status(500).json({error:e});
    }
}