const express = require('express')
const router = express.Router()
const { createScheme, updateScheme, deleteScheme, getAllSchemes } = require('../controller/schemeController')
const validateToken = require('../middleware/validateToken')

// public route
router.use(validateToken)
router.post('/', createScheme)
router.put('/:id', updateScheme)
router.delete('/:id', deleteScheme)
router.get('/', getAllSchemes)

module.exports = router