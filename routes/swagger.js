const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

// Middleware for handling validation errors
const handleValidationErrors = (req, res, next) => {
    if (!swaggerDocument) {
        res.status(500).json('Swagger documentation not provided');
        return;
    }
    next();
};

router.use('/api-docs', handleValidationErrors, swaggerUi.serve);
router.get('/api-docs', handleValidationErrors, swaggerUi.setup(swaggerDocument));

module.exports = router;
