import registermodel from '../models/registermodel.js';
import bcrypt from 'bcrypt';
const register = async (req, res) => {
    try{
        const {username, email, password} = req.body;
        const existingUser = await registermodel.findOne({username:username});
        if(existingUser){
            return res.status(409).json({msg: "Username already exists"});
        }
        bcrypt.hash(password, 10, (err, hash) => {
            if(err){
                console.log(err);
            }
            else{
               
                const user = new registermodel({username:username, email:email, password:hash});
                user.save();
                res.status(201).json({msg: "User registered successfully"});
            }
        });
    
      
    }
    catch(err){
        console.log(err);
    }
}

export default register;