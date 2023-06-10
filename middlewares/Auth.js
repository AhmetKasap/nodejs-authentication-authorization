const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/User')


const authenticationToken = async (req,res,next) => {
    const token = req.cookies.jsonwebtoken   //* oluşturduğumuz token ı cookies den aldık

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err) => {
            if(err) {
                res.redirect('/login')
            }
            else{
                next()
            }
        })
    }
    else {
        res.redirect('/login')
    }

}

const checkUser = async (req,res,next) => {
    const token = req.cookies.jsonwebtoken

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err,decodedToken) => {
            if (err) {
                
                res.locals.user = null
                next()
            }
            else {
                const user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
            
        })
    }
    else {
        res.locals.user = null
        next()
    }

    

}





module.exports = {
    authenticationToken,checkUser
}