const router = require("express").Router() ;
const Product = require("../models/productModel");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer") ;
const cloudinary  = require("../config/cloudinaryConfig");


//add new product  : 

router.post("/add-product" , authMiddleware , async(req,res)=>{
    try {
        const newProduct = new Product(req.body) ;
        await newProduct.save() ;
        res.send({
            success : true , 
            message : "Product Added SuccessFully" ,
        });

        
    } catch (error) {
        res.send(
            {
                success : false , 
                message : error.message,
            })   ;
        
    }
});


//get all products : 

router.get("/get-products" , async(req,res)=>{
    try {
        const products=await Product.find().sort({createdAt :-1}) ;
        res.send({
            success : true , 
            products ,
        })
        
    } catch (error) {
        res.send({
            success : false , 
            message : error.message ,
        });
        
    }
});

//edit a product 

router.put("/edit-product/:id" , authMiddleware , async(req,res)=>{
    try {
        await Product.findByIdAndUpdate(req.params.id , req.body);
        res.send({
            success : true , 
            message : "Product Updated SucessFully" ,

        });
        
    } catch (error) {
        res.send({
            success : false ,
            message : error.message ,
        });
        
    }
});


//delete a product 

router.delete("/delete-product/:id" , authMiddleware , async(req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id) ;
        res.send({
            success : true , 
            message : "product deleted successfully" ,
        });
        
    } catch (error) {
        res.send({
            success : false , 
            message : error.message ,
        });
        
    }
});

//handling image upload to cloudinary 

//getting image form pc
const storage = multer.diskStorage({
    filename:function(req,file , callback){
        callback(null , Date.now()+file.originalname);
    },
});

router.post('/upload-image-to-product' , authMiddleware,multer({storage:storage}).single('file'), async(req,res)=>{
    try {

        //upload image to cloudinary
        const result =await cloudinary.uploader.upload(req.file.path , {
            folder : "rekart",
        }) ;

        const productId=req.body.productId ;
        await Product.findByIdAndUpdate(productId ,{
            $push : {images : result.secure_url},
        });
        res.send({
            success:true , 
            message : "Image Uploaded SuccessFully" , 
            data : result.secure_url,
        });
    } catch (error) {
        res.send({
            success : false , 
            message : error.message ,
        });
    }
})

module.exports=router ;

