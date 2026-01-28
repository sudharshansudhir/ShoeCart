const express=require('express')
const { getOneUser } = require('../controllers/userController')
const { isUser } = require('../middleware/isUser')
const router=express.Router()

router.get("/getuser/:id",isUser,getOneUser)

module.exports=router