import registermodel from "../models/registermodel.js";
const getuser=async(req,res)=>{
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
export default getuser