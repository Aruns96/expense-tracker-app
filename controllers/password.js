const User = require("../models/user");
const Expense = require("../models/expense");
const sequelize = require("../utils/database");
const Sib = require("sib-api-v3-sdk");
const brevo = require('@getbrevo/brevo');
require("dotenv").config()


const postForgotPassword = async(req,res)=>{
    try{
      const email = req.body.email;
      if(email == undefined || email.length == 0 ){
        return   res.status(400).json({err:"bad params"});
      }
      
    //   const client=Sib.ApiClient.instance;
    //   const apiKey=client.authentications['api-key']
    //   apiKey.apiKey=process.env.FGT_KEY
    //   const apiInstance=new Sib.TransactionalEmailsApi()
    //  const result = await apiInstance.sendTransacEmail({  
    //       to:[{email:email}],
    //       sender:{email:"arun509577@gmail.com"},
    //       subject:"sib",
    //       textContent:"Hello",
         
    //   })

    
    let defaultClient = brevo.ApiClient.instance;
    
    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.FGT_KEY2;
    
   
    
    let apiInstance = new brevo.TransactionalEmailsApi();
    let sendSmtpEmail = new brevo.SendSmtpEmail();
    
    sendSmtpEmail.subject = "My {{params.subject}}";
    sendSmtpEmail.htmlContent = "<html><body><h1>Common: This is my first transactional email {{params.parameter}}</h1></body></html>";
    sendSmtpEmail.sender = { "name": "John", "email": "arun509577@gmail.com" };
    sendSmtpEmail.to = [
      { "email": "radhamanyk46@gmail.com", "name": "sample-name" }
    ];
    
    
    
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail)
      


     
      console.log(result)


    





     }catch(e){
         
         console.log(e)
         res.status(500).json({message:"something went wrong",error:e});
        
     }
}



module.exports = {postForgotPassword}