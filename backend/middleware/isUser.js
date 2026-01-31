const jwt=require('jsonwebtoken')

exports.isUser=async(req,res,next)=>{
    try{
        const token=req.headers.authorization
        if(!token){
            return res.status(400).send({message:"Please login to continue"})
        }
        // const value=token.split(" ")[1]
        // console.log(token)
        if(!token){
            return res.status(400).send({message:"Login first"})
        }
        req.logId=jwt.verify(token,process.env.SECRET_KEY)
        if(req.logId){            
            // console.log("Yes,Logged in")
            next()
        }else{
            console.log("Invalid token")
        }
        // next()
    }
    catch(e){
        console.log("isUser error ->",e)
    }
}