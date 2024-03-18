const mongoose = require('mongoose') ;
require('dotenv').config() ; 

mongoose.connect(process.env.mongo_url)

const connection = mongoose.connection;

connection.on('connected' , ()=>{
    console.log('Mongo DB connected');
})


connection.on('error' , (err)=>{
    console.log('MongoDB connection failed');
})

module.exports=connection;

