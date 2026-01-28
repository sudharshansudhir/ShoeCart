const Product=require('../models/Product')
const User = require('../models/User')

exports.getAllProducts=async(req,res)=>{
    try{
        const allProducts=await Product.find()
        if(!allProducts){
            return res.status(400).send({message:"No Products Found"})
        }
        return res.status(400).send({message:"All products fetched successfully",allProducts})
    }
    catch(e){
        console.log("getAllProducts error ->",e)
    }
}

exports.getOneProduct=async(req,res)=>{
    try{
        const {id}=req.params.id
        const oneProduct=await Product.findOne({id})
        if(!oneProduct){
            return res.status(400).send({message:"Product not found"})
        }
        return res.status(200).send({message:"Product fetched successfully",oneProduct})
    }
    catch(e){
        console.log("getOneProduct error ->",e)
    }
}

exports.addProduct=async(req,res)=>{
    try{
        const {productName,price,color,brand,material,inStock,image,ratings,modelNo,size,shoeType,availability}=req.body;
        const isAvail=await Product.findOne({productName})
        if(isAvail){
            return res.status(400).send({message:"Product already exists"})
        }
        const addProduct=await Product.create({productName,price,color,brand,material,inStock,image,ratings,modelNo,size,shoeType,availability})
        await addProduct.save()
        if(addProduct){
            return res.status(200).send({message:"Product added successfully",addProduct})  
        }
        return res.status(400).send({message:"Error in adding the product"})
    }

    catch(e){
        console.log("addProduct error ->",e)
    }
}

exports.addToCart=async(req,res)=>{
    try{
        const id=req.params.id
        // console.log(id)
        const getProduct=await Product.findById(id)
        const userId=req.logId.id
        // console.log(userId)
        const getUser=await User.findById(userId)
        if(!getProduct || !getUser){
            return res.status(400).send({message:"User/Product data is not found in the DB"})
        }
        console.log(getUser)
        const isAvailInCart=getUser.cart.find(item=>item.productId==id)
        console.log(isAvailInCart)
        if(isAvailInCart){
            isAvailInCart.quantity+=1
        }
        else{
        getUser.cart.push({productId:id,quantity:1})
        }
        await getUser.save()
        console.log(getUser)
        return res.status(200).send({message:"Item added to the cart successfully"})
    }
    catch(e){
        console.log("addToCart error ->",e)
    }

}
exports.removeFromCart=async(req,res)=>{
    try{
        const id=req.params.id
        // console.log(id)
        const getProduct=await Product.findById(id)
        const userId=req.logId.id
        // console.log(userId)
        const getUser=await User.findById(userId)
        if(!getProduct || !getUser){
            return res.status(400).send({message:"User/Product data is not found in the DB"})
        }
        // console.log(getUser)
        const isAvailInCart=getUser.cart.find(item=>item.productId==id)
        console.log(isAvailInCart)
        if(isAvailInCart){
            isAvailInCart.quantity-=1
        }
        if(isAvailInCart.quantity==0){
            getUser.cart=getUser.cart.filter(item=>item.quantity>0)
        }
        await getUser.save()
        console.log(getUser)
        return res.status(200).send({message:"Item removed from the cart successfully"})
    }
    catch(e){
        console.log("removeFromCart error ->",e)
    }

}