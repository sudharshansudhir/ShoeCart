const Product=require('../models/Product')
const User=require('../models/User')
const bcrypt=require("bcryptjs")
const jwt=require('jsonwebtoken')

exports.register=async(req,res)=>{
    try{
        console.log(req.body)
        const {name,email,phone,password,address}=req.body;
        const isEmailExist=await User.findOne({email})
        if(isEmailExist){
            return res.status(400).send({message:"User already exist"})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const user=await User.create({
            name,email,address,password:hashedPassword,phone
        })
        await user.save()
        const token=jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:"1d"})
        return res.status(200).send({message:"User created successfully",token})
    }
    catch(e){
        console.log("register error ->",e)
    }
}

exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        console.log(email,process.env.ADMIN_ID)
        if(email!=process.env.ADMIN_ID){
        const isUserExist=await User.findOne({email})
        if(!isUserExist){
            return res.status(400).send({message:"User does not exist"})
        }
        const decryptedPassword=await bcrypt.compare(password,isUserExist.password)
        if(!decryptedPassword){
            return res.status(400).send({message:"Invalid password"})
        }
        const token=jwt.sign({id:isUserExist._id},process.env.SECRET_KEY,{expiresIn:"1d"})
        return res.status(200).send({message:"Login Successful",token})
    }
    else{
        if(email==process.env.ADMIN_ID && password==process.env.ADMIN_PASSWORD){
            const token=jwt.sign({id:process.env.ADMIN_ID},process.env.ADMIN_SECRET_KEY,{expiresIn:"1d"})
            return res.status(200).send({message:"Admin Login Successful",token,isAdmin:true})
        }
        else{
            return res.status(400).send({message:"Invalid admin password"})
        }
    }
}
    catch(e){
        console.log("login error ->",e)
    }
}