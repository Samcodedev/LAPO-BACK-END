const express = require('express')
const router = express.Router()
const { registerUser, loginUser } = require('../controller/userController')
const { validateRegistration, validateLogin } = require('../inputValidation/userValidation');

// public route
router.post('/register', validateRegistration, registerUser)
router.post('/login', validateLogin, loginUser)


module.exports = router