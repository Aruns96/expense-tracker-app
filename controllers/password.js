const User = require("../models/user");
const Forgotpassword = require("../models/forgotpassword");
const sequelize = require("../utils/database");
const uuid = require("uuid");
const brevo = require('@getbrevo/brevo');
const bcrypt=require('bcrypt')
//require("dotenv").config()


const postForgotPassword = async(req,res)=>{
    try{
      const email = req.body.email;
      if(email == undefined || email.length == 0 ){
        return   res.status(400).json({err:"bad params"});
      }
      const user=await User.findOne({where:{email}})
      if(user){

        const id=uuid.v4()
            user.createForgotpassword({id,isactive:true})
            .catch(err=>{
                throw new Error(err)
            })



        let defaultClient = brevo.ApiClient.instance;
    
        let apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = process.env.FGT_KEY2;
        
       
        
        let apiInstance = new brevo.TransactionalEmailsApi();
        let sendSmtpEmail = new brevo.SendSmtpEmail();
        
        sendSmtpEmail.subject = "send from brevo";
        sendSmtpEmail.htmlContent = `<a href="http://localhost:3000/password/resetpassword/${id}">reset password</a>`;
        
        sendSmtpEmail.sender = { "name": "Arun", "email": "thatarunsdev@gmail.com" };
        sendSmtpEmail.to = [
          { "email": "arun509577@gmail.com", "name": "sample-name" }
        ];
        
        
        
        const result = await apiInstance.sendTransacEmail(sendSmtpEmail)
          
    
    
         
          console.log(result)
    
          res.status(200).json({message:"mail sent"});
        

      }else{
        throw new Error("user not exitst")
      }
    

     }catch(e){
         
         console.log(e)
         res.status(500).json({message:"something went wrong",error:e});
        
     }
}
const getResetPassword = async(req,res)=>{
    try{
        const id=req.params.id
        const forgotpasswordrequest = await Forgotpassword.findOne({where:{id}}).then(forgotpasswordrequest=>{
            if(forgotpasswordrequest){
                forgotpasswordrequest.update({isactive:false})
                res.status(200).send(`<html>
                <script>
                    function formsubmitted(e){
                        e.preventDefault();
                        console.log('called')
                    }
                </script>
                <form action="http://localhost:3000/password/updatepassword/${id}" method="GET">
                    <label for="newpassword">Enter New password</label>
                    <input name="newpassword" type="password" required></input>
                    <button>reset password</button>
                </form>
            </html>`)
            res.end()
            }
        })
    





     }catch(e){
         
         console.log(e)
         res.status(500).json({message:"something went wrong",error:e});
        
     }
}
const getUpdatePassword = async(req,res)=>{
    try{
      
        const {newpassword}=req.query
        console.log('req.quere>>>>>>>>>>>>>>',req.query)
        const {resetpasswordid}=req.params
        Forgotpassword.findOne({where:{id:resetpasswordid}})
        .then(resetpasswordrequest=>{
            User.findOne({where:{id:resetpasswordrequest.userId}})
            .then(user=>{
                if(user){
                    const saltRounds=10
                    bcrypt.genSalt(saltRounds,function(err,hash){
                        if(err){
                            console.log(err)
                            throw new Error(err)
                        }
                        bcrypt.hash(newpassword,saltRounds,function(err,hash){
                            if(err){
                                console.log(err)
                                throw new Error(err)
                            }
                            user.update({password:hash})
                            .then(()=>{
                                console.log('updated')
                            res.status(201).json({message:'Successfuly update the new  password'})
                        })
                        })
                    })
                }else{
                    return res.status(404).json({error:'No user Exist',success:false})
                }
            })
        })





     }catch(e){
         
         console.log(e)
         res.status(500).json({message:"something went wrong",error:e});
        
     }
}


module.exports = {postForgotPassword,getResetPassword,getUpdatePassword}