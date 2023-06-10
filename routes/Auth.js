const express = require('express')
const router = express.Router()
const controllersAdmin = require('../controllers/Auth')

router.get('/', controllersAdmin.signupGet)
router.post('/signup', controllersAdmin.signupPost)

router.get('/login', controllersAdmin.loginGet)
router.post('/login', controllersAdmin.loginPost)

router.get('/logout', controllersAdmin.logOut)




module.exports = router