const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:"String",
        required:true
    },
    email:{
        type:"String",
        required:true,
        unique:true
    },
    password:{
        type:"String",
        required:true
    },
    phone:{
        type:"String",
        unique:true
    },
    cart:[{
        productId:{
            type:mongoose.Schema.Types.ObjectId
        },
        quantity:{
            type:Number
        }
    }],
    orders:[{
        paymentId:{
            type:"String"
        },
        product:{
            type:mongoose.Schema.Types.ObjectId
        },
        quantity:{
            type:Number
        },
        amount:{
            type:Number
        }
    }],
    address:{
        type:"String"
    }
})

module.exports=mongoose.model("User",userSchema)