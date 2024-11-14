//controllers
const urlModel = require("../models/user");
const shortID = require("shortid")
async function handleGenerateNewShortURL (req,res){
    const shortid = shortID()
    const urlBody = req.body.url
    if(!urlBody){return res.status(400).json({msg:"No url found"})}

   await urlModel.create({
        shortId : shortid,
        redirectURL : urlBody,
        visitHistory :[],
    })
    return res.render("url-shortner",{
        id:shortid,
        url:urlBody
    })

}

async function handleTotalClicks(req,res){
    const shortId = req.params.shortid
    const result = await urlModel.findOne({shortId})

    return res.json({totalClick:result.visitHistory.length
    })
}

module.exports = {handleGenerateNewShortURL,
    handleTotalClicks,
}