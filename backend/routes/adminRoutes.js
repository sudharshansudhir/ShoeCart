const express=require('express')
const { getAllUser, deleteUser } = require('../controllers/adminController')
const { isAdmin } = require('../middleware/isAdmin')
const router=express.Router()

router.get("/getusers",isAdmin,getAllUser)
router.delete("/delete/:id",isAdmin,deleteUser)

module.exports=router