const router = require('express').Router() ; 
const User = require('../models/userModel');
const bcrypt = require("bcryptjs") ;


//New User Registeration : 

router.post('/register' , async(req , res)=>{
    try {
        const user = await user.findOne({email : req.body.email});
        if(user){
           throw new Error("User Already Exists");
        }

        //hash password 

        const salt = await bcrypt.getSalt(10) ; 
        const hashedPassword = await bcrypt.hash(req.body.password , salt);
        req.body.password= hashedPassword ;
        const newUser =new User(req.body) ; 
        await newUser.save() ;
        res.send({
            success : true , 
            message : "User Created SuccessFully" ,
        });

        
    } catch (error) {

        res.send({
            success : false , 
            message : error.message 

        })
        
    }
})