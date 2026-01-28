const express=require('express')
const mongoose  = require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
const authRoutes=require('./routes/authRoutes')
const adminRoutes=require('./routes/adminRoutes')
const userRoutes=require('./routes/userRoutes')
const productRoutes=require('./routes/productRoutes')

const app=express()
app.use(express.json())
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected successfully"))
.catch((e)=>console.log("Error in DB connection->",e))

app.use("/auth",authRoutes)
app.use("/user",userRoutes)
app.use("/admin",adminRoutes)
app.use("/products",productRoutes)

app.get("/",async(req,res)=>{
    res.status(200).send("Hello from ShoeCart-VI server")
})

app.listen(3000,async(req,res)=>{
    console.log("Server running at port 3000")
})