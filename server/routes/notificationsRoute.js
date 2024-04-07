const router = require('express').Router() ;
const authMiddleWare = require('../middlewares/authMiddleware') ; 
const Notification = require('../models/notificationsModel') ;


router.post('/notify-user' ,authMiddleWare , async(req,res)=>{
    try {
        const newNotification = new Notification(req.body) ; 
        await newNotification.save() ;
        res.send({
            success : true , 
            message : "Notification Added SuccessFully" ,
        }) ;
    } catch (error) {
        res.send({
            success : false , 
            message : error.message  ,
        }) ;
    }
}) ;

router.get("/get-all-notifications" , authMiddleWare ,async(req,res)=>{
    try {
        const notifications = await Notification.find({
            user : req.body.userId
        }).sort({createdAt : -1}) ;
        res.send({
            success : true , 
            data : notifications ,
        }) ;
    } catch (error) {
        res.send({
            success : false ,
            message : error.message ,
        }) ;
    }
}) ;

router.delete("/delete-notification/:id" , authMiddleWare ,async(req,res)=>{
    try {
        await Notification.findByIdAndDelete(req.param.id) ;
        res.send({
            success : true , 
            message : "Notification Deleted SuccessFully" ,
        })
    } catch (error) {
        res.send({
            success : false , 
            message : error.message ,
        })
    }
}) ;

// read all notifications : 

router.post("/read-all-notifications" , authMiddleWare ,async(req,res)=>{
    try {
        await Notification.updateMany(
            {user : req.body.userId ,read : false},
            {$set : {read : true}}
        )
    } catch (error) {
        res.send({
            success : false ,
            message : error.message ,
        })
    }
})

module.exports = router ;