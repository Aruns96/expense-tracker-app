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
        
        const user = await User.findAll({where:{email}});
        console.log(user[0].password)
        if(user.length > 0){
          
            
            if(user[0].password === password){
                return res.status(201).json({message:"user login succesfully"});
            }else{
                return res.status(401).json({message:"password incorrect"})
            }
           
           
        }else{
            return res.status(404).json({message:"user not found"})
        }
       
       


    }catch(e){
        res.status(500).json({error:e});
    }
}