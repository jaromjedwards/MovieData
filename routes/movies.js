const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');

// Middleware for validating JSON data in the request body
const validateJsonMiddleware = (req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT') {
        if (!req.is('application/json')) {
            res.status(400).json('Invalid content type. Expected application/json');
            return;
        }
    }
    next();
};

// Middleware for handling validation errors
const handleValidationErrors = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        res.status(400).json('Invalid JSON in request body');
        return;
    }
    next();
};

router.get('/', moviesController.getAll);
router.get('/:id', moviesController.getSingle);
router.post('/', validateJsonMiddleware, handleValidationErrors, moviesController.createMovie);
router.put('/:id', validateJsonMiddleware, handleValidationErrors, moviesController.updateMovie);
router.delete('/:id', moviesController.deleteMovie);

module.exports = router;
