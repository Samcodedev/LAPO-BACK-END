const express = require('express')
const router = express.Router()
const { createScheme, updateScheme, deleteScheme, getAllSchemes } = require('../controller/schemeController')
const validateToken = require('../middleware/validateToken')
const { validateSchemaCreation, validateSchemaUpdate } = require('../inputValidation/schemaValidation')

// public route
router.use(validateToken)
router.post('/', validateSchemaCreation ,createScheme)
router.put('/:id', validateSchemaUpdate ,updateScheme)
router.delete('/:id', deleteScheme)
router.get('/', getAllSchemes)

module.exports = router