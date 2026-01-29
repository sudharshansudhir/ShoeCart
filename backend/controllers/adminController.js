const Product=require('../models/Product')
const User=require('../models/User')

exports.getAllUser=async(req,res)=>{
    try{
        const allUser=await User.find()
        if(!allUser){
            return res.status(400).send({message:"No user exist"})
        }
        return res.status(200).send({message:"All Users fetched successfully",allUser})
    }
    catch(e){
        console.log("getAllUsers error ->",e)
    }
}

exports.deleteUser=async(req,res)=>{
    try{
        const id=req.params.id
        const deletedUser=await User.findByIdAndDelete(id)
        if(deletedUser){
            return res.status(200).send({message:"User deleted successfully"})
        }
        return res.status(400).send({message:"Failed to delete the user"})
    }
    catch(e)
    {
        console.log("deleteUser error ->",e)
    }
}
