// routes/index.js

const router = require('express').Router();
const movies = require('./movies');

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.send('Welcome to the Movie Data home page');
})
router.use('/movies', movies);

module.exports = router;