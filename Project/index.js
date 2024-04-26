const express = require('express');
const cors = require('cors');
const { connectDB } = require('./.config/db');
const { userModel } = require('./models/data');
const app = express();
require("dotenv").config();
app.use(json())

app.get('/', (req, res)=>{
    res.send("Welcome to Express App")
})

app.post('/signup', async (req, res)=>{
    let {name, email} = req.body
    try {
        const userData = await userModel.create({name, email})  
        await userData.save() 
        console.log("Data sent")
        res.status(200).send("User Data created succesfully")
    } catch (error) {
        console.log(error)
    }
})

app.post('/login', async (req, res)=>{
    let email = req.body;
    console.log(email)
    try {
        let userExist = await userModel.find(email) 
        if(userExist.length) {
            res.status(200).send({"message":"Logged in Successfully",
        "user": userExist})
        }
        else {
            res.status(403).send({"message": "User not Found"})
        }
    } catch (error) {
        console.log(error)
    }
})

app.patch('/update/:id', async (req, res)=>{
    const data = req.body
    const id = req.params.id
    try{
        const user = await userModel.findByIdAndUpdate(id, data)
        res.status(200).send("User data updated successfully")
    } catch(err){
        res.send(err.message)
    }
})

app.delete('/update/:id', async (req, res)=>{
    const id = req.params.id
    try{
        const user = await userModel.findByIdAndDelete(id, data)
        res.status(200).send("User data deleted successfully")
    } catch(err){
        res.send(err.message)
    }
})

app.listen(process.env.PORT, async(req, res)=>{
    try {
        await connectDB
        console.log("Connected with DB")
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is running on port ${process.env.PORT}`)
}) 

