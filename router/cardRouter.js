const express = require('express')
const router = express.Router()
const { validateCardCreation, validateCardUpdate } = require('../inputValidation/cardValidation')
const { createCard, updateCard, deleteCard, getAllCards } = require('../controller/cardController')
const validateToken = require('../middleware/validateToken')

// public route
router.use(validateToken)
router.post('/', validateCardCreation, createCard)
router.put('/:id', validateCardUpdate, updateCard)
router.delete('/:id', deleteCard)
router.get('/', getAllCards)

module.exports = router