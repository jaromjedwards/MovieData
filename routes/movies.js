const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');
const { requiresAuth } = require('express-openid-connect');


router.get('/', moviesController.getAll);
router.get('/:id', moviesController.getSingle);
router.post('/', requiresAuth(), moviesController.createMovie);
router.put('/:id', requiresAuth(), moviesController.updateMovie);
router.delete('/:id', requiresAuth(), moviesController.deleteMovie);

module.exports = router;