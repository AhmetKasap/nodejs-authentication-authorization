const express = require('express')
const router = express.Router()
const admin = require('../controllers/Admin')
const middlewares  = require('../middlewares/Auth')


router.get('/admin', middlewares.authenticationToken, admin.getAdmin)

module.exports = router

