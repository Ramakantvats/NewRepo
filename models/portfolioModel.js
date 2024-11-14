const mongoose = require("mongoose")

const portfolioSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true
    },
    Message:{
        type:String,
        required:true
    }
},{timestamps:true})

const PortfolioModel = mongoose.model("portfolio",portfolioSchema)
module.exports = PortfolioModel