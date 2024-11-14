const express = require("express")
const mongoose = require("mongoose")
const {handleUserRegister, handleUserLogin,handleUserPortfolioMessages} = require("./routes/user")
//  files imported for url-shortner 
const Router = require("./URL-Shortner/routes/user")
const urlModel = require("./URL-Shortner/models/user")
const Cookieparser = require("cookie-parser")
const {authentication,authorization} = require("./middleware/user")



const app = express()
const path = require("path")
app.use(express.urlencoded({extended:false}))
app.set("view engine","ejs")
app.set("views",path.resolve("./views"))
app.use(express.static(path.resolve("./views")))
app.use(Cookieparser()) 


// Note- Both ways to server static folder
// app.use(express.static(path.join(__dirname, 'PersonalPortfolio')));
app.use(express.static(path.resolve("./PersonalPortfolio")))
// serving static files of amazon clone
app.use(express.static(path.resolve("./Amazon-clone")))
// serving static files of currency converter
app.use(express.static(path.join(__dirname,"CurrencyConverter")))


// login-register page route will show if user did not login
app.get("/login-signup-page",(req,res)=>{
    app.set("views",path.resolve("./views"))
    return res.render("index")
})
// portfolio route(will show portfolio website if user login successfully)
app.get("/",authentication,(req,res)=>{
    
    // Note- Both ways to tell about views folder for rendering templates
    // app.set('views', path.join(__dirname, 'PersonalPortfolio'));
    app.set("views",path.resolve("./PersonalPortfolio"))
    console.log("Enter in /")
    res.render("index2")
})


app.post("/signin",handleUserLogin)
app.post("/register",handleUserRegister)
app.post("/portfolio-message",handleUserPortfolioMessages)

// for amazon clone website
app.get("/Amazon-clone",(req,res)=>{
    return res.sendFile(path.join(__dirname,"Amazon-clone","index3.html"))
})

// for currency-converter website
app.get("/currency-converter",(req,res)=>{
    return res.sendFile(path.join(__dirname,"CurrencyConverter","index4.html"))
})

// Routes for URL-Shortner
app.get("/url-shortner",authentication,authorization(["ADMIN"]),(req,res)=>{
    app.set("views",path.resolve("./views"))
    return res.render("url-shortner")
})

app.use("/url",Router)


// Creating route to redirect on the original url
app.get("/:shortid" , async(req,res)=>{ //Note-> we are using app.get instead of app.use because app.use doesn't pass the query parameters to further routes
    const shortId = req.params.shortid
    console.log(shortId) // ADiKjkUOC
    const entry = await urlModel.findOneAndUpdate(
        {shortId},

        {$push:{ //$push: This is a MongoDB update operator. It is used to add (or "push") a new item to an existing array field in a document. If the array field doesn't exist, MongoDB will create it.
            visitHistory:{
                timestamp:Date.now()
            },
    },
}
)
try{
    console.log(entry.redirectURL)
    res.redirect(entry.redirectURL)
}catch(error){
    return res.json({msg:"Your shortid is wrong! Plz fill right shortID"})
}
})


app.listen(8000,()=>{
    console.log("server started at port  ", 8000)
})

mongoose.connect("mongodb://127.0.0.1:27017/LOGIN-DATABASE").then(()=>{
    console.log("server started")
}).catch((error)=>{
    console.log(error)
})

module.exports = app