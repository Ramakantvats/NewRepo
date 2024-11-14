const RegisterModel = require("../models/registerModel")
const PortfolioModel = require("../models/portfolioModel")
const {setPayload} = require("../services")


async function handleUserLogin(req,res){
        const body = req.body
        const Email = body.email
        const Password = body.password

        const user = await RegisterModel.findOne({Email,Password})

        if(!user){return res.render("index",{
            msg:"Your email or password is wrong!"
        })}
       const token= setPayload(user)
        res.cookie("uid",token)
        return res.redirect("/")
}

async function handleUserRegister(req,res){
    const body = req.body
    await RegisterModel.create({
        Username:body.username,
        Email:body.email,
        Password:body.password,
        Role:body.role
    })
    return res.redirect("/")
}
async function handleUserPortfolioMessages(req,res) {
    const body = req.body
    await PortfolioModel.create({
        Name:body.name,
        Email:body.email,
        Message:body.message
    })
    return res.redirect("/")
}


module.exports = {handleUserLogin,handleUserRegister,handleUserPortfolioMessages}