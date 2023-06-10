const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const signupGet = (req,res) => {
    res.render('signup')
}

const signupPost = (req,res) => {
    const username = req.body.username
    const userpassword = req.body.userpassword

    const user = new User ({
        name : username ,
        password : userpassword
    })
    user.save()
    .then(u=>{
        res.redirect('/login')
    })
    .catch(err=>{console.log(err)})

    
}

const loginGet = (req,res) => {
    res.render('login')
}


const createToken = async (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET , {expiresIn:'1d'}) //* id ye göre 1 günlük token oluşturma
}

const logOut = async (req, res) => {
    await res.clearCookie('jsonwebtoken');
    await res.redirect('/login'); // veya başka bir sayfaya yönlendirme yapabilirsiniz
}

const loginPost = async (req,res) => {
    const username = req.body.username
    const userpassword = req.body.userpassword

    const user = await User.findOne({ name: username }) //* tek bir eleman döndürür
    
    const isPasswordMatch  = await bcrypt.compare(userpassword, user.password)
    if (username && isPasswordMatch) {
        console.log("giriş başarılı")
    }
    else{
        console.log("giriş bilgileri hatalı")
    }

    
    const token = await createToken(user._id)
    console.log(token)
    res.cookie('jsonwebtoken', token, {httpOnly : true, maxAge : 1000*60*60*24}) //* cookie ismi, oluşturulan token, özellikler
    res.redirect('/admin')

}










module.exports = {
    signupGet, signupPost, loginGet, loginPost, logOut
}