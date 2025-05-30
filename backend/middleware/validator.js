const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.warn('Validation Error:', errors.array());
        return res.status(400).json({
            success: false,
            message: `Validation failed, ${errors.array()[0].msg}`,
            errors: errors.array()
        });
    }
    next();
};

module.exports = validateRequest; 