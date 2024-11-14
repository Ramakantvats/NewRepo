const mongoose = require("mongoose")

const Schema = mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectURL:{
        type:String,
        required:true
    },
    visitHistory:[{timestamp:{type:Number}}]
},{timestamps:true})

const urlModel = mongoose.model("url" , Schema)

module.exports = urlModel