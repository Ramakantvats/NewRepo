//middleware to check authenctication
const {getUser} = require("../services")

async function authentication(req,res,next){
    const token = req.cookies.uid
    if(!token){
        return res.redirect("/login-signup-page")
    }
    const userPayload = getUser(token)
    if(!userPayload){
        return res.redirect("/login-signup-page")
    }
    req.user = userPayload
    next()
}

// Authorization
function authorization(roles=[]){
    return function(req,res,next){
        if(!roles.includes(req.user.role)){
            return res.json("Unauthorized person 🤦‍♀️🤦‍♂️")
        }

        next()
    }
}
module.exports = {authentication,authorization
}
