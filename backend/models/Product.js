const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
    productName:{
        type:"String"
    },
    price:{
        type:"String"
    },
    color:{
        type:"String"
    },
    brand:{
        type:"String"
    },
    material:{
        type:"String"
    },
    inStock:{
        type:Number,
        default:1
    },
    image:{
        type:"String"
    },
    ratings:{
        type:Number,
        default:0
    },
    modelNo:{
        type:"String"
    },
    size:{
        type:Number
    },
    shoeType:{
        type:"String"
    },
    availability:{
        type:Boolean,
        default:true
    },
})

module.exports=mongoose.model("Product",productSchema)