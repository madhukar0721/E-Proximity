import registermodel from "../models/registermodel.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const loginuser=async(req,res)=>{
    const {username,password}=req.body;
    const user=await registermodel.findOne({username:username});
    if (user){
        bcrypt.compare(password, user.password, (err, result)=>{
            if(err){
                console.log(err);
            }
            if(result){
                const token=Jwt.sign({username:username},'asdfgfkjhgfsadfdhgfdgdsadfg',{expiresIn: '1y'})
                res.status(200).json({msg: "Login successful", token: token});
            }
            else{
                res.status(401).json({msg: "Invalid credentials"});
            }
        });
    }
    try{
    await registermodel.find({}).then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        console.log(err);
    })
    }   
    catch(err){
        console.log(err);
    }
}
export default loginuser