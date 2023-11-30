const dotenv = require("dotenv");
dotenv.config({ path: './config.env' });

const jwt = require('jsonwebtoken');
const db = require('../DB/conn');



const checkRole =(req,res,next)=>
{
    
}

module.exports = checkRole;