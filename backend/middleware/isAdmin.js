const jwt=require('jsonwebtoken')

exports.isAdmin=async(req,res,next)=>{
    try{
        const token=req.headers.authorization
        const isAdmin=req.headers.isadmin.split(" ")[1]
        if(!token || !isAdmin ){
            return res.status(400).send({message:"Please login as Admin to continue"})
        }
        const value=token.split(" ")[1]
        if(!value){
            return res.status(400).send({message:"Login as Admin first"})
        }
        const verified=jwt.verify(value,process.env.ADMIN_SECRET_KEY)
        if(verified){            
            next()
        }else{
            console.log("Invalid token")
        }
        // next()
    }
    catch(e){
        console.log("isAdmin error ->",e)
    }
}