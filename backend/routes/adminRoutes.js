const express=require('express')
const { getAllUser } = require('../controllers/adminController')
const { isAdmin } = require('../middleware/isAdmin')
const router=express.Router()

router.get("/getusers",isAdmin,getAllUser)

module.exports=router