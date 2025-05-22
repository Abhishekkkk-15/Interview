import express from "express"
import fs from 'fs'
import connectDB from "./db.js"
import axios from "axios"
import { object } from "webidl-conversions"
import { ExchangeRate, User } from "./schema.js"
import jwt from "jsonwebtoken"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { checkAuthenticaion } from "./authMiddleware.js"
const app = express()
dotenv.config()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({  extended: true }));
app.use(cookieParser())
app.get("/",(req,res)=>{
res.send("Hey there")
})
app.post("/signup",async(req,res)=>{
try {
        const {name, password} = req.body
        console.log(name,password)
        if(!name || !password){
            res.status(404).json({message:"Name or password not provided"})
        }
       const user = await User.create({userName: name, password:password})
        res.status(200).json({message:"SignUp successfully", data:user})
} catch (error) {
    console.log(error)
}
})

app.post("/login",async(req,res)=>{
        const {name, password} = req.body
        if(!name || !password){
            res.status(404).json({message:"Name or password not provided"})
        }
        const user = await User.findOne({userName:name})
        const sign = jwt.sign({ name }, process.env.JWT_SECRET);
        if(user && user.password == password){
            res.cookie("token",sign ).status(200).json({message:"User logedin",data:user})
        }
        res.status(404).json({message:"Invalid crediantials"})
})

app.post("/create_folder",(req,res)=>{
    fs.mkdir("./folders",(err)=>{
       if(err){
             console.log(err)
             res.send(err.message)
            }
    })
    res.send("Folder created")
})

app.get("/storeExgRate",checkAuthenticaion,async(req,res)=>{
   try {
     const {data} = await axios.get("https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_fgmDc2gHzfsgIER17o18b1Ogfrc8htRdTASjq9U9")
     let exgRate = data.data
     let user = req.user
     console.log(user)
     Object.entries(exgRate).map(async(e)=>{
        await ExchangeRate.create({country:e[0], rate:e[1],user:user.name})
     })
     res.send(data.data)
   } catch (error) {
    console.log("Error while storing rate",error.message)
   }
    
})

app.delete("/delete_folder",checkAuthenticaion,(req,res)=>{
    fs.rmdir("./folders",{recursive:true},(err)=>{
        if(err){
             console.log(err)
             res.send(err.message)
            }
    })
    res.send("Folder Deleted")
})
connectDB()
app.listen(4000,console.log("Server started"))