const { body, validationResult } = require('express-validator');

const validateCardCreation = [
    
    body('cardName')
        .notEmpty().withMessage('Card Name is required')
        .isString().withMessage('Card Name must be a string')
        .trim(),

    body('cardScheme')
        .notEmpty().withMessage('Card Scheme is required')
        .isString().withMessage('Card Scheme must be a string')
        .trim(),

    body('description')
        .optional()
        .isString().withMessage('Description must be a string')
        .trim(),

    body('branchBlacklist')
        .optional()
        .isString().withMessage('Branch Blacklist must be a string')
        .trim(),

    body('blacklist')
        .optional()
        .isBoolean().withMessage('Blacklist must be a boolean'),

    body('binPrefix')
        .notEmpty().withMessage('BIN Prefix is required')
        .isString().withMessage('BIN Prefix must be a string')
        .trim(),

    body('expiration')
        .optional()
        .isString().withMessage('Expiration must be a string')
        .trim(),

    body('currency')
        .notEmpty().withMessage('Currency is required')
        .isString().withMessage('Currency must be a string')
        .trim(),

    body('fee.feeName')
        .optional()
        .isString().withMessage('Fee name must be a string')
        .trim(),

    body('fee.value')
        .optional()
        .isNumeric().withMessage('Fee value must be a number'),

    body('fee.frequency')
        .optional()
        .isString().withMessage('Fee frequency must be a string')
        .trim(),

    body('fee.currency')
        .optional()
        .isString().withMessage('Fee currency must be a string')
        .trim(),

    body('fee.time')
        .optional()
        .isString().withMessage('Fee time must be a string')
        .trim(),

    body('fee.accountPad')
        .optional()
        .isString().withMessage('Account pad must be a string')
        .trim(),

    body('fee.account')
        .optional()
        .isString().withMessage('Account must be a string')
        .trim(),

        
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
];


const validateCardUpdate = [
    
    body('cardName')
        .optional()
        .notEmpty().withMessage('Card Name is required')
        .isString().withMessage('Card Name must be a string')
        .trim(),

    body('cardScheme')
        .optional()
        .notEmpty().withMessage('Card Scheme is required')
        .isString().withMessage('Card Scheme must be a string')
        .trim(),

    body('description')
        .optional()
        .isString().withMessage('Description must be a string')
        .trim(),

    body('branchBlacklist')
        .optional()
        .isString().withMessage('Branch Blacklist must be a string')
        .trim(),

    body('blacklist')
        .optional()
        .isBoolean().withMessage('Blacklist must be a boolean'),

    body('binPrefix')
        .optional()
        .notEmpty().withMessage('BIN Prefix is required')
        .isString().withMessage('BIN Prefix must be a string')
        .trim(),

    body('expiration')
        .optional()
        .isString().withMessage('Expiration must be a string')
        .trim(),

    body('currency')
        .optional()
        .notEmpty().withMessage('Currency is required')
        .isString().withMessage('Currency must be a string')
        .trim(),

    body('fee.feeName')
        .optional()
        .isString().withMessage('Fee name must be a string')
        .trim(),

    body('fee.value')
        .optional()
        .isNumeric().withMessage('Fee value must be a number'),

    body('fee.frequency')
        .optional()
        .isString().withMessage('Fee frequency must be a string')
        .trim(),

    body('fee.currency')
        .optional()
        .isString().withMessage('Fee currency must be a string')
        .trim(),

    body('fee.time')
        .optional()
        .isString().withMessage('Fee time must be a string')
        .trim(),

    body('fee.accountPad')
        .optional()
        .isString().withMessage('Account pad must be a string')
        .trim(),

    body('fee.account')
        .optional()
        .isString().withMessage('Account must be a string')
        .trim(),

        
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
];

module.exports = {
    validateCardCreation, validateCardUpdate
};