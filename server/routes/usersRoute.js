const router = require('express').Router() ; 
const User = require('../models/userModel');
const bcrypt = require("bcryptjs") ;
const jwt = require('jsonwebtoken') ;
const authMiddleware = require('../middlewares/authMiddleware');
//New User Registeration : 

router.post('/register' , async(req , res)=>{
    try {
        const user = await User.findOne({email : req.body.email});
        if(user){
           throw new Error("User Already Exists");
        }

        //hash password 

        const salt = await bcrypt.genSalt(10) ; 
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

//User Login

router.post('/login' , async(req , res)=>{
    try {
        //check if user exist : 
        const user = await User.findOne({email : req.body.email})
        if(!user){
            throw new Error("User Not found") ;
        }

        if(user.status!=='active'){
            throw new Error("User account is Blocked") ;
        }

        //compare password : 

        const validPassword = await bcrypt.compare(
            req.body.password , 
            user.password
        );
        if(!validPassword){
            throw new Error("Invalid Password") ;
        }

        //Create and assign Token 

        const token = jwt.sign({userId : user._id} , process.env.jwt_secret , {expiresIn : "1d"});
        res.send({
            success : true , 
            message : "User Logged in SuccessFully" ,
            data : token
        });
        
    } catch (error) {
        res.send({
            success : false , 
            message : error.message
        })
        
    }
})

router.get("/get-current-user" ,authMiddleware , async(req,res)=>{
    try {
        const user = await User.findById(req.body.userId) ; 
        res.send({
            success : true , 
            message : "User Fetched SuccessFully" , 
            data : user ,

        });
        
    } catch (error) {
        res.send({
            success : false , 
            message : error.message  , 
        });
    }
});


//get all users 

router.get('/get-users' , authMiddleware ,async(req,res)=>{
    try {
        const users = await User.find();
        res.send({
            success : true , 
            message : "Users Fetched SuccessFully" , 
            data :users ,
        });
    } catch (error) {
        res.send({
            success : false , 
            message : error.message ,
        });
    }
});


//update users status

router.put("/update-user-status/:id" , authMiddleware , async(req,res)=>{
    try {
        await User.findByIdAndUpdate(req.params.id , req.body);
        res.send({
            success : true , 
            message : "User Status updated successfully" ,
        });
    } catch (error) {
        res.send({
            success : false ,
            message : error.message ,
        });
    }
});




module.exports = router ;