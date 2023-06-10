require('dotenv').config()
const express = require('express')
const app = express()

var cookieParser = require('cookie-parser')
app.use(cookieParser())


app.set('view engine', 'ejs')

//* body parser
const bodyParser = require('body-parser');     
app.use(bodyParser.urlencoded({extended:false}));  


//* routes import
const auth = require('./routes/Auth')
const admin = require('./routes/Admin')
const middlewares = require('./middlewares/Auth')

app.use("*", middlewares.checkUser)
app.use(auth)
app.use(admin)


//* database connection
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_DB_URL)
.then(m => {console.log("Database Connected")})
.catch(e => {console.log("Database error")})




app.listen(3000)