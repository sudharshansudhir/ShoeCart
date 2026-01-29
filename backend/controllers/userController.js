const User=require('../models/User')

exports.getOneUser=async(req,res)=>{
    try{
        console.log(req.params.id)
        const id=req.params.id
        const user=await User.findById(id)
        if(!user){
            return res.status(400).send({message:"User does not exist"})
        }
        return res.status(200).send({message:"User fetched successfully",user})
        
    }
    catch(e){
        console.log("getOneUse error ->",e)
    }
}

exports.updateUser=async(req,res)=>{
    try{
        const id=req.logId.id
        const updatedUser=await User.findByIdAndUpdate(id,{$set:req.body.payload},{new:true})
        if(updatedUser){
            return res.status(200).send({message:"User updated successfully"})
        }
        return res.status(400).send({message:"Failed to update the user"})
    }
    catch(e){
        console.log("updateUser error ->",e)
    }
}