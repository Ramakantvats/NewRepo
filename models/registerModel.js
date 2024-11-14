const mongoose = require("mongoose")

const registerSchema = new mongoose.Schema({
    Username:{
        type:String,
        required:true

    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true,
    },
    Role:{
        type:String,
        required:true
    }
},{timestamps:true})

const registerModel = mongoose.model("register",registerSchema)

module.exports=registerModel