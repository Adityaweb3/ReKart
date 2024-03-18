const express = require('express') ;
const app = express() ; 
app.use(express.json()) ;
const dbConfig = require('./config/dbConfig');
require('dotenv').config() ; 
const port = process.env.PORT || 5000 ;


const usersRoute =require('./routes/usersRoute');
app.use('/api/users' , usersRoute) ;
app.listen(port , ()=> console.log(`Node.js Server started on port ${port}`));
