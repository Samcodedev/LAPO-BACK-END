const express = require('express')
const router = express.Router()
const { createCard, updateCard, deleteCard, getAllCards } = require('../controller/cardController')
const validateToken = require('../middleware/validateToken')

// public route
router.use(validateToken)
router.post('/', createCard)
router.put('/:id', updateCard)
router.delete('/:id', deleteCard)
router.get('/', getAllCards)

module.exports = router