const express=require('express')
const { getOneUser, updateUser } = require('../controllers/userController')
const { isUser } = require('../middleware/isUser')
const router=express.Router()

router.get("/getuser",isUser,getOneUser)
router.patch("/update/:id",isUser,updateUser)

module.exports=router