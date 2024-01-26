const router = require('express').Router();
const moviesController = require('./movies');

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

router.use('/', require('./swagger'));

router.use(validateJsonMiddleware);
router.use(handleValidationErrors);

router.get('/', (req, res) => {
    res.send('Welcome to the Movie Data home page');
});

router.use('/movies', moviesController);

module.exports = router;
