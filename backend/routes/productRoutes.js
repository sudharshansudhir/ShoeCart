const express=require('express')
const { getAllProducts, getOneProduct, addProduct, addToCart, removeFromCart, updateProduct, removeProduct } = require('../controllers/productController')
const { isUser } = require('../middleware/isUser')
const { isAdmin } = require('../middleware/isAdmin')
const router=express.Router()

router.get("/all",getAllProducts)
router.get("/:id",getOneProduct)

router.post("/add/cart/:id",isUser,addToCart)
router.post("/remove/cart/:id",isUser,removeFromCart)

router.post("/add",isAdmin,addProduct)
router.patch("/update/:id",isAdmin,updateProduct)
router.delete("/delete/:id",isAdmin,removeProduct)

module.exports=router 