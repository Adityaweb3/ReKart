const express = require('express') ;
const app = express() ; 
const dbConfig = require('./config/dbConfig');
require('dotenv').config() ; 
const port = process.env.PORT || 5000 ;
app.listen(port , ()=> console.log(`Node.js Server started on port ${port}`));
