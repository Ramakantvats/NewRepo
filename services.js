const jwt = require("jsonwebtoken")
const secreteKey = "w4efrarfxp"

function setPayload(user){
    return jwt.sign({
        _id : user._id,
        email:user.Email,
        role:user.Role
    },secreteKey)
}

function getUser(token){
    const payload = jwt.verify(token,secreteKey)
    return payload
}

module.exports ={
    setPayload,
    getUser
}