const { body, validationResult } = require('express-validator');

const validateSchemaCreation = [
    body('schemeName')
        .notEmpty().withMessage('Schema Name is required')
        .isString().withMessage('Schema Name must be a string')
        .trim(),

    body('panLength')
        .notEmpty().withMessage('Pen Length Name is required')
        .isNumeric().withMessage('Pen Length must be in Number')
        .isLength({max: 30})
        .withMessage('Max Pen Length is 30'),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Validation failed',
                    errors: errors.array()
                });
            }
            next();
        }
]


const validateSchemaUpdate = [
    body('schemeName')
        .optional()
        .notEmpty().withMessage('Schema Name is required')
        .isString().withMessage('Schema Name must be a string')
        .trim(),

    body('panLength')
        .optional()
        .notEmpty().withMessage('Pen Length Name is required')
        .isNumeric().withMessage('Pen Length must be in Number')
        .isLength({max: 30})
        .withMessage('Max Pen Length is 30'),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Validation failed',
                    errors: errors.array()
                });
            }
            next();
        }
]

module.exports = { validateSchemaCreation, validateSchemaUpdate }